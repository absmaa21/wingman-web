import useUser from "../hooks/useUser.ts";
import {Navigate, Outlet, type To} from "react-router";

interface Props {
  adminOnly?: boolean,
  redirectPath?: To,
}

const admin_puuids: string[] = [

]

function ProtectedRoute({ adminOnly, redirectPath }: Props) {
  const redirect: To = redirectPath ?? '/'
  const { user } = useUser()

  if (!user) {
    return <Navigate to={redirect} replace />
  }

  if (adminOnly && !admin_puuids.includes(user.puuid)) {
    return <Navigate to={redirect} replace />
  }

  return <Outlet/>
}

export default ProtectedRoute;