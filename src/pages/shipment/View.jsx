import { api } from '../../helpers/api';
import { helper } from '../../helpers/general';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

export default () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [shipment, setShipment] = useState({
        id : null,
        waybill : null,
        customer_name : '',
        customer_address : '',
        customer_phone_number : '',
        user: '',
        created_at: '',
    })

  
    useEffect(() => {
      getShipmentDetails();
    }, [id]);
  
    const getShipmentDetails = async () => {
        setLoading(true)
        await api.getShipment(id)
        .then((response) => {
            setShipment(response.data)
        }).catch((errors) => {
            helper.handleErrors(errors, true);
        }).finally(() => {
            setLoading(false)
        });
    };
  
  
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="card p-4 shadow-2 border-round w-full">
            <div className="card-body">
              <div className="text-center mb-2">
                <h2 className="text-900 text-3xl font-medium">View shipment: {id}</h2>
              </div>
                {loading && ( 
                    <>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12 placeholder-lg"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12 placeholder-lg"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12 placeholder-lg"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12 placeholder-lg"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12 placeholder-lg"></span>
                        </p>
                        <p className="placeholder-glow">
                            <span className="placeholder col-12 placeholder-lg"></span>
                        </p>
                        <a href="#" tabIndex="-1" className="btn btn-danger disabled placeholder col-2" aria-hidden="true"></a>
                    </>
                )}
                {!loading && (
                    <>
                        <p className="placeholder-glow">
                            <b>Waybill: </b>{shipment.waybill}
                        </p>
                        <p className="placeholder-glow">
                            <b>Customer name: </b>{shipment.customer_name}
                        </p>
                        <p className="placeholder-glow">
                            <b>Customer address: </b>{shipment.customer_address}
                        </p>
                        <p className="placeholder-glow">
                            <b>Customer phone number: </b>{shipment.customer_phone_number}
                        </p>
                        <p className="placeholder-glow">
                            <b>Created at: </b>{shipment.created_at}
                        </p>
                        <p className="placeholder-glow">
                            <b>Created by: </b>{shipment.user.name}
                        </p>
                        <Link className="btn btn-danger" to="/shipments">
                        <FontAwesomeIcon icon={faArrowCircleLeft} className="mx-2" />
                        Go Back
                        </Link>
                    </>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  