import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type {NameServiceResponse, PartyMember} from "../../types/valapi/data.ts";

interface Props {
  members: PartyMember[],
  nameService: NameServiceResponse,
}

function PartyPlayerItems({members, nameService}: Props) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{width: '100%'}} >
        <TableHead>
          <TableRow>
            <TableCell>Party</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Level</TableCell>
            <TableCell>Rank</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {members.map(m => m && (
            <TableRow key={m.Subject}>
              <TableCell>
                <img
                  src={`https://media.valorant-api.com/playercards/${m.PlayerIdentity.PlayerCardID}/displayicon.png`}
                  style={{height: 48, aspectRatio: 1}} alt={'player-card'}
                />
              </TableCell>
              <TableCell>
                {nameService.find(n => n.Subject == m.Subject)?.GameName}
              </TableCell>
              <TableCell>{m.PlayerIdentity.AccountLevel}</TableCell>
              <TableCell>
                <img
                  src={`https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/${m.CompetitiveTier}/largeicon.png`}
                  alt={'competitive-tier'} style={{height: 40, aspectRatio: 1}}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PartyPlayerItems;