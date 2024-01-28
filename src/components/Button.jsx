import React from 'react';

const Button = ({ type, label, onClick, loading = false }) => {
  return (
    <button
      type={type}
      className="btn btn-primary"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Processing...' : label}
    </button>
  );
};

export default Button;
