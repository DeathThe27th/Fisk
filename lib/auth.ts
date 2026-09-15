import "server-only";
import { PrivyClient } from "@privy-io/node";
import { serverEnv, publicEnv } from "@/lib/env";

let client:PrivyClient|undefined;
function privy(){if(!client){const env=serverEnv(),pub=publicEnv();client=new PrivyClient({appId:pub.NEXT_PUBLIC_PRIVY_APP_ID,appSecret:env.PRIVY_APP_SECRET})}return client}

export async function authenticate(request:Request){
  const header=request.headers.get("authorization");
  if(!header?.startsWith("Bearer "))return null;
  try{const claims=await privy().utils().auth().verifyAccessToken(header.slice(7));return{userId:claims.user_id,claims}}catch{return null}
}

export async function requireUser(request:Request){const user=await authenticate(request);if(!user)throw new AuthError();return user}
export class AuthError extends Error{status=401;constructor(){super("Sign in to continue.")}}
