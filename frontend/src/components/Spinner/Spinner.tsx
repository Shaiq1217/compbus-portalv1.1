import React from 'react';

const Spinner = () => {
  // create a spinner component that spins
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );  }

export default Spinner;