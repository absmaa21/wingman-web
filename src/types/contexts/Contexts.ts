import {createContext} from "react";
import type {User} from "../User.ts";

interface UserContextProps {
  user: User | undefined,
  extractInformationsFromUrl: (url: URL) => Promise<boolean>,
}
export const UserContext = createContext<UserContextProps | undefined>(undefined)