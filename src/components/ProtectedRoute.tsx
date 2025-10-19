import useUser from "../hooks/useUser.ts";
import {Navigate, Outlet, type To} from "react-router";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";

interface Props {
  adminOnly?: boolean,
  redirectPath?: To,
}

const admin_puuids: string[] = [
  '92fc5f4b-de99-596c-9122-875625c115b4', // orcanon60hz
]

function ProtectedRoute({ adminOnly, redirectPath }: Props) {
  const redirect: To = redirectPath ?? '/'
  const {user} = useUser()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) setIsLoading(false)
    }, 5000)
    if (user) setIsLoading(false)

    return () => clearTimeout(timeout)
  }, [user]);

  if (isLoading)
    return <CircularProgress/>

  if (!user) {
    console.log(`Route blocked -> user: ${JSON.stringify(user)}`)
    return <Navigate to={redirect} replace />
  }

  if (adminOnly && !admin_puuids.includes(user.puuid)) {
    console.log('Route blocked -> unauthorized')
    return <Navigate to={redirect} replace />
  }

  return <Outlet/>
}

export default ProtectedRoute;