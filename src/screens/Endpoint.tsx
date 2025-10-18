import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container, LinearProgress,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import * as React from "react";
import { Send } from "@mui/icons-material";
import {Prism} from "react-syntax-highlighter";
import useUser from "../hooks/useUser.ts";
import {ValApiUrl} from "../types/valapi/valapiurl.ts";
import {defaultHeaders, replaceUrlValues} from "../backend/QueryHelpers.ts";


const paramRegex = /\{(.*?)\}/g

function Endpoint() {

  const {user} = useUser()
  const [fetchOptions, setFetchOptions] = useState<Fetch>({url: '', method: 'GET'})
  const [urlError, setUrlError] = useState<string>('')
  const [urlParams, setUrlParams] = useState<string[]>([])
  const [jsonInput, setJsonInput] = useState<string>('{}')
  const [response, setResponse] = useState<Response | null>(null)
  const [responseIsLoading, setResponseIsLoading] = useState(false)
  const [responseData, setResponseData] = useState<object>({})

  async function fetchUrl() {
    if (!user) return

    console.info(fetchOptions.url)
    const url = replaceUrlValues(fetchOptions.url, user)
    if (!url) {
      setUrlError('Some params in url were invalid.')
      return
    }

    setResponseIsLoading(true)
    const res = await fetch(url, {method: fetchOptions.method, body: fetchOptions.method == 'POST' ? jsonInput : null, headers: defaultHeaders(user)})
    setResponse(res)
    setResponseData(await res.json())
    setResponseIsLoading(false)
  }

  function onUrlChange(event: any) {
    setUrlError('')
    if (Object.keys(ValApiUrl).includes(event.currentTarget.textContent)) {
      setFetchOptions({...fetchOptions, url: ValApiUrl[event.currentTarget.textContent as keyof typeof ValApiUrl]})
    } else {
      setFetchOptions({...fetchOptions, url: event.target.value})
    }
  }

  useEffect(() => {
    setUrlParams([])
    fetchOptions.url.match(paramRegex)?.map(param => {
      const cleanParam = param.substring(1, param.length-1)
      if (user && Object.keys(user).includes(cleanParam))
        setUrlParams(p => [...p, cleanParam])
    })
  }, [fetchOptions.url]);

  return (
    <Container>
      <Typography variant={'h4'} component={'h1'} align={'center'} mb={2}>
        {'Testing Endpoint'}
      </Typography>

      <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
        <Select
          value={fetchOptions.method}
          onChange={(e) => setFetchOptions({...fetchOptions, method: e.target.value})}
          sx={{fontWeight: 'bold'}}
        >
          {['GET', 'POST', 'PUT', 'DELETE'].map(m => (
            <MenuItem value={m}>{m}</MenuItem>
          ))}
        </Select>

        <Autocomplete
          onChange={onUrlChange} value={fetchOptions.url}
          sx={{width: `100%`}}
          disablePortal freeSolo
          renderInput={(params) => <TextField
            {...params} variant={'filled'} type={'url'} label={'Uniform Resource Locator'}
            error={urlError.length > 0} onChange={onUrlChange}
          />}
          options={Object.keys(ValApiUrl)}
        />

        <Button variant={'contained'} color={'inherit'} sx={{verticalAlign: 'top', p: 2}} onClick={fetchUrl} disabled={!user}>
          <Send/>
        </Button>
      </Box>

      <Typography variant={'caption'} color={'error'}>
        {urlError}
      </Typography>

      <Typography variant={'h6'} sx={{textAlign: 'center', mt: 2}}>
        Body
      </Typography>
      <TextField
        label="Custom JSON"
        multiline
        minRows={1}
        fullWidth
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Typography variant={'h6'} sx={{textAlign: 'center', mt: 2}}>
        Following Variables will be replaced by their value automatically.
      </Typography>
      {urlParams.map(p => <p key={p}>{p}</p>)}

      <Typography variant={'h6'} sx={{textAlign: 'center', mt: 2}}>
        Response
      </Typography>
      <Paper elevation={1} sx={{ p: 1, overflowX: 'auto', textAlign: 'center' }}>
        {responseIsLoading ? <LinearProgress/> : <>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography variant={'caption'}>
              {response?.url}
            </Typography>
            <Typography variant={'subtitle2'} color={response && response.status / 100 == 2 ? 'primary' : 'error'}>
              {response?.status}
            </Typography>
          </Box>

          <Prism language={'JavaScript'}>
            {JSON.stringify(responseData, null, 2)}
          </Prism>
        </>}
      </Paper>
    </Container>
  );
}

export default Endpoint;