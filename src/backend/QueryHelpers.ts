import type {ValApiUrl} from "../types/valapi/valapiurl.ts";
import type {User} from "../types/User.ts";

export function defaultHeaders(user: User): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.access_token}`,
    'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
    'X-Riot-ClientVersion': user.riotClientVersion,
  }
  return user.entitlement_token ? {...headers, 'X-Riot-Entitlements-JWT': user.entitlement_token} : headers
}

interface ValApiWrapperOptions {
  url: ValApiUrl | string,
  user: User,
  custom_options?: RequestInit,
  name?: string,
  use_min_header?: boolean,
  custom_params?: object,
}

export async function ValApiWrapper<T>({url, user, custom_options, name, use_min_header, custom_params}: ValApiWrapperOptions) {
  const newUrl = replaceUrlValues(url, user, custom_params)
  if (!newUrl) throw Error('Sanitizing Url has failed, skip fetch.')
  url = newUrl

  const label = name ?? url
  const start = performance.now()

  const init: RequestInit = {
    ...custom_options,
    headers: use_min_header ? {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.access_token}`,
    } : custom_options?.headers ?? defaultHeaders(user),
    body: custom_options?.method === 'POST' ? custom_options?.body : null
  }

  console.debug(`Trying to fetch ${label}`)
  const response = await fetch(url, init)

  const duration = performance.now() - start
  if (!response.ok) {
    console.error(`${label} failed in ${duration.toFixed(2)}ms`)
    throw new Error(`Error while fetching ${label}: ${await response.text()}`)
  }

  console.debug(`${label} fetched in ${duration.toFixed(2)}ms`)
  return await response.json() as T
}

const paramRegex = /\{(.*?)\}/g

export function replaceUrlValues(url: ValApiUrl | string, user: User, custom_params?: object): string | null {
  let newUrl: string = url
  url.match(paramRegex)?.forEach(param => {
    const cleanParam: string = param.substring(1, param.length-1)
    if (Object.keys(user).includes(cleanParam)) {
      const split = newUrl.split(param)
      newUrl = split[0] + String(user[cleanParam as keyof User]) + split[1]
    } else if (custom_params && Object.keys(custom_params).includes(cleanParam)) {
      const split = newUrl.split(param)
      // @ts-ignore
      newUrl = split[0] + String(custom_params[cleanParam]) + split[1]
    } else {
      console.error(`Param "${cleanParam}" does not exist in User or custom_params!`)
      return null
    }
  })
  return newUrl
}


export async function FetchWrapper<T>(url: string, options?: RequestInit) {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`Could not fetch '${url}' [${response.status}]: ${response.statusText}`)
  const json = await response.json()
  return json['data'] as T ?? json as T
}