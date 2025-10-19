import {type ReactNode, useEffect, useState} from "react";
import {UserContext} from "./Contexts.ts";
import type {accessTokenDecrypt, idTokenDecrypt} from "../valapi/auth";
import {ValApiUrl} from "../valapi/valapiurl.ts";
import {FetchWrapper, ValApiWrapper} from "../../backend/QueryHelpers.ts";
import type {AccountXPResponse, EntitlementResponse, PlayerLoadoutResponse, WalletResponse} from "../valapi/data.ts";
import AppStorage from "../../backend/AppStorage.ts";
import type {ValorantAssetsVersion} from "../valapi/assets.ts";
import {emptyUser, type User} from "../User.ts";

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
      ...emptyUser,
      username: itDecrypted.lol[0].uname,
      game_name: itDecrypted.acct.game_name,
      tag_line: itDecrypted.acct.tag_line,
      puuid: atDecrypted.sub,
      shard: atDecrypted.pp.c,
      region: atDecrypted.pp.c,
      access_token: accessToken,
      id_token: idToken,
      expires_at: Date.now() + parseInt(expiresIn) * 1000,
    }

    console.log(newUser.access_token)
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${newUser.access_token}`,
    }
    const entitlementResponse = await ValApiWrapper<EntitlementResponse>({
      url: ValApiUrl.ENTITLEMENT, user: newUser, custom_options: {headers, method: 'POST'}
    })
    newUser.entitlement_token = entitlementResponse.entitlements_token

    setUser(await hydrateUser(newUser))
    return true
  }

  async function hydrateUser(newUser: User): Promise<User> {
    const version = await FetchWrapper<ValorantAssetsVersion>('https://valorant-api.com/v1/version')
    newUser = {...newUser, ...version}

    const loadout = await ValApiWrapper<PlayerLoadoutResponse>({url: ValApiUrl.PLAYER_LOADOUT, user: newUser})
    newUser.guns = loadout.Guns
    newUser.sprays = loadout.Sprays
    newUser.identity = loadout.Identity

    const wallet = await ValApiWrapper<WalletResponse>({url: ValApiUrl.WALLET, user: newUser})
    newUser.wallet = wallet.Balances

    const accountXp = await ValApiWrapper<AccountXPResponse>({url: ValApiUrl.ACCOUNT_XP, user: newUser})
    newUser.accountLvl = accountXp.Progress.Level
    newUser.accountXp = accountXp.Progress.XP

    return newUser
  }

  function validateUser() {
    if (user) {
      const user_expires_in: number = user.expires_at - Date.now()
      if (user_expires_in > 1) {
        AppStorage.setItem('user', JSON.stringify(user))
        return
      }
      console.debug('User is expired! Logout ...')
      logout()
    } else {
      // Try to load user
      const loaded_user = AppStorage.getItem("user")
      if (loaded_user) {
        const newUser: User = {...emptyUser, ...JSON.parse(loaded_user)}
        setUser(newUser)
      }
    }
  }

  function logout() {
    AppStorage.removeItem("user")
    setUser(undefined)
  }

  useEffect(() => {
    validateUser()
    const validateInterval = setInterval(validateUser, 5000)
    return () => clearInterval(validateInterval)
  }, [user])

  return (
    <UserContext value={{user, extractInformationsFromUrl}}>
      {children}
    </UserContext>
  );
}