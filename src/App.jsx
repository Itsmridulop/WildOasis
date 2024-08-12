import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import GlobalStyle from './styles/GlobalStyle'

import Account from "./pages/Account"
import Settings from "./pages/Settings"
import Users from "./pages/Users"
import Cabins from "./pages/Cabins"
import Bookings from "./pages/Bookings"
import Dashboard from "./pages/Dashboard"
import AppLayout from "./ui/AppLayout"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route index element={<Navigate replace to='/dashboard'/>}/>
            <Route exact path="/dashboard" element={<Dashboard/>}/>
            <Route exact path="/bookings" element={<Bookings/>}/>
            <Route exact path="/cabins" element={<Cabins/>}/>
            <Route exact path="/users" element={<Users/>}/>
            <Route exact path="/settings" element={<Settings/>}/>
            <Route exact path="/account" element={<Account/>}/>
          </Route>
          <Route exact path="login" element={<Login/>}/>
          <Route exact path="*" element={<PageNotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
