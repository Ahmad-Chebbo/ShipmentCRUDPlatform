import React  from 'react';
import { useStateContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const GuestLayout = (props)=>{
    const {token} = useStateContext()
    if(token){
        return <Navigate to="/shipments" />
    }
    return ( 
        <div>
            <Outlet/>
        </div>
    );
}
export default GuestLayout;