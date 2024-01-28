import React , { useEffect }from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../context/AuthContext.js';
import { api } from '../helpers/api.js'
import Navbar from '../components/Navbar.jsx'
import { helper } from '../helpers/general.js';

const ProtectedLayout = (props) => {
    const { token, setUser, setToken } = useStateContext()
    
    if (!token) {
        return <Navigate to="/login" />
    }

    const onLogout = async (event) => {
        event.preventDefault()
        await api.logout()
            .then((response) => {
                setUser({})
                setToken(null)
                helper.showToast(response.message, 'success')
            })
            .catch((error) => {
                helper.handleErrors(error, true)
            })
    }

    return (
        <div id='defaultLayout'>
            <Navbar onClick={onLogout} />
            <div className='content'>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
export default ProtectedLayout;