import {Route, Routes} from "react-router";
import Introduction from "./screens/Introduction.tsx";
import ValAuth from "./screens/ValAuth.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Layout from "./components/Layout.tsx";
import PageNotFound from "./screens/PageNotFound.tsx";
import Dashboard from "./screens/Dashboard.tsx";
import Endpoint from "./screens/Endpoint.tsx";

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={'*'} element={<PageNotFound/>} />
        <Route index element={<Dashboard/>}/>
        <Route path={'/welcome'} element={<Introduction/>} />
        <Route path={'/val-auth'} element={<ValAuth/>}/>

        <Route element={<ProtectedRoute adminOnly />}>
          <Route path={'/endpoint'} element={<Endpoint/>} />
        </Route>

      </Routes>
    </Layout>
  )
}

export default App
