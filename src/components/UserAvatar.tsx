import {Fab, type SxProps} from "@mui/material";
import useUser from "../hooks/useUser.ts";
import {useLocation, useNavigate} from "react-router";
import type {PageProps} from "./Layout.tsx";

function UserAvatar({page, sx, size}: { page: PageProps, sx?: SxProps, size?: number }) {
  const {user} = useUser()
  const nav = useNavigate()
  const playercard: string = 'https://media.valorant-api.com/playercards/95d3bbd1-4cf6-543b-0237-ba876d886210/displayicon.png'
  const isActive: boolean = useLocation().pathname == page.href
  const fabSize: number = size ?? 60

  return (
    <Fab
      color={isActive ? 'primary' : 'default'}
      onClick={() => nav(user ? page.href : 'val-auth')}
      sx={{overflow: 'hidden', height: fabSize, width: fabSize, ...sx}}
    >
      {user ? (
        <img src={playercard} alt={page.title} loading={'lazy'}
             style={{width: isActive ? fabSize - 4 : fabSize, borderRadius: 999, transition: '.2s ease-in'}}/>
      ) : page.icon}
    </Fab>
  )
}

export default UserAvatar