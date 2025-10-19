import './PartyPlayerCard.css'
import type {NameServiceResponse, PartyMember} from "../../../types/valapi/data.ts";
import {Box, Tooltip, Typography} from "@mui/material";
import PlayerLevel from "../../PlayerLevel.tsx";
import PartyPlayerCardBase from "./PartyPlayerCardBase.tsx";
import { Star } from "@mui/icons-material";

interface Props {
  member: PartyMember,
  decreaseWidth?: number,
  nameService: NameServiceResponse,
}

function PartyPlayerCard({member, decreaseWidth = 0, nameService}: Props) {

  const imgSrc = `https://media.valorant-api.com/playercards/${member.PlayerIdentity.PlayerCardID}/largeart.png`

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
            {nameService.find(n => n.Subject == member.Subject)?.GameName}
          </Typography>
        </Box>

      </Box>
    </PartyPlayerCardBase>
  )
}

export default PartyPlayerCard;