import { Link } from 'react-router-dom';
import { api } from '../../helpers/api';
import { helper } from '../../helpers/general';
import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import PlaceholderTable from '../../components/PlaceholderTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import DeleteConfirmationButton from '../../components/DeleteConfirmationButton';

const Index = (props) => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    getShipments();
  }, []);

  const deleteShipment = (id) => {
    setLoading(true);
    api.deleteShipment(id)
      .then((response) => {
        if (response.success) {
          getShipments().then(() => {
            setLoading(false);
          })
        }
      })
      .catch((error) => {
        helper.handleErrors(error)
      })
      .finally(() => {
        helper.showToast('Item removed successfully', 'success')
      });
  };

  const getShipments = (page = 1) => {
    setLoading(true);
    api.getShipments(page)
      .then((response) => {
        setShipments(response.data.data);
        setMeta(response.data);
      })
      .catch((error) => {
        helper.handleErrors(error)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onPageChange = (page) => {
    getShipments(page);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Shipments</h1>
        <Link className="btn btn-primary" to="/shipments/create">
          <FontAwesomeIcon icon={faPlus} className="mx-2" />
          Add Shipment
        </Link>
      </div>

      <div className="card mt-3">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Waybill</th>
                <th>Customer Name</th>
                <th>Customer Phone</th>
                <th>Customer Address</th>
                <th className='text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <PlaceholderTable numRows={10} numCols={6} />
              )}
              {!loading && shipments.length > 0 ? (
                shipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td>{shipment.id}</td>
                    <td>{shipment.waybill}</td>
                    <td>{shipment.customer_name}</td>
                    <td>{shipment.customer_phone_number}</td>
                    <td>{shipment.customer_address}</td>
                    <td className='text-center d-flex'>
                      <Link className="btn btn-info mx-1" to={`/shipments/${shipment.id}`}>
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                      <Link className="btn btn-warning mx-1" to={`/shipments/update/${shipment.id}`}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Link>
                      <DeleteConfirmationButton confirmDeleteAction={deleteShipment} id={shipment.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className='text-center'>
                    {shipments.length === 0 ? (
                      <>
                        <p>No shipments found.</p>
                        <Link className="btn btn-primary" to="/shipments/create">
                          <FontAwesomeIcon icon={faPlus} className="mx-2" />
                          Add Shipment
                        </Link>                      </>
                    ) : (
                      <p>Loading...</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {shipments.length > 0 ? (
        <Pagination meta={meta} onPageChange={onPageChange} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Index;
