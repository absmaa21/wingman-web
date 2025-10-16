interface User {
  username: string,
  game_name: string,
  tag_line: string,
  puuid: string,
  shard: string,
  accountLvl: number,
  accountXp: number,

  entitlement_token: string,
  access_token: string,
  id_token: string,
  /**
   * In milliseconds
   */
  expires_at: number,
}