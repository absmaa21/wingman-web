import {useContext} from "react";
import {UserContext} from "../types/contexts/Contexts.ts";

export default function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within UserProvider!')
  }
  return context
}