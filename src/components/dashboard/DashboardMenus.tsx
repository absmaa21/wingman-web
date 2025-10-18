import type {User} from "../../types/User.ts";
import {Container} from "@mui/material";

interface Props {
  user: User,
  compact: boolean,
}

function DashboardMenus({user, compact = false}: Props) {

  return (
    <Container maxWidth={false}>

    </Container>
  )
}

export default DashboardMenus;