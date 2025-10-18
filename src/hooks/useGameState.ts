import {useEffect, useState} from "react";
import {SessionState} from "../types/constants/Enums.ts";
import {type QueryObserverResult, type RefetchOptions, useQuery} from "@tanstack/react-query";
import {ValApiWrapper} from "../backend/QueryHelpers.ts";
import type {SessionResponse} from "../types/valapi/data.ts";
import {ValApiUrl} from "../types/valapi/valapiurl.ts";

interface Session {
  state: SessionState | string,
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<SessionResponse, Error>>,
}

export function useGameState(user: User, isFocused: boolean = true): Session {

  const [sessionState, setSessionState] = useState<SessionState | string>(SessionState.CLOSED)
  const [fetchMultiplier, setFetchMultiplier] = useState<number>(1)

  const SessionQuery = useQuery({
    queryKey: ['val-session'],
    queryFn: () => ValApiWrapper<SessionResponse>({url: ValApiUrl.SESSION, user}),
    refetchInterval: 1000 * 60 * fetchMultiplier,
    enabled: isFocused,
  })

  useEffect(() => {
    if (SessionQuery.isSuccess) {
      console.debug(`Session State changed to: ${SessionQuery.data.loopState}`)
      setSessionState(SessionQuery.data.loopState)

      if (!Object.values(SessionState).includes(SessionQuery.data.loopState as SessionState)) {
        console.debug(`Unknown Session State: ${SessionQuery.data.loopState} [cxnState: ${SessionQuery.data.cxnState}]`)
      }

      if (SessionQuery.data.loopState == SessionState.INGAME) setFetchMultiplier(5)
      else setFetchMultiplier(1)
    }
  }, [SessionQuery.data]);

  return {state: sessionState, refetch: SessionQuery.refetch}
}