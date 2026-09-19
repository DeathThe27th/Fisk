"use client";

import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ArrowUp, ImagePlus, Paperclip, X } from "lucide-react";
import { FiskCatMark } from "@/components/fisk-cat";
import { cn } from "@/lib/utils";

type PromptInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string, meta: { attachments: File[] }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function PromptInput({value:controlled,onChange,onSubmit,placeholder="Ask Fisk about the market…",className,disabled=false}:PromptInputProps){
  const[local,setLocal]=useState(""),[focused,setFocused]=useState(false),[attachments,setAttachments]=useState<File[]>([]);
  const inputRef=useRef<HTMLInputElement>(null),textareaRef=useRef<HTMLTextAreaElement>(null),value=controlled??local;
  const update=(next:string)=>{if(controlled===undefined)setLocal(next);onChange?.(next)};
  const submit=()=>{if(disabled||(!value.trim()&&!attachments.length))return;onSubmit?.(value.trim(),{attachments});update("");setAttachments([])};
  const chooseFiles=(event:ChangeEvent<HTMLInputElement>)=>{setAttachments(current=>[...current,...Array.from(event.target.files??[])].slice(0,4));event.target.value=""};
  const keyDown=(event:KeyboardEvent<HTMLTextAreaElement>)=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();submit()}};
  useEffect(()=>{const el=textareaRef.current;if(!el)return;el.style.height="0px";el.style.height=`${Math.min(el.scrollHeight,160)}px`},[value]);
  return <div className={cn("fisk-prompt",focused&&"is-focused",value.length>0&&"has-value",className)}>
    <input ref={inputRef} type="file" accept="image/*,.pdf" multiple hidden onChange={chooseFiles}/>
    {attachments.length>0&&<div className="fisk-prompt-files">{attachments.map((file,index)=><span key={`${file.name}-${index}`}><ImagePlus size={13}/>{file.name}<button type="button" onClick={()=>setAttachments(files=>files.filter((_,i)=>i!==index))} aria-label={`Remove ${file.name}`}><X size={12}/></button></span>)}</div>}
    <textarea ref={textareaRef} disabled={disabled} value={value} onChange={event=>update(event.target.value)} onKeyDown={keyDown} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} placeholder={placeholder} rows={1} aria-label="Ask Fisk"/>
    <div className="fisk-prompt-actions"><div><span className="fisk-input-label"><FiskCatMark size={18}/> Fisk</span></div><div><button type="button" onClick={()=>inputRef.current?.click()} aria-label="Attach evidence"><Paperclip size={15}/></button><button className="prompt-send" type="button" onClick={submit} disabled={disabled||(!value.trim()&&!attachments.length)} aria-label="Start research"><ArrowUp size={16}/></button></div></div>
  </div>
}
