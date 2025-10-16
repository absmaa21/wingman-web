import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import type {ReactNode} from "react";
import {ValApiUrl, ValApiUrlKeyToText} from "../types/valapi/valapiurl.ts";
import {useNavigate} from "react-router";
import RsoPopupButton from "./RsoPopupButton.tsx";

const drawerWidth: number = 240

function Layout({children}: {children: ReactNode}) {

  const navigate = useNavigate()

  return (
    <Box sx={{display: 'flex', height: window.innerHeight, bgcolor: '#f00'}}>
      <Drawer
        sx={{
          width: drawerWidth,
          height: '100%',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant={'permanent'}
        anchor={'left'}
      >
        <Toolbar>
          <RsoPopupButton func={() => navigate('/val-auth')} />
        </Toolbar>
        <Divider/>
        <List>
          <ListItem key={'testing'} disablePadding>
            <ListItemButton onClick={() => navigate(`/endpoint/test`)}>
              <ListItemText primary={'Test new Endpoint'} />
            </ListItemButton>
          </ListItem>
          <Divider sx={{my: 1}}/>
          {Object.keys(ValApiUrl).map(key => (
            <ListItem key={key} disablePadding>
              <ListItemButton onClick={() => navigate(`/endpoint/${key.toLowerCase()}`)}>
                <ListItemText primary={ValApiUrlKeyToText(key)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component={'main'}
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout;