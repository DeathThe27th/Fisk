export type FiskCatState = "idle"|"curious"|"searching"|"analysing"|"alert"|"skeptical"|"success"|"sleeping"|"ready"|"gathering"|"result";

/** Fisk's proprietary black-cat mark: tall ears, silver brow notch, white eyes and an F-tail. */
export function FiskCatMark({className="",size=32}:{className?:string;accent?:boolean;size?:number}){
  return <svg className={`fisk-cat-mark ${className}`} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <path fill="currentColor" d="M9 51V20L17 5l9 13h13L49 5l7 16v30c0 6-6 10-13 10H22C15 61 9 57 9 51Z"/>
    <path className="fisk-cat-eye" stroke="white" strokeWidth="4" strokeLinecap="round" d="M21 35h7m9 0h7"/>
    <path stroke="#a8a8a8" strokeWidth="3" strokeLinecap="round" d="m28 20 4-3 4 3"/>
    <path fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" d="M50 51c11 0 10 9 3 9h-5v-5h4"/>
  </svg>
}

export function FiskAvatar({state="idle",large=false}:{state?:FiskCatState;large?:boolean}){
  const normalized=state==="ready"?"idle":state==="gathering"?"searching":state==="result"?"success":state;
  return <span className={`fisk-avatar is-${normalized} ${large?"is-large":""}`} aria-hidden="true"><FiskCatMark size={large?180:42}/><i/><i/></span>;
}
