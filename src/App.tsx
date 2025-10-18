import {Route, Routes} from "react-router";
import Introduction from "./screens/Introduction.tsx";
import ValAuth from "./screens/ValAuth.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Layout from "./components/Layout.tsx";

function App() {

  return (
    <Layout>
      <Routes>
        <Route index element={<Introduction/>}/>
        <Route path={'/val-auth'} element={<ValAuth/>}/>
        <Route element={<ProtectedRoute/>}>

        </Route>
      </Routes>
    </Layout>
  )
}

export default App
