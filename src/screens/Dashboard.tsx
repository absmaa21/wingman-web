import useUser from "../hooks/useUser.ts";
import Introduction from "./Introduction.tsx";
import {useGameState} from "../hooks/useGameState.ts";
import {Typography} from "@mui/material";
import {SessionState} from "../types/constants/Enums.ts";
import DashboardMenus from "../components/dashboard/DashboardMenus.tsx";
import useDevice from "../hooks/useDevice.ts";
import DashboardPreGame from "../components/dashboard/DashboardPreGame.tsx";

function Dashboard() {

  const {isMobile} = useDevice()
  const {user} = useUser()
  const Session = useGameState(user)

  if (!user) return <Introduction/>

  if (Session.state == SessionState.MENUS)
    return <DashboardMenus user={user} compact={isMobile} />

  if (Session.state == SessionState.PREGAME)
    return <DashboardPreGame user={user} />

  return (
    <Typography>
      Current Session State: {Session.state}
    </Typography>
  );
}

export default Dashboard;