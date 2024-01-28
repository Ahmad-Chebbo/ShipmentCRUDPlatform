import React from "react";

import Login from "./pages/auth/Login";
import Edit from "./pages/shipment/Edit";
import View from "./pages/shipment/View";
import Index from "./pages/shipment/Index";
import Create from "./pages/shipment/Create";
import Register from "./pages/auth/Register";
import GuestLayout from "./layouts/GuestLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { Navigate, createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
    {
        path : '/',
        element : <ProtectedLayout/>,
        children:[
            {
                path : '/',
                element : <Navigate to="/shipments" />
            },
            {
                path : '/shipments',
                element : <Index/>
            },
            {
                path : '/shipments/create',
                element : <Create />
            },
            {
                path : '/shipments/update/:id',
                element : <Edit />
            },
            {
                path : '/shipments/:id',
                element : <View />
            },
        ]
    },
    {
        path : '/',
        element : <GuestLayout/>,
        children : [
            {
                path : '/login',
                element : <Login/>
            },
            {
                path : '/register',
                element : <Register/>
            },
        ]
    },
])


export default routes;