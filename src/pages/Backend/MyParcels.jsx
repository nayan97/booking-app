import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  //   console.log(user.email);

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`api/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const navigate = useNavigate();
  //   console.log(parcels);
  const handlePay = (id) => {
    console.log("ipayment:", id);
    navigate(`/dashboard/payment/${id}`);
  };

  //
  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/parcels/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Parcel has been deleted.",
                icon: "success",
              });
            }
            refetch();
          })

          .catch((err) => {
            console.error(err);
            Swal.fire("Error!", "Failed to delete parcel.", "error");
          });
      }
    });
  };

  return (
    <div className="">
      <h1>my Parcels: {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td
                  className={`badge ${
                    parcel.paymentStatus === "paid"
                      ? "badge-success"
                      : "badge-warning"
                  }`}
                >
                  {parcel.paymentStatus}
                </td>
                <td>Red</td>
                <td>
                  <Link>
                    <button
                      onClick={() => handlePay(parcel._id)}
                      className="btn btn-warning btn-sm mx-1"
                      disabled={parcel.paymentStatus === "paid"}
                    >
                      Pay
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-error btn-sm mx-1"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
