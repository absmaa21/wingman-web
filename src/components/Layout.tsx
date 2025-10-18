import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import type {ReactNode} from "react";
import {Link, type To, useLocation, useNavigate} from "react-router";
import useDevice from "../hooks/useDevice.ts";
import {AirlineStops, Collections, Home, Login, Storefront} from "@mui/icons-material";
import UserAvatar from "./UserAvatar.tsx";

export interface PageProps {
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
          <Link key={p.title} to={p.href} style={{textDecoration: 'none'}}>
            <Typography variant={'h6'} sx={{
              height: '100%',
              px: 1,
              alignContent: 'center',
              color: useLocation().pathname == p.href ? 'primary.main' : 'text.secondary'
            }}>
              {p.title}
            </Typography>
          </Link>
        ))}
      </Box>

      <UserAvatar page={pages[2]} size={48} sx={{my: 'auto'}}/>
    </Paper>
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
        {pages.map(p => p.isSpecial ? <UserAvatar key={p.title} page={p} sx={{bottom: '50%'}}/> : (
          <BottomNavigationAction key={p.title} label={p.title} icon={p.icon} value={p.href}/>
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