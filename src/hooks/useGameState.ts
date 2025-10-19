import {useEffect, useState} from "react";
import {SessionState} from "../types/constants/Enums.ts";
import {type QueryObserverResult, type RefetchOptions, useQuery} from "@tanstack/react-query";
import {ValApiWrapper} from "../backend/QueryHelpers.ts";
import type {SessionResponse} from "../types/valapi/data.ts";
import {ValApiUrl} from "../types/valapi/valapiurl.ts";
import type {User} from "../types/User.ts";

interface Session {
  state: SessionState | string,
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<SessionResponse, Error>>,
}

export function useGameState(user: User | undefined, isFocused: boolean = true): Session {

  const [sessionState, setSessionState] = useState<SessionState | string>(SessionState.CLOSED)
  const [fetchInterval, setFetchInterval] = useState<number>(5)

  const SessionQuery = useQuery({
    queryKey: ['val-session'],
    queryFn: () => ValApiWrapper<SessionResponse>({url: ValApiUrl.SESSION, user: user!}),
    refetchInterval: 1000 * fetchInterval,
    enabled: user && isFocused,
  })

  useEffect(() => {
    if (SessionQuery.isSuccess) {
      console.log(`Session State changed to: ${SessionQuery.data.loopState} [cxnState: ${SessionQuery.data.cxnState}]`)
      if (SessionQuery.data.cxnState == SessionState.CONNECTED)
        setSessionState(SessionQuery.data.loopState)
      else
        setSessionState(SessionQuery.data.cxnState)

      if (!Object.values(SessionState).includes(SessionQuery.data.loopState as SessionState)) {
        console.warn(`Unknown Session State: ${SessionQuery.data.loopState} [cxnState: ${SessionQuery.data.cxnState}]`)
      }

      if (SessionQuery.data.loopState == SessionState.INGAME) setFetchInterval(60)
      else if (SessionQuery.data.loopState == SessionState.CLOSED) setFetchInterval(10)
      else setFetchInterval(5)

      return
    }

    setSessionState(SessionState.CLOSED)
  }, [SessionQuery.data]);

  return {state: sessionState, refetch: SessionQuery.refetch}
}