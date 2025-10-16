import {useNavigate, useParams} from "react-router";
import {ValApiUrl, ValApiUrlKeyToText} from "../types/valapi/valapiurl.ts";
import {Box, Button, Container, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import * as React from "react";
import { Send } from "@mui/icons-material";
import {Prism} from "react-syntax-highlighter";
import {useQuery} from "@tanstack/react-query";
import {ValApiWrapper} from "../backend/QueryHelpers.ts";
import useUser from "../hooks/useUser.ts";


const paramRegex = /\{(.*?)\}/g

interface Props {
  isTest?: boolean,
}

function Endpoint({isTest}: Props) {

  const {urlKey} = useParams()
  const navigate = useNavigate()
  const {user} = useUser()
  const [fetch, setFetch] = useState<Fetch>({url: '', method: 'GET'})
  const [urlParams, setUrlParams] = useState<string[]>([])
  const [jsonInput, setJsonInput] = useState<string>('{}')

  const Query = useQuery({
    queryKey: [fetch.url],
    queryFn: () => ValApiWrapper(fetch.url, user!, {body: jsonInput, method: fetch.method}),
    enabled: false,
    retry: false,
  })

  function onUrlChange(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setFetch({...fetch, url: event.target.value})
  }

  useEffect(() => {
    if (isTest) {
      setFetch({method: 'GET', url: ''})
      return
    }

    if (!urlKey || !Object.keys(ValApiUrl).includes(urlKey.toUpperCase())) {
      console.debug('Selected endpoint is invalid. Redirecting..')
      navigate('/')
      return
    }

    setFetch(p => ({...p, url: ValApiUrl[urlKey.toUpperCase() as keyof typeof ValApiUrl]}))
  }, [isTest, navigate, urlKey])

  useEffect(() => {
    setUrlParams([])
    fetch.url.match(paramRegex)?.map(param =>
      setUrlParams(p => [...p, param.substring(1, param.length-1)]))
  }, [fetch.url]);

  return (
    <Container>
      <Typography variant={'h4'} component={'h1'} align={'center'} mb={2}>
        {isTest ? 'Testing new Endpoint' : ValApiUrlKeyToText(urlKey!.toUpperCase())}
      </Typography>
      <Box>
        <Select
          value={fetch.method}
          onChange={(e) => setFetch({...fetch, method: e.target.value})}
          sx={{fontWeight: 'bold'}}
        >
          {['GET', 'POST', 'PUT', 'DELETE'].map(m => (
            <MenuItem value={m}>{m}</MenuItem>
          ))}
        </Select>
        <TextField
          variant={'filled'} type={'url'} disabled={!isTest} onChange={onUrlChange} value={fetch.url}
          sx={{width: `calc(100% - ${158}px)`, mx: 1}} slotProps={{htmlInput: {sx: {padding: 2}}}}
        />
        <Button variant={'contained'} color={'inherit'} sx={{verticalAlign: 'top', p: 2}} onClick={() => Query.refetch()} disabled={!user}>
          <Send/>
        </Button>
      </Box>

      <Typography variant={'subtitle1'} sx={{textAlign: 'center', mt: 2}}>
        Body
      </Typography>
      <TextField
        label="Custom JSON"
        multiline
        minRows={6}
        fullWidth
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Typography variant={'subtitle1'} sx={{textAlign: 'center', mt: 2}}>
        Following Variables will be replaced by their value automatically.
      </Typography>
      {urlParams.map(p => <p key={p}>{p}</p>)}

      <Typography variant={'subtitle1'} sx={{textAlign: 'center', mt: 2}}>
        Response
      </Typography>
      <Paper elevation={3} sx={{ p: 2, overflowX: 'auto' }}>
        <Prism language={'JavaScript'}>
          {JSON.stringify(Query.data ?? Query.error, null, 2)}
        </Prism>
      </Paper>
    </Container>
  );
}

export default Endpoint;