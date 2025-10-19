import type {User} from "../../types/User.ts";
import {Box, Container} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {FetchParty} from "../../backend/DataQueries.ts";
import PartyPlayerCard from "./PartyPlayerCard/PartyPlayerCard.tsx";
import {useEffect, useState} from "react";
import type {NameServiceResponse, PartyMember} from "../../types/valapi/data.ts";
import PartyPlayerCardEmpty from "./PartyPlayerCard/PartyPlayerCardEmpty.tsx";
import PartyPlayerItem from "./PartyPlayerItems.tsx";
import {ValApiWrapper} from "../../backend/QueryHelpers.ts";
import {ValApiUrl} from "../../types/valapi/valapiurl.ts";

interface Props {
  user: User,
  compact?: boolean,
}

function DashboardMenus({user, compact = false}: Props) {

  const [members, setMembers] = useState<PartyMember[]>([])
  const PartyQuery = useQuery({
    queryKey: ['party', user.puuid],
    queryFn: () => FetchParty(user),
    staleTime: 5 * 1000,
    retryDelay: 60000,
  })
  const NameServiceQuery = useQuery({
    queryKey: ['name-service', members],
    queryFn: () => ValApiWrapper<NameServiceResponse>({
      url: ValApiUrl.NAME_SERVICE, user,
      custom_options: {method: 'PUT', body: JSON.stringify(members.map(m => m && m.Subject))}
    }),
  })
  const isCompact = compact || members.length > 5

  function refreshMembers() {
    if (!PartyQuery.data) {
      setMembers([])
      return
    }

    const self = PartyQuery.data.Members.find(m => m.Subject == user.puuid)
    if (!self) {
      setMembers([])
      return
    }

    const tempMembers: PartyMember[] = []
    const otherMembers: PartyMember[] = PartyQuery.data.Members.filter(m => m.Subject != user.puuid)

    if (isCompact) {
      tempMembers.push(self)
      for (let member of otherMembers) {
        tempMembers.push(member)
      }
    } else {
      tempMembers.push(otherMembers[3])
      tempMembers.push(otherMembers[1])
      tempMembers.push(self)
      tempMembers.push(otherMembers[0])
      tempMembers.push(otherMembers[2])
      for (let i = 4; i < otherMembers.length; i++) {
        tempMembers.push(otherMembers[i])
      }
    }

    setMembers(tempMembers)
  }

  useEffect(refreshMembers, [PartyQuery.data, isCompact]);

  return (
    <Container maxWidth={false} style={{padding: 0, paddingTop: 6}}>
      <Box sx={{display: 'flex', flexDirection: compact ? 'column' : 'row', gap: 2, justifyContent: 'center', alignItems: 'center'}}>
        {!isCompact && members.map((m, i) => m ? (
          <PartyPlayerCard key={`member-card-${i}`} member={m} nameService={NameServiceQuery.data ?? []} decreaseWidth={[0,4].includes(i) ? 32 : [1,3].includes(i) ? 16 : 0}/>
        ) : (
          <PartyPlayerCardEmpty key={`member-card-${i}`} decreaseWidth={[0,4].includes(i) ? 32 : [1,3].includes(i) ? 16 : 0} />
        ))}

        {isCompact && <PartyPlayerItem members={members} nameService={NameServiceQuery.data ?? []} />}
      </Box>
    </Container>
  )
}

export default DashboardMenus;