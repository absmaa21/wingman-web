import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container, Fab,
  Paper,
  Typography,
} from "@mui/material";
import type {ReactNode} from "react";
import {Link, type To, useLocation, useNavigate} from "react-router";
import useDevice from "../hooks/useDevice.ts";
import {AirlineStops, Collections, Home, Login, Storefront} from "@mui/icons-material";
import useUser from "../hooks/useUser.ts";

interface PageProps {
  href: To,
  title: string,
  icon?: ReactNode,
  isSpecial?: boolean,
}

const pages: PageProps[] = [
  {href: '/', title: 'Home', icon: <Home/>},
  {href: '/collection', title: 'Collection', icon: <Collections/>},
  {href: '/profile', title: 'Profile', icon: <Login/>, isSpecial: true},
  {href: '/store', title: 'Store', icon: <Storefront/>},
  {href: '/lineups', title: 'Lineups', icon: <AirlineStops/>},
]

function DesktopNavbar() {
  const {user} = useUser()
  const nav = useNavigate()
  const playercard: string = 'https://media.valorant-api.com/playercards/95d3bbd1-4cf6-543b-0237-ba876d886210/displayicon.png'
  const isActive: boolean = useLocation().pathname == pages[2].href
  const fabSize: number = 48

  return (
    <Paper elevation={1} sx={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      height: 64,
      borderRadius: 0,
      justifyContent: 'space-between',
      px: 2,
    }}>
      <></>

      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        {pages.filter(p => !p.isSpecial).map(p => (
          <Link to={p.href} style={{textDecoration: 'none'}}>
            <Typography variant={'h6'} sx={{
              height: '100%',
              px: 1,
              alignContent: 'center',
              color: useLocation().pathname == p.href ? 'text.primary' : 'text.secondary'
            }}>
              {p.title}
            </Typography>
          </Link>
        ))}
      </Box>

      <Avatar
        sx={{width: fabSize, height: fabSize, my: 'auto', cursor: 'pointer'}}
        onClick={() => nav(user ? pages[2].href : 'val-auth')}
      >
        {user ? (
          <img src={playercard} alt={pages[2].title} loading={'lazy'}
               style={{width: isActive ? fabSize - 4 : fabSize, borderRadius: 999, transition: '.2s ease-in'}}/>
        ) : pages[2].icon}
      </Avatar>
    </Paper>
  )
}

function MobileAvatar({p}: { p: PageProps }) {
  const {user} = useUser()
  const nav = useNavigate()
  const playercard: string = 'https://media.valorant-api.com/playercards/95d3bbd1-4cf6-543b-0237-ba876d886210/displayicon.png'
  const isActive: boolean = useLocation().pathname == p.href
  const fabSize: number = 60

  return (
    <Fab
      color={isActive ? 'primary' : 'default'}
      onClick={() => nav(user ? p.href : 'val-auth')}
      sx={{bottom: fabSize / 2, overflow: 'hidden', height: fabSize, width: fabSize}}
    >
      {user ? (
        <img src={playercard} alt={p.title} loading={'lazy'}
             style={{width: isActive ? fabSize - 4 : fabSize, borderRadius: 999, transition: '.2s ease-in'}}/>
      ) : p.icon}
    </Fab>
  )
}

function MobileNavbar() {
  const nav = useNavigate()

  return (
    <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={4}>
      <BottomNavigation
        showLabels value={useLocation().pathname}
        onChange={(_, newValue) => {
          nav(newValue)
        }}
      >
        {pages.map(p => p.isSpecial ? <MobileAvatar p={p}/> : (
          <BottomNavigationAction label={p.title} icon={p.icon} value={p.href}/>
        ))}
      </BottomNavigation>
    </Paper>
  )
}

function Layout({children}: { children: ReactNode }) {

  const {isMobile} = useDevice()

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#f00'}}>
      {!isMobile && <DesktopNavbar/>}

      <Container
        component={'main'}
        sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
      >
        {children}
      </Container>

      {isMobile && <MobileNavbar/>}
    </Box>
  );
}

export default Layout;