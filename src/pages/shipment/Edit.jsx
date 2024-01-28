import { api } from '../../helpers/api';
import React, { useEffect, useRef, useState }  from 'react';
import { helper } from '../../helpers/general';
import ErrorDisplay from '../../components/ErrorDisplay'
import Input from '../../components/Input';
import Button  from '../../components/Button';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default (props) => {
    let referenceWayBill = useRef();
    let referenceCustomerName = useRef();
    let referenceCustomerAddress = useRef();
    let referenceCutomerPhoneNumber = useRef();
  
    const { id } = useParams();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false) 

  
    useEffect(() => {
      getShipmentDetails();
    }, [id]);
  
    const getShipmentDetails = async () => {
        setLoading(true)
        await api.getShipment(id)
        .then((response) => {
            const { waybill, customer_name, customer_address, customer_phone_number } = response.data;
            referenceWayBill.current.value = waybill;
            referenceCustomerName.current.value = customer_name;
            referenceCustomerAddress.current.value = customer_address;
            referenceCutomerPhoneNumber.current.value = customer_phone_number;
        }).catch((errors) => {
            const errorList = helper.handleErrors(errors, true);
            setErrors(errorList);
        }).finally(() => {
            setLoading(false)
        });
    };
  
    const update = async (event) => {
      resetStateMangments();
      event.preventDefault();
      setBtnLoading(true)
      const payload = {
        id: id,
        waybill: referenceWayBill.current.value,
        customer_name: referenceCustomerName.current.value,
        customer_address: referenceCustomerAddress.current.value,
        customer_phone_number: referenceCutomerPhoneNumber.current.value,
      };
  
        await api.updateShipment(id, payload)
        .then((response) => {
            helper.showToast(response.message, 'success');
        }).catch((errors) => {
            const errorList = helper.handleErrors(errors, true);
            setErrors(errorList);
        }).finally(() => {
            setBtnLoading(false)
        });
    };
  
    const resetStateMangments = () => {
      setErrors(null);
    };
  
  
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="card p-4 shadow-2 border-round w-full">
            <div className="card-body">
              <div className="text-center mb-2">
                <h2 className="text-900 text-3xl font-medium">Edit shipment: {id}</h2>
              </div>
              <ErrorDisplay errors={errors} />
              <form onSubmit={update}>
                {loading && ( 
                    <>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12  placeholder-lg"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12  placeholder-lg"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12  placeholder-lg"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12  placeholder-lg"></span>
                        </p>
                        <a href="#" tabIndex="-1" className="btn btn-primary disabled placeholder col-2" aria-hidden="true"></a>
                        <a href="#" tabIndex="-1" className="btn btn-danger disabled placeholder col-2 mx-2" aria-hidden="true"></a>
                    </>
                )}
                {!loading && (
                    <>
                    <Input label="Way Bill" type="text" placeholder="Enter waybill" reference={referenceWayBill} />
                    <Input label="Customer Name" type="text" placeholder="Enter Customer Name" reference={referenceCustomerName} />
                    <Input label="Customer Phone Number" type="text" placeholder="Enter Customer Phone Number" reference={referenceCutomerPhoneNumber} />
                    <Input label="Customer Address" type="text" placeholder="Enter Customer Address" reference={referenceCustomerAddress} />
                    <Button type="submit" label="Submit" loading={btnLoading} />
                    <Link className="btn btn-danger mx-2" to="/shipments">
                    <FontAwesomeIcon icon={faArrowCircleLeft} className="mx-2" />
                    Go Back
                    </Link>
                    </>
                )}

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
  