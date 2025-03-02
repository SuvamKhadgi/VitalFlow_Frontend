import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Additems from "./core/private/all items/add_items";
import Allitems from "./core/private/all items/allitems";
import Allorder from "./core/private/all order/allorder";
import Users from "./core/private/all users/allusers";
import Dashboard from "./core/private/dashboard/dashboard";
import Ordercart from "./core/public/my cart/mycart";
import BabyCare from "./core/public/product/babycare";
import Success from "./core/public/my cart/success";
import Failure from "./core/public/my cart/failure";
import  MenCare  from "./core/public/product/mencare";
import WomanCare from "./core/public/product/womencare";
const Home = lazy(() => import("./core/public/home/home"));
const Login = lazy(() => import("./core/public/creads/login_page"));
const Signup = lazy(() => import("./core/public/creads/signup_page"));
const FirstAid = lazy(() => import("./core/public/product/FirstAid"));
const queryClient = new QueryClient();
function App() {
    const publicRoutes = [
        {
            path: "/login",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Login />
                </Suspense>
            ),
        },
        {
            path: "/signup",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Signup />
                </Suspense>
            ),
        },
        {
            path: "/",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Home />
                </Suspense>
            ),
        },
        {
            path: "/admindashboard",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard />
                </Suspense>
            ),
        },
        {
            path: "/additems",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Additems />
                </Suspense>
            ),
        },
        {
            path: "/getitems",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Allitems />
                </Suspense>
            ),
        },
        {
            path: "/allusers",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Users />
                </Suspense>
            ),
        },
        {
            path: "/allorder",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Allorder />
                </Suspense>
            ),
        },
        {
            path: "/babycare",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <BabyCare />
                </Suspense>
            ),
        },
        {
            path: "/womancare",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <WomanCare/>
                </Suspense>
            ),
        },
        {
            path: "/mencare",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <MenCare/>
                </Suspense>
            ),
        },
        {
            path: "/mycart",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Ordercart />
                </Suspense>
            ),
        },
        {
            path: "/first-aid",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <FirstAid />
                </Suspense>
            ),
        },
        {
            path: "/mycart",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Ordercart />
                </Suspense>
            ),
        },
        {
            path: "/payment-success",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Success/>
                </Suspense>
            ),
        },
        {
            path: "/payment-failure",
            element: (
                <Suspense fallback={<div>Loading...</div>}>
                    <Failure/>
                </Suspense>
            ),
        },
    ];

    // const privateRoutes=[];
    const router = createBrowserRouter(publicRoutes);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </>
    );
}

export default App;
