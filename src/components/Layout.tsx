import {Box} from "@mui/material";
import type {ReactNode} from "react";
import {useNavigate} from "react-router";
function Layout({children}: {children: ReactNode}) {

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: window.innerHeight, bgcolor: '#f00'}}>


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