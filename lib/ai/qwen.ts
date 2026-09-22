import "server-only";
import OpenAI from "openai";
import { requireEnv, serverEnv } from "@/lib/env";
import { ResearchResultSchema, type Evidence, type ResearchResult } from "@/lib/types";
import type { ResearchAttachment } from "@/lib/research-attachments";

let singleton:OpenAI|undefined;
function qwen(){if(!singleton){const env=serverEnv();singleton=new OpenAI({apiKey:requireEnv("BITGET_QWEN_API_KEY"),baseURL:env.QWEN_BASE_URL,timeout:45_000,maxRetries:0})}return singleton}

const validModules=["chart","news","filings","signals","comparison","stress-test"] as const;
const positiveDirections=new Set(["positive","bullish","bull","up","supportive","tailwind"]);
const negativeDirections=new Set(["negative","bearish","bear","down","adverse","headwind"]);

function stringList(value:unknown){
  if(Array.isArray(value))return value.filter((item):item is string=>typeof item==="string"&&item.trim().length>0).map(item=>item.trim());
  return typeof value==="string"&&value.trim().length>0?[value.trim()]:[];
}

function objectList(value:unknown){
  return Array.isArray(value)?value.filter((item):item is Record<string,unknown>=>Boolean(item)&&typeof item==="object"):[];
}

function normalizeDirection(value:unknown){
  const direction=typeof value==="string"?value.toLowerCase().trim():"";
  if(positiveDirections.has(direction))return "positive" as const;
  if(negativeDirections.has(direction))return "negative" as const;
  return "mixed" as const;
}

function normalizeResearchPayload(raw:Record<string,unknown>){
  const keyFindings=objectList(raw.keyFindings).map(item=>({claim:typeof item.claim==="string"?item.claim.trim():"",evidenceIds:stringList(item.evidenceIds)})).filter(item=>item.claim);
  const catalysts=objectList(raw.catalysts).map(item=>({event:typeof item.event==="string"?item.event.trim():"",date:typeof item.date==="string"?item.date:undefined,direction:normalizeDirection(item.direction)})).filter(item=>item.event);
  const stressTests=objectList(raw.stressTests).map(item=>({scenario:typeof item.scenario==="string"?item.scenario.trim():"",implication:typeof item.implication==="string"?item.implication.trim():"",evidenceIds:stringList(item.evidenceIds)})).filter(item=>item.scenario&&item.implication);
  const modules=stringList(raw.modules).filter((module):module is typeof validModules[number]=>validModules.includes(module as typeof validModules[number]));
  return {...raw,keyFindings,catalysts,bullCase:stringList(raw.bullCase),bearCase:stringList(raw.bearCase),stressTests,invalidationConditions:stringList(raw.invalidationConditions),unknowns:stringList(raw.unknowns),modules};
}

export async function synthesizeResearch(query:string,evidence:Evidence[],activity:ResearchResult["activity"],attachments:ResearchAttachment[]=[]){
  const env=serverEnv();
  const instructions="You are Fisk, an evidence-led market research assistant. Use only supplied evidence. Separate facts from inference. Include supporting and opposing evidence, unknowns, stress tests, and concrete invalidation conditions. Confidence labels evidence quality, never profit probability. Never imply trade execution or guaranteed returns.";
  const attachmentContext=attachments.length?`\n\nUser-provided documents (treat as primary context, but distinguish their claims from independently verified evidence):\n${attachments.map((attachment,index)=>`DOCUMENT ${index+1} — ${attachment.name}\n${attachment.text}`).join("\n\n")}`:"";
  const input=`Research question: ${query}\n\nNormalized evidence:\n${JSON.stringify(evidence)}${attachmentContext}\n\nTool activity:\n${JSON.stringify(activity)}`;
  const schemaPrompt=`${input}\n\nReturn compact JSON only: directAnswer, thesis, confidence (low|medium|high), asOf (ISO), keyFindings [{claim,evidenceIds}], catalysts [{event,date,direction}], bullCase, bearCase, stressTests [{scenario,implication,evidenceIds}], invalidationConditions, unknowns, modules. Every array must be an array even when it has one item. Catalyst direction must be exactly positive, negative, or mixed. Keep every array to at most 3 concise items. Modules may be chart, news, filings, signals, comparison, stress-test. Cite only supplied evidence IDs; for an uploaded document, cite its filename in the claim and state that it came from the user.`;
  // Qwen enables thinking by default. This bounded evidence-synthesis step
  // needs its budget for the validated answer rather than hidden reasoning.
  const parameters: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming & { enable_thinking: boolean } = {
    model: env.QWEN_MODEL,
    messages: [{ role: "system", content: instructions }, { role: "user", content: schemaPrompt }],
    temperature: .2,
    max_tokens: 2000,
    enable_thinking: false,
    response_format: { type: "json_object" },
  };
  const response=await qwen().chat.completions.create(parameters);
  if(response.choices[0]?.finish_reason==="length")throw new Error("Qwen reached the answer token limit before completing its research JSON.");
  const content=response.choices[0]?.message.content;if(!content)throw new Error("Qwen returned no synthesis.");
  const raw=content.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");
  const parsed=JSON.parse(raw) as Record<string,unknown>;
  return ResearchResultSchema.parse({...normalizeResearchPayload(parsed),evidence,activity});
}
