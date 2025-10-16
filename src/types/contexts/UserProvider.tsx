import {type ReactNode, useEffect, useState} from "react";
import {UserContext} from "./Contexts.ts";
import type {accessTokenDecrypt, idTokenDecrypt} from "../valapi/auth";
import {ValApiUrl} from "../valapi/valapiurl.ts";
import {ValApiWrapper} from "../../backend/QueryHelpers.ts";
import type {EntitlementResponse} from "../valapi/data.ts";

interface UserProviderProps {
  children: ReactNode,
}

function sanitizeString(str: string) {
  return str.replace(/[^\x20-\x7E]/g, '');
}

export function UserProvider({children}: UserProviderProps) {

  const [user, setUser] = useState<User>()

  async function extractInformationsFromUrl(url: URL): Promise<boolean> {

    const paramsPart: string = url.href.split('#')[1]
    const params: string[] = paramsPart.split('&')

    const accessToken = url.searchParams.get('access_token') ?? params.find(p => p.includes('access_token='))?.split('=')[1]
    const idToken = url.searchParams.get('id_token') ?? params.find(p => p.includes('id_token='))?.split('=')[1]
    const expiresIn = url.searchParams.get('expires_in') ?? params.find(p => p.includes('expires_in='))?.split('=')[1]

    if (!accessToken || !idToken || !expiresIn) {
      console.error(`Redirect url ${url.toString()} is invalid!`)
      return false
    }

    const atDecrypted: accessTokenDecrypt = JSON.parse(sanitizeString(atob(accessToken.split('.')[1]))) as accessTokenDecrypt
    const itDecrypted: idTokenDecrypt = JSON.parse(sanitizeString(atob(idToken.split('.')[1]))) as idTokenDecrypt

    // todo: validate decryptions with tests

    const newUser: User = {
      username: itDecrypted.lol[0].uname,
      game_name: itDecrypted.acct.game_name,
      tag_line: itDecrypted.acct.tag_line,
      puuid: atDecrypted.sub,
      shard: atDecrypted.pp.c,
      accountLvl: -1,
      accountXp: -1,
      entitlement_token: '',
      access_token: accessToken,
      id_token: idToken,
      expires_at: Date.now() + parseInt(expiresIn) * 1000,
    }

    console.log(newUser.access_token)
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${newUser.access_token}`,
    }
    const entitlementResponse = await ValApiWrapper<EntitlementResponse>(ValApiUrl.ENTITLEMENT, newUser, {headers, method: 'POST'})
    newUser.entitlement_token = entitlementResponse.entitlements_token

    setUser(newUser)
    return true
  }

  function checkUser() {
    if (user) {
      const user_expires_in: number = user.expires_at - Date.now()
      if (user_expires_in > 10) return
    }
  }

  useEffect(checkUser, [user])

  return (
    <UserContext value={{user, extractInformationsFromUrl}}>
      {children}
    </UserContext>
  );
}