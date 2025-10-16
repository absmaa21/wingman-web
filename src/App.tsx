import {Route, Routes} from "react-router";
import Introduction from "./screens/Introduction.tsx";
import ValAuth from "./screens/ValAuth.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {

  return (
    <Routes>
      <Route index element={<Introduction/>}/>
      <Route path={'/val-auth'} element={<ValAuth/>}/>
      <Route element={<ProtectedRoute/>}>

      </Route>
    </Routes>
  )
}

export default App
