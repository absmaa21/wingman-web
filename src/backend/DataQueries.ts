import {ValApiWrapper} from "./QueryHelpers.ts";
import {ValApiUrl} from "../types/valapi/valapiurl.ts";
import type {User} from "../types/User.ts";
import type {
  PartyPlayerResponse,
  PartyResponse, PregameLoadoutsResponse,
  PregameMatchResponse,
  PregamePlayerResponse,
  PregameResponse
} from "../types/valapi/data.ts";

export async function FetchParty(user: User): Promise<PartyResponse> {
  const response = await ValApiWrapper<PartyPlayerResponse>({url: ValApiUrl.PARTY_PLAYER, user})
  return await ValApiWrapper<PartyResponse>({url: ValApiUrl.PARTY, user, custom_params: {'party_id': response.CurrentPartyID}})
}

export async function FetchPreGame(user?: User): Promise<PregameResponse> {
  const response = await ValApiWrapper<PregamePlayerResponse>({url: ValApiUrl.PRE_GAME_PLAYER, user})
  return {
    match: await ValApiWrapper<PregameMatchResponse>({url: ValApiUrl.PRE_GAME_MATCH, user, custom_params: {'pre-game_match_id': response.MatchID}}),
    loadouts: await ValApiWrapper<PregameLoadoutsResponse>({url: ValApiUrl.PRE_GAME_LOADOUT, user, custom_params: {'pre-game_match_id': response.MatchID}})
  }
}