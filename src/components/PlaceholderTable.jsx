import React from 'react';

const PlaceholderTable = ({ numRows, numCols }) => {
  const generateRows = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(
        <tr key={i}>
          {[...Array(numCols)].map((_, index) => (
            <td key={index}>
              <p className="placeholder-glow">
                <span className="placeholder col-12  placeholder-lg"></span>
              </p>
            </td>
          ))}
        </tr>
      );
    }
    return rows;
  };

  return <>{generateRows()}</>;
};

export default PlaceholderTable;
