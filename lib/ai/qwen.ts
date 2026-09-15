import "server-only";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { requireEnv, serverEnv } from "@/lib/env";
import { ResearchResultSchema, type Evidence, type ResearchResult } from "@/lib/types";

let singleton:OpenAI|undefined;
function qwen(){if(!singleton){const env=serverEnv();singleton=new OpenAI({apiKey:requireEnv("BITGET_QWEN_API_KEY"),baseURL:env.QWEN_BASE_URL,timeout:25_000,maxRetries:0})}return singleton}

export async function synthesizeResearch(query:string,evidence:Evidence[],activity:ResearchResult["activity"]){
  const env=serverEnv();
  const instructions="You are Fisk, an evidence-led market research assistant. Use only supplied evidence. Separate facts from inference. Include supporting and opposing evidence, unknowns, stress tests, and concrete invalidation conditions. Confidence labels evidence quality, never profit probability. Never imply trade execution or guaranteed returns.";
  const input=`Research question: ${query}\n\nNormalized evidence:\n${JSON.stringify(evidence)}\n\nTool activity:\n${JSON.stringify(activity)}`;
  try{
    const response=await qwen().responses.parse({model:env.QWEN_MODEL,instructions,input,text:{format:zodTextFormat(ResearchResultSchema,"research_result")}});
    if(!response.output_parsed)throw new Error("No structured output");
    return ResearchResultSchema.parse({...response.output_parsed,evidence,activity});
  }catch{
    const schemaPrompt=`${input}\n\nReturn ONLY a JSON object with these fields: directAnswer string; thesis string; confidence low|medium|high; asOf ISO datetime; keyFindings [{claim,evidenceIds}]; catalysts [{event,date optional,direction positive|negative|mixed}]; bullCase string[]; bearCase string[]; stressTests [{scenario,implication,evidenceIds}]; invalidationConditions string[]; unknowns string[]; modules chosen from chart,news,filings,signals,comparison,stress-test. Use only evidence IDs supplied above.`;
    const response=await qwen().responses.create({model:env.QWEN_MODEL,instructions,input:schemaPrompt});
    const raw=response.output_text.trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");
    const parsed=JSON.parse(raw) as Record<string,unknown>;
    return ResearchResultSchema.parse({...parsed,evidence,activity});
  }
}
