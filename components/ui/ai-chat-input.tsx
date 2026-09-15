"use client";

import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { ArrowUp, ImagePlus, Paperclip, X } from "lucide-react";
import { cn } from "@/lib/utils";

type PromptInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, meta: { model: string; effort: string; attachments: File[] }) => void;
  placeholder?: string;
  className?: string;
};

export function PromptInput({value:controlled,onChange,onSubmit,placeholder="Ask Fisk about the market…",className}:PromptInputProps){
  const[local,setLocal]=useState(""),[focused,setFocused]=useState(false),[effort,setEffort]=useState("Deep research"),[attachments,setAttachments]=useState<File[]>([]);
  const inputRef=useRef<HTMLInputElement>(null),value=controlled??local;
  const update=(next:string)=>{if(controlled===undefined)setLocal(next);onChange?.(next)};
  const submit=()=>{if(!value.trim()&&!attachments.length)return;onSubmit?.(value.trim(),{model:"Qwen",effort,attachments});update("");setAttachments([])};
  const chooseFiles=(event:ChangeEvent<HTMLInputElement>)=>{setAttachments(current=>[...current,...Array.from(event.target.files??[])].slice(0,4));event.target.value=""};
  const keyDown=(event:KeyboardEvent<HTMLTextAreaElement>)=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();submit()}};
  return <div className={cn("fisk-prompt",focused&&"is-focused",value.length>0&&"has-value",className)}>
    <input ref={inputRef} type="file" accept="image/*,.pdf" multiple hidden onChange={chooseFiles}/>
    {attachments.length>0&&<div className="fisk-prompt-files">{attachments.map((file,index)=><span key={`${file.name}-${index}`}><ImagePlus size={13}/>{file.name}<button type="button" onClick={()=>setAttachments(files=>files.filter((_,i)=>i!==index))} aria-label={`Remove ${file.name}`}><X size={12}/></button></span>)}</div>}
    <textarea value={value} onChange={event=>update(event.target.value)} onKeyDown={keyDown} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder={placeholder} rows={3} aria-label="Ask Fisk"/>
    <div className="fisk-prompt-actions"><div><span className="model-chip"><i/> Fisk Qwen</span><button className="effort-chip" type="button" onClick={()=>setEffort(current=>current==="Deep research"?"Quick scan":"Deep research")}>{effort}</button></div><div><button type="button" onClick={()=>inputRef.current?.click()} aria-label="Attach evidence"><Paperclip size={15}/></button><button className="prompt-send" type="button" onClick={submit} disabled={!value.trim()&&!attachments.length} aria-label="Start research"><ArrowUp size={16}/></button></div></div>
  </div>
}
