import { Link } from 'react-router-dom';
import { api } from '../../helpers/api';
import Input from '../../components/Input';
import Button  from '../../components/Button';
import { helper } from '../../helpers/general';
import logo from '../../assets/images/logo.png';
import React, { useRef, useState }  from 'react';
import ErrorDisplay from '../../components/ErrorDisplay'
import { useStateContext } from '../../context/AuthContext';

export default (props)=>{

    let referenceEmail = useRef()
    let referencePassword = useRef()

    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null);    
    const [btnLoading, setBtnLoading] = useState(false) 

    const login = async (event) =>{
        resetStateMangments()
        event.preventDefault();
        let payload = {
            email: referenceEmail.current.value,
            password: referencePassword.current.value,
        }
        setBtnLoading(true)
        // Call the login API
        await api.login(payload)
        .then((response) => {
            setUser(response.data.user);
            setToken(response.data.access_token);
            helper.showToast(response.data.message, 'success');
        }).catch((errors) => {
            const errorList = helper.handleErrors(errors, true);
            // I'm gonna keep this to show the error on the page as a second option to the toast
            setErrors(errorList); 
        }).finally(() => {
            setBtnLoading(false)
        });   
    };

    function resetStateMangments(){
        setErrors(null)
    };

    return (     
        <div className="container mt-5 w-50">
            <div className="row">
                <div className="card p-4 shadow-2 border-round w-full">
                    <div className="card-body">
                        <div className="text-center mb-2">
                            <img src={logo} alt="logo" width={150} />
                            <div className="text-900 text-3xl font-medium">Welcome Back</div>
                            <span className="text-600 font-medium line-height-3">Don't have an account?</span>
                            <Link to="/register" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer mx-2">Create today!</Link>
                        </div>
                        <ErrorDisplay errors={errors} />
                        <form onSubmit={login}>
                            <Input label="Email address" type="email" placeholder="Enter email" reference={referenceEmail} />
                            <Input label="Password" type="password" placeholder="Password" reference={referencePassword} />
                            <Button type="submit" label="Submit" loading={btnLoading} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );      
}

