import useUser from "../hooks/useUser.ts";
import Introduction from "./Introduction.tsx";
import {useGameState} from "../hooks/useGameState.ts";
import {Typography} from "@mui/material";

function Dashboard() {

  const {user} = useUser()
  const Session = useGameState(user)

  if (!user) return <Introduction/>

  /*
  const PreGamePlayerQuery = useQuery({
    queryKey: ['val-pre-game-player'],
    queryFn: () => ValApiWrapper({url: ValApiUrl.PRE_GAME_PLAYER, user}),
    retryDelay: 30 * 1000, retry: true, enabled: false
  })
  const PreGameQuery = useQuery({
    queryKey: ['val-pre-game'],
    queryFn: () => ValApiWrapper({
      url: ValApiUrl.PRE_GAME_MATCH, user,
    }),
    enabled: PreGamePlayerQuery.isSuccess,
  })
   */

  return (<>
    <Typography>
      Current Session: {Session.state}
    </Typography>
  </>);
}

export default Dashboard;