import {createContext} from "react";

interface UserContextProps {
  user: User | undefined,
  extractInformationsFromUrl: (url: URL) => Promise<boolean>,
}
export const UserContext = createContext<UserContextProps | undefined>(undefined)