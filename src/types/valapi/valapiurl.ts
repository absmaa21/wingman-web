
// @ts-ignore
export enum ValApiUrl {
  // PVP Endpoints
  FETCH_CONTENT = "https://shared.{shard}.a.pvp.net/content-service/v3/content",
  ACCOUNT_XP = "https://pd.{shard}.a.pvp.net/account-xp/v1/players/{puuid}",
  PLAYER_LOADOUT = "https://pd.{shard}.a.pvp.net/personalization/v2/players/{puuid}/playerloadout",
  PLAYER_MMR = "https://pd.{shard}.a.pvp.net/mmr/v1/players/{puuid}",
  MATCH_HISTORY = "https://pd.{shard}.a.pvp.net/match-history/v1/history/{puuid}?startIndex={startIndex}&endIndex={endIndex}&queue={queue}",
  MATCH_DETAILS = "https://pd.{shard}.a.pvp.net/match-details/v1/matches/{matchID}",
  COMPETITIVE_UPDATES = "https://pd.{shard}.a.pvp.net/mmr/v1/players/{puuid}/competitiveupdates?startIndex={startIndex}&endIndex={endIndex}&queue={queue}",
  LEADERBOARD = "https://pd.{shard}.a.pvp.net/mmr/v1/leaderboards/affinity/na/queue/competitive/season/{season id}?startIndex={startIndex}&size={size}&query={query}",
  PENALTIES = "https://pd.{shard}.a.pvp.net/restrictions/v3/penalties",
  CONFIG = "https://pd.{shard}.a.pvp.net/v1/config/{region}",
  NAME_SERVICE = "https://pd.{shard}.a.pvp.net/name-service/v2/players",

  // Party Endpoints

  // Store Endpoints
  PRICES = "https://pd.{shard}.a.pvp.net/store/v1/offers/",
  STOREFRONT = "https://pd.{shard}.a.pvp.net/store/v3/storefront/{puuid}",
  WALLET = "https://pd.{shard}.a.pvp.net/store/v1/wallet/{puuid}",
  OWNED_ITEMS = "https://pd.{shard}.a.pvp.net/store/v1/entitlements/{puuid}/{ItemTypeID}",

  // Pre-Game Endpoints
  PRE_GAME_PLAYER = "https://glz-{region}-1.{shard}.a.pvp.net/pregame/v1/players/{puuid}",
  PRE_GAME_MATCH = "https://glz-{region}-1.{shard}.a.pvp.net/pregame/v1/matches/{pre-game_match_id}",
  PRE_GAME_LOADOUT = "https://glz-{region}-1.{shard}.a.pvp.net/pregame/v1/matches/{pre-game_match_id}/loadouts",
  SELECT_CHARACTER = "https://glz-{region}-1.{shard}.a.pvp.net/pregame/v1/matches/{pre-game_match_id}/select/{agent_id}",
  LOCK_CHARACTER = "https://glz-{region}-1.{shard}.a.pvp.net/pregame/v1/matches/{pre-game_match_id}/lock/{agent_id}",
  PRE_GAME_QUIT = "https://glz-{region}-1.{shard}.a.pvp.net/pregame/v1/matches/{pre-game_match_id}/quit",

  // Current Game Endpoints
  CURRENT_GAME_PLAYER = "https://glz-{region}-1.{shard}.a.pvp.net/core-game/v1/players/{puuid}",
  CURRENT_GAME_MATCH = "https://glz-{region}-1.{shard}.a.pvp.net/core-game/v1/matches/{current_game_match_id}",
  CURRENT_GAME_LOADOUTS = "https://glz-{region}-1.{shard}.a.pvp.net/core-game/v1/matches/{current_game_match_id}/loadouts",
  CURRENT_GAME_QUIT = "https://glz-{region}-1.{shard}.a.pvp.net/core-game/v1/players/{puuid}/disassociate/{current_game_match_id}",

  // Contract Endpoints
  ITEM_UPGRADES = "https://pd.{shard}.a.pvp.net/contract-definitions/v3/item-upgrades",
  CONTRACTS = "https://pd.{shard}.a.pvp.net/contracts/v1/contracts/{puuid}",
  ACTIVATE_CONTRACT = "https://pd.{shard}.a.pvp.net/contracts/v1/contracts/{puuid}/special/{contract_id}",

  // Authentication Endpoints
  ENTITLEMENT = "https://entitlements.auth.riotgames.com/api/token/v1",
  PLAYER_INFO = "https://auth.riotgames.com/userinfo",

  // Other Endpoints
  SESSION = "https://glz-eu-1.{shard}.a.pvp.net/session/v1/sessions/{puuid}"
}

export function ValApiUrlKeyToText(key: ValApiUrl | string): string {
  return key.split('_').map(k => k.charAt(0).toUpperCase() + k.substring(1).toLowerCase()).join(' ')
}

export function getRsoLink(): string {
  const redirect: string = 'https://playvalorant.com/'
  return `https://auth.riotgames.com/authorize?nonce=1&redirect_uri=${redirect}&client_id=play-valorant-web-prod&response_type=token id_token&scope=account+openid+offline_access`
}


export interface ValApiDetail {
  label: string,
  httpMethod: 'GET' | 'POST' | 'PUT' | 'DELETE',
  description: string,
}

export let ValApiDetails: ([ValApiUrl]: ValApiDetail[]) => {
  STOREFRONT: [
    {
      label: 'Storefront V3',
      httpMethod: 'POST',
      description: 'Get the currently available items in the players store',
    },
  ],
}


export let ValApiUrlParams: ([string]: string) => {
  'shard': 'The shard is dependent on where the Riot Account was created.'
  'puuid': 'A players UUID',
}