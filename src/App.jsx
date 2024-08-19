import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to='/dashboard' />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/bookings" element={<Bookings />} />
            <Route exact path='/cabins' element={<Cabins />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/settings" element={<Settings />} />
            <Route exact path="/account" element={<Account />} />
          </Route>
          <Route exact path="login" element={<Login />} />
          <Route exact path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={
          {
            margin: "8px"
          }}
        toastOptions={
          {
            success: {
              duration: 1000
            },
            error: {
              duration: 1000
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-100)',
              color: 'var(--color-grey-500)'
            }
          }
        }
      />
    </QueryClientProvider>
  )
}

export default App
