import "server-only";
import OpenAI from "openai";
import { requireEnv, serverEnv } from "@/lib/env";
import { ResearchResultSchema, type Evidence, type ResearchResult } from "@/lib/types";

let singleton:OpenAI|undefined;
function qwen(){if(!singleton){const env=serverEnv();singleton=new OpenAI({apiKey:requireEnv("BITGET_QWEN_API_KEY"),baseURL:env.QWEN_BASE_URL,timeout:45_000,maxRetries:0})}return singleton}

export async function synthesizeResearch(query:string,evidence:Evidence[],activity:ResearchResult["activity"]){
  const env=serverEnv();
  const instructions="You are Fisk, an evidence-led market research assistant. Use only supplied evidence. Separate facts from inference. Include supporting and opposing evidence, unknowns, stress tests, and concrete invalidation conditions. Confidence labels evidence quality, never profit probability. Never imply trade execution or guaranteed returns.";
  const input=`Research question: ${query}\n\nNormalized evidence:\n${JSON.stringify(evidence)}\n\nTool activity:\n${JSON.stringify(activity)}`;
  const schemaPrompt=`${input}\n\nReturn compact JSON only: directAnswer, thesis, confidence (low|medium|high), asOf (ISO), keyFindings [{claim,evidenceIds}], catalysts [{event,date,direction}], bullCase, bearCase, stressTests [{scenario,implication,evidenceIds}], invalidationConditions, unknowns, modules. Keep every array to at most 3 concise items. Modules may be chart, news, filings, signals, comparison, stress-test. Cite only supplied evidence IDs.`;
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
  return ResearchResultSchema.parse({...parsed,evidence,activity});
}
