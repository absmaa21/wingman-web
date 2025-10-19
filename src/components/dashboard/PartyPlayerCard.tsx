import './PartyPlayerCard.css'
import type {PartyMember} from "../../types/valapi/data.ts";
import {Box, Typography} from "@mui/material";
import useDevice from "../../hooks/useDevice.ts";

interface Props {
  member: PartyMember | null | undefined,
  gap?: number,
  decreaseWidth?: number,
}

function PartyPlayerCard({member, decreaseWidth = 0}: Props) {

  const device = useDevice()
  const imgSrc = `https://media.valorant-api.com/playercards/${member?.PlayerIdentity.PlayerCardID}/largeart.png`
  const width = Math.min(device.width / 5, 268) - decreaseWidth
  const height = width * 640 / 268

  return (
    <Box
      className="pc-wrapper"
      style={{width, height, opacity: member ? 1 : 1/3}}
      aria-label="player-card"
    >
      <Box className="pc-card">
        {member && (<>
          <Box className="pc-image">
            <img src={imgSrc} alt="artwork"/>
          </Box>

          <Box className="pc-info">
            <Typography className="pc-status" variant={'caption'}>
              {member.IsReady ? 'Ready' : 'Not Ready'}
            </Typography>
            <Typography className="pc-name" variant={'subtitle1'}>
              {member.IsOwner ? 'Owner' : ''}
            </Typography>
          </Box>
        </>)}
      </Box>
    </Box>
  )
}

export default PartyPlayerCard;