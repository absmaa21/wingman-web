import {Box, Typography} from "@mui/material";
import {useTimer} from "react-timer-hook";
import {useNavigate} from "react-router";

function PageNotFound() {

  const nav = useNavigate()
  const RedirectTimer = useTimer({
    expiryTimestamp: new Date(Date.now() + 10 * 1000),
    onExpire: () => nav('/'),
  })

  return (
    <Box sx={{textAlign: 'center'}}>
      <Typography variant={'h1'} component={'h1'}>
        404
      </Typography>
      <Typography variant={'h4'} component={'h2'}>
        Page not found
      </Typography>

      <Typography variant={'caption'} component={'p'} mt={3}>
        Redirect in {RedirectTimer.seconds} seconds
      </Typography>
    </Box>
  );
}

export default PageNotFound;