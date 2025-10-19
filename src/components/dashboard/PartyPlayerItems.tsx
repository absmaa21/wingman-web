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
import useUser from "../../hooks/useUser.ts";
import {useQuery} from "@tanstack/react-query";
import {ValApiWrapper} from "../../backend/QueryHelpers.ts";
import {ValApiUrl} from "../../types/valapi/valapiurl.ts";
interface Props {
  members: PartyMember[],
}

function PartyPlayerItems({members}: Props) {

  const {user} = useUser()
  const NameServiceQuery = useQuery({
    queryKey: ['name-service'],
    queryFn: () => ValApiWrapper<NameServiceResponse>({
      url: ValApiUrl.NAME_SERVICE, user,
      custom_options: {method: 'PUT', body: JSON.stringify(members.map(m => m && m.Subject))}
    }),
  })

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
                {NameServiceQuery.data && NameServiceQuery.data.find(n => n.Subject == m.Subject)?.GameName}
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