import type {
  PlayerLoadoutGun,
  PlayerLoadoutIdentity,
  PlayerLoadoutSpray
} from "./valapi/data.ts";

export type User = {
  username: string,
  game_name: string,
  tag_line: string,
  puuid: string,
  shard: string,
  region: string,
  accountLvl: number,
  accountXp: number,

  entitlement_token: string,
  access_token: string,
  id_token: string,
  /**
   * In milliseconds
   */
  expires_at: number,

  riotClientVersion: string,
  sprays: PlayerLoadoutSpray[],
  guns: PlayerLoadoutGun[],
  identity: PlayerLoadoutIdentity,
  wallet: {[x: string]: number},
}

export const emptyUser: User = {
  username: '',
  game_name: '',
  tag_line: '',
  puuid: '',
  shard: '',
  region: '',
  accountLvl: -1,
  accountXp: -1,

  entitlement_token: '',
  access_token: '',
  id_token: '',
  /**
   * In milliseconds
   */
  expires_at: -1,

  riotClientVersion: '',
  sprays: [],
  guns: [],
  identity: {
    PlayerCardID: '',
    PlayerTitleID: '',
    AccountLevel: -1,
    PreferredLevelBorderID: '',
    HideAccountLevel: false,
  },
  wallet: {},
}