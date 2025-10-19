import { Add } from "@mui/icons-material";
import './PartyPlayerCard.css'
import PartyPlayerCardBase from "./PartyPlayerCardBase.tsx";
import {Button} from "@mui/material";

interface Props {
  decreaseWidth?: number,
}

function PartyPlayerCardEmpty({decreaseWidth = 0}: Props) {

  return (
    <PartyPlayerCardBase decreaseWidth={decreaseWidth} style={{opacity: 1/3}}>
      <Button style={{flex: 1, borderRadius: 0}}>
        <Add/>
      </Button>
    </PartyPlayerCardBase>
  )
}

export default PartyPlayerCardEmpty;