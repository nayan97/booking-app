import React from 'react';

const Body = () => {
    return (

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="card bg-base-200 shadow">
      <div className="card-body">
        <h2 className="card-title">Total Orders</h2>
        <p className="text-3xl font-bold">150</p>
      </div>
    </div>
    <div className="card bg-base-200 shadow">
      <div className="card-body">
        <h2 className="card-title">Total Customers</h2>
        <p className="text-3xl font-bold">50</p>
      </div>
    </div>
    <div className="card bg-base-200 shadow">
      <div className="card-body">
        <h2 className="card-title">Total Sales</h2>
        <p className="text-3xl font-bold">$1000</p>
      </div>
    </div>
  </div>
);

};

export default Body;