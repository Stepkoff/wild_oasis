import {createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider} from "react-router-dom";
import {DashboardPage} from "@/pages/DashboardPage.tsx";
import {ErrorPage} from "@/pages/ErrorPage.tsx";
import {NotFoundPage} from "@/pages/NotFoundPage.tsx";
import {AppLayout} from "@/app/AppLayout.tsx";
import {LoginPage} from "@/pages/LoginPage.tsx";
import {BookingsPage} from "@/pages/BookingsPage.tsx";
import {CabinsPage} from "@/pages/CabinsPage.tsx";
import {UsersPage} from "@/pages/UsersPage.tsx";
import {SettingsPage} from "@/pages/SettingsPage.tsx";
import {AccountPage} from "@/pages/AccountPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ToastContainer} from "react-toastify";

const GlobalLayout = () => {
  return (
    <>
      <Outlet/>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={'/'} errorElement={<ErrorPage/>} element={<GlobalLayout/>}>
    <Route path={'/login'} element={<LoginPage/>} />

    <Route element={<AppLayout/>}>
      <Route index element={<Navigate replace to={'/dashboard'} />} />
      <Route path={'dashboard'} element={<DashboardPage/>} />
      <Route path={'bookings'} element={<BookingsPage/>} />
      <Route path={'cabins'} element={<CabinsPage/>} />
      <Route path={'users'} element={<UsersPage/>} />
      <Route path={'settings'} element={<SettingsPage/>} />
      <Route path={'account'} element={<AccountPage/>} />
    </Route>

    <Route path={'*'} element={<NotFoundPage/>} />
  </Route>
))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000
      staleTime: 0
    }
  }
});

export const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools buttonPosition={'bottom-left'} initialIsOpen={false} />
    </QueryClientProvider>
  )
}

