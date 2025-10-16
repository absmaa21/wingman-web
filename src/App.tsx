import {Route, Routes} from "react-router";
import Layout from "./components/Layout.tsx";
import Introduction from "./screens/Introduction.tsx";
import Endpoint from "./screens/Endpoint.tsx";
import ValAuth from "./screens/ValAuth.tsx";

function App() {

  return (
    <Layout>
      <Routes>
        <Route index element={<Introduction/>} />
        <Route path={'/val-auth'} element={<ValAuth/>} />
        <Route path={'/endpoint/:urlKey'} element={<Endpoint/>} />
        <Route path={'/endpoint/test'} element={<Endpoint isTest/>} />
      </Routes>
    </Layout>
  )
}

export default App
