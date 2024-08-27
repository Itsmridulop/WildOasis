import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DarkModeProvider } from "./context/DarkModeContext"
import { Toaster } from "react-hot-toast"
import { Suspense, lazy } from "react"

import ProtectedRoute from './ui/ProtectedRoute'
import AppLayout from "./ui/AppLayout"
import Spinner from "./ui/Spinner"

const Booking = lazy(() => import('./pages/Booking'))
const Account = lazy(() => import('./pages/Account'))
const Settings = lazy(() => import('./pages/Settings'))
const CheckIn = lazy(() => import('./pages/CheckIn'))
const Users = lazy(() => import('./pages/Users'))
const Cabins = lazy(() => import('./pages/Cabins'))
const Bookings = lazy(() => import('./pages/Bookings'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner/>}>
          <Router>
            <Routes>
              <Route element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate replace to='/dashboard' />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/bookings" element={<Bookings />} />
                <Route exact path='/cabins' element={<Cabins />} />
                <Route exact path="/users" element={<Users />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/account" element={<Account />} />
                <Route exact path="/bookings/:bookingId" element={<Booking />} />
                <Route exact path="/checkin/:bookingId" element={<CheckIn />} />
              </Route>
              <Route exact path="login" element={<Login />} />
              <Route exact path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </Suspense>
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
    </DarkModeProvider>
  )
}

export default App
