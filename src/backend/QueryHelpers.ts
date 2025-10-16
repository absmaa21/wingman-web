import type {ValApiUrl} from "../types/valapi/valapiurl.ts";

export function defaultHeaders(user: User): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${user.access_token}`,
    'X-Riot-ClientPlatform': 'ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9',
    'X-Riot-ClientVersion': 'release-09.02-shipping-20-2703179',
  }
  return user.entitlement_token ? {...headers, 'X-Riot-Entitlements-JWT': user.entitlement_token} : headers
}

export async function ValApiWrapper<T>(url: ValApiUrl | string, user: User, custom_options?: RequestInit, name?: string, use_min_header?: boolean) {
  const newUrl = replaceUrlValues(url, user)
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

  console.info(`Trying to fetch ${label}`)
  const response = await fetch(url, init)

  const duration = performance.now() - start
  if (!response.ok) {
    console.error(`${label} failed in ${duration.toFixed(2)}ms`)
    throw new Error(`Error while fetching ${label}: ${await response.text()}`)
  }

  console.info(`${label} fetched in ${duration.toFixed(2)}ms`)
  return response.json() as T
}

const paramRegex = /\{(.*?)\}/g

export function replaceUrlValues(url: ValApiUrl | string, user: User): string | null {
  let newUrl: string = url
  url.match(paramRegex)?.map(param => {
    const cleanParam: string = param.substring(1, param.length-1)
    if (Object.keys(user).includes(cleanParam)) {
      const split = newUrl.split(param)
      newUrl = split[0] + String(user[cleanParam as keyof User]) + split[1]
    } else {
      console.error(`Param "${cleanParam}" does not exist in User!`)
      return null
    }
  })
  return newUrl
}