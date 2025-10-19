import './PartyPlayerCard.css'
import type {NameService, NameServiceResponse, PartyMember} from "../../types/valapi/data.ts";
import {Box, Tooltip, Typography} from "@mui/material";
import PlayerLevel from "../PlayerLevel.tsx";
import {useQuery} from "@tanstack/react-query";
import {ValApiWrapper} from "../../backend/QueryHelpers.ts";
import {ValApiUrl} from "../../types/valapi/valapiurl.ts";
import useUser from "../../hooks/useUser.ts";
import {useEffect, useState} from "react";
import PartyPlayerCardBase from "./PartyPlayerCardBase.tsx";
import { Star } from "@mui/icons-material";

interface Props {
  member: PartyMember,
  decreaseWidth?: number,
}

function PartyPlayerCard({member, decreaseWidth = 0}: Props) {

  const {user} = useUser()
  const imgSrc = `https://media.valorant-api.com/playercards/${member.PlayerIdentity.PlayerCardID}/largeart.png`
  const [nameService, setNameService] = useState<NameService>()

  const NameServiceQuery = useQuery({
    queryKey: ['name-service', member.Subject],
    queryFn: () => ValApiWrapper<NameServiceResponse>({
      url: ValApiUrl.NAME_SERVICE, user,
      custom_options: {method: 'PUT', body: JSON.stringify([member.Subject])}
    }),
    enabled: !!user,
  })

  useEffect(() => {
    if (member && NameServiceQuery.isSuccess)
      setNameService(NameServiceQuery.data.find(n => n.Subject == member.Subject))
  }, [NameServiceQuery.data]);

  return (
    <PartyPlayerCardBase decreaseWidth={decreaseWidth} extra={(
      <>
        <PlayerLevel
          level={member.PlayerIdentity.AccountLevel} centerVertical
          style={{position: 'absolute', top: 0, width: '100%', textAlign: 'center', zIndex: 3}}
        />
      </>
    )}>
      <Box className="pc-image">
        <img src={imgSrc} alt="player-card"/>
      </Box>

      <Box className="pc-info">

        <Typography className="pc-status" variant={'caption'}>
          {member.IsReady ? 'Ready' : 'Not Ready'}
        </Typography>

        <Box className="pc-name" style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4}}>
          {member.IsOwner && <Tooltip title={'Party Owner'}>
              <Star style={{fontSize: 16}} color={'warning'}/>
          </Tooltip>}

          <Typography variant={'body1'}>
            {nameService?.GameName}
          </Typography>
        </Box>

      </Box>
    </PartyPlayerCardBase>
  )
}

export default PartyPlayerCard;