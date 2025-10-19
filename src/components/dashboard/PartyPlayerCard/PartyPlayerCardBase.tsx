import './PartyPlayerCard.css'
import {Box} from "@mui/material";
import useDevice from "../../../hooks/useDevice.ts";
import type {CSSProperties, ReactNode} from "react";

interface Props {
  children: ReactNode,
  extra?: ReactNode,
  decreaseWidth?: number,
  style?: CSSProperties,
}

function PartyPlayerCardBase({children, extra, decreaseWidth = 0, style}: Props) {

  const device = useDevice()
  const width = Math.min(device.width / 5, 268) - decreaseWidth
  const height = width * 640 / 268

  return (
    <Box
      className="pc-wrapper"
      style={{width, height, ...style}}
      aria-label="player-card"
    >
      <Box className="pc-card">
        {children}
      </Box>

      {extra}
    </Box>
  )
}

export default PartyPlayerCardBase;