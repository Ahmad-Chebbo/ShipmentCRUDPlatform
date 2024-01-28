import React from 'react';

const ErrorDisplay = ({ errors }) => {
  return (
    <div>
      {errors && (
            <div className="alert alert-danger" role="alert">
                <ul className='mb-0'>
                {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
                </ul>
            </div>
        )}
    </div>
  );
};

export default ErrorDisplay;
