import React from 'react';

const Filter = ({ filter, handleFilterChange }) => {
    return (
      <form>
          <div>
            find countries<input
                            value={filter}
                            onChange={handleFilterChange}
                          />
          </div>
      </form>
    )
}

export default Filter