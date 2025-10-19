import type {User} from "../../types/User.ts";
import {useQuery} from "@tanstack/react-query";
import {FetchPreGame} from "../../backend/DataQueries.ts";
import {SessionState} from "../../types/constants/Enums.ts";
import {useGameState} from "../../hooks/useGameState.ts";
import {CircularProgress, Container, Typography} from "@mui/material";

interface Props {
  user: User,
}

function DashboardPreGame({user}: Props) {

  const Session = useGameState(user)
  const PreGameQuery = useQuery({
    queryKey: ['pre-game'],
    queryFn: () => FetchPreGame(user),
    staleTime: 5 * 1000,
    enabled: Session.state == SessionState.PREGAME,
  })

  if (!PreGameQuery.isSuccess)
    return <CircularProgress/>

  return (
    <Container maxWidth={false}>
      <Typography>
        Starting as {PreGameQuery.data.match.AllyTeam?.TeamID == 'Blue' ? 'Defender' : 'Attacker'}
      </Typography>
    </Container>
  );
}

export default DashboardPreGame;