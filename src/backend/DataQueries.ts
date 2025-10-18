import {ValApiWrapper} from "./QueryHelpers.ts";
import {ValApiUrl} from "../types/valapi/valapiurl.ts";
import type {User} from "../types/User.ts";
import type {PartyPlayerResponse, PartyResponse} from "../types/valapi/data.ts";

export async function FetchParty(user: User) {
  const response = await ValApiWrapper<PartyPlayerResponse>({url: ValApiUrl.PARTY_PLAYER, user})
  return await ValApiWrapper<PartyResponse>({url: ValApiUrl.PARTY, user, custom_params: {'party_id': response.CurrentPartyID}})
}