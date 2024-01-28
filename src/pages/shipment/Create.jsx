import { api } from '../../helpers/api';
import React, { useRef, useState }  from 'react';
import { helper } from '../../helpers/general';
import ErrorDisplay from '../../components/ErrorDisplay'
import Input from '../../components/Input';
import Button  from '../../components/Button';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default (key)=>{

    let referenceWayBill = useRef()
    let referenceCustomerName = useRef()
    let referenceCustomerAddress = useRef()
    let referenceCutomerPhoneNumber = useRef()

    const [errors, setErrors] = useState(null);    
    const [btnLoading, setBtnLoading] = useState(false) 

    const store = async (event) =>{
        resetStateMangments()
        event.preventDefault();
        setBtnLoading(true)
        let payload = {
            waybill: referenceWayBill.current.value,
            customer_name: referenceCustomerName.current.value,
            customer_address: referenceCustomerAddress.current.value,
            customer_phone_number: referenceCutomerPhoneNumber.current.value,
        }
        await api.createShipment(payload)
        .then((response) => {
            console.log(response);
            clearFields();
            helper.showToast(response.message, 'success');
        })
        .catch ((errors) => {
            // Use the handleErrors function and store the errors
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

    function clearFields (){
        referenceWayBill.current.value = ''
        referenceCustomerName.current.value = ''
        referenceCustomerAddress.current.value = ''
        referenceCutomerPhoneNumber.current.value = ''
    }

    return ( 
        <div className="container mt-5">
            <div className="row mt-4">
                <div className="card p-4 shadow-2 border-round w-full">
                    <div className="card-body">
                        <div className="text-center mb-2">
                            <h2 className="text-900 text-3xl font-medium">Add new shipment</h2>
                        </div>
                        <ErrorDisplay errors={errors} />
                        <form onSubmit={store}>
                            <Input label="Way Bill" type="text" placeholder="Enter waybill" reference={referenceWayBill} />
                            <Input label="Customer Name" type="text" placeholder="Enter Customer Name" reference={referenceCustomerName} />
                            <Input label="Customer Phone Number" type="text" placeholder="Enter Customer Phone Number" reference={referenceCutomerPhoneNumber} />
                            <Input label="Customer Address" type="text" placeholder="Enter Customer Address" reference={referenceCustomerAddress} />
                            <Button type="submit" label="Submit" loading={btnLoading} />
                            <Link className="btn btn-danger mx-2" to="/shipments">
                            <FontAwesomeIcon icon={faArrowCircleLeft} className="mx-2" />
                            Go Back
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );      
}