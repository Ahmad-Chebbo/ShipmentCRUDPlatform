import { Link } from 'react-router-dom';
import { api } from '../../helpers/api';
import Input from '../../components/Input';
import Button  from '../../components/Button';
import logo from '../../assets/images/logo.png'
import { helper } from '../../helpers/general';
import React, { useRef, useState }  from 'react';
import ErrorDisplay from '../../components/ErrorDisplay'
import { useStateContext } from '../../context/AuthContext';
import { faL } from '@fortawesome/free-solid-svg-icons';


export default (props)=>{

    let referenceEmail = useRef()
    let referenceName = useRef()
    let referencePassword = useRef()
    let referencePasswordConfirm = useRef()

    const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null);    
    const [btnLoading, setBtnLoading] = useState(false) 

    const register = async (event) =>{
        setBtnLoading(true)
        resetStateMangments()
        event.preventDefault();
        let payload = {
            name: referenceName.current.value,
            email: referenceEmail.current.value,
            password: referencePassword.current.value,
            password_confirmation: referencePasswordConfirm.current.value,
        }
        // Call the register API
        await api.register(payload)
        .then((response) => {
            console.log(response);
            setUser(response.data.user);
            setToken(response.data.access_token);
            helper.showToast(response.data.message, 'success');
            setBtnLoading(false)
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
                            <div className="text-900 text-3xl font-medium">Hello there</div>
                            <span className="text-600 font-medium line-height-3">Already have an account?</span>
                            <Link to="/login" className="font-medium no-underline ml-2 text-blue-500 cursor-pointer mx-2">Login!</Link>
                        </div>
                        <ErrorDisplay errors={errors} />
                        <form onSubmit={register}>
                        <Input label="Name" type="text" placeholder="Enter name" reference={referenceName} />
                            <Input label="Email address" type="email" placeholder="Enter email" reference={referenceEmail} />
                            <Input label="Password" type="password" placeholder="Password" reference={referencePassword} />
                            <Input label="Confirm Password" type="password" placeholder="Confirm Password" reference={referencePasswordConfirm} />
                            <Button type="submit" label="Submit" loading={btnLoading} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );      
}