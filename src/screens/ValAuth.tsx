import {Box, TextField, Typography} from "@mui/material";
import RsoPopupButton from "../components/RsoPopupButton.tsx";
import * as React from "react";
import useUser from "../hooks/useUser.ts";
import {useState} from "react";
import {useNavigate} from "react-router";

function ValAuth() {

  const User = useUser()
  const navigate = useNavigate()
  const [extractFeedback, setExtractFeedback] = useState<string>()

  function onInputChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (event.target.value.includes('access_token=')) {
      User.extractInformationsFromUrl(new URL(event.target.value)).then(r => {
        if (r) {
          navigate('/')
          return
        }
        setExtractFeedback('Extraction failed. Please try again.')
      })
      return
    }
    setExtractFeedback('')
  }

  return (
    <Box>
      <RsoPopupButton />
      <Typography>
        After login, copy the whole URL and paste it in the field below
      </Typography>
      <TextField type={'url'} onChange={onInputChange} />
      <Typography>
        {extractFeedback}
      </Typography>
    </Box>
  );
}

export default ValAuth;