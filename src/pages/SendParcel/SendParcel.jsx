import React from 'react';
import { useForm } from "react-hook-form";

const SendParcel = () => {
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Do something with the form data, like send to API
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Enter your parcel details</h2>

      {/* Radio Buttons */}
      <div className="flex gap-6 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="Document"
            {...register("parcelType")}
            className="radio checked:bg-green-500"
            defaultChecked
          />
          <span>Document</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="Not-Document"
            {...register("parcelType")}
            className="radio"
          />
          <span>Not-Document</span>
        </label>
      </div>

      {/* Parcel Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          {...register("parcelName", { required: "Parcel name is required" })}
          type="text"
          placeholder="Parcel Name"
          className="input input-bordered w-full"
        />
        <input
          {...register("parcelWeight", { required: "Weight is required" })}
          type="text"
          placeholder="Parcel Weight (KG)"
          className="input input-bordered w-full"
        />
      </div>

      {/* Sender + Receiver */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sender */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Sender Details</h3>
          <input
            {...register("senderName", { required: true })}
            type="text"
            placeholder="Sender Name"
            className="input input-bordered w-full mb-3"
          />
          <select
            {...register("senderWarehouse", { required: true })}
            className="select select-bordered w-full mb-3"
          >
            <option value="">Select Wire house</option>
            <option value="Warehouse A">Warehouse A</option>
            <option value="Warehouse B">Warehouse B</option>
          </select>
          <input
            {...register("senderAddress", { required: true })}
            type="text"
            placeholder="Address"
            className="input input-bordered w-full mb-3"
          />
          <input
            {...register("senderContact", { required: true })}
            type="text"
            placeholder="Sender Contact No"
            className="input input-bordered w-full mb-3"
          />
          <select
            {...register("senderRegion", { required: true })}
            className="select select-bordered w-full mb-3"
          >
            <option value="">Select your region</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
          </select>
          <textarea
            {...register("pickupInstruction")}
            className="textarea textarea-bordered w-full"
            placeholder="Pickup Instruction"
          />
        </div>

        {/* Receiver */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Receiver Details</h3>
          <input
            {...register("receiverName", { required: true })}
            type="text"
            placeholder="Receiver Name"
            className="input input-bordered w-full mb-3"
          />
          <select
            {...register("receiverWarehouse", { required: true })}
            className="select select-bordered w-full mb-3"
          >
            <option value="">Select Wire house</option>
            <option value="Warehouse A">Warehouse A</option>
            <option value="Warehouse B">Warehouse B</option>
          </select>
          <input
            {...register("receiverAddress", { required: true })}
            type="text"
            placeholder="Receiver Address"
            className="input input-bordered w-full mb-3"
          />
          <input
            {...register("receiverContact", { required: true })}
            type="text"
            placeholder="Receiver Contact No"
            className="input input-bordered w-full mb-3"
          />
          <select
            {...register("receiverRegion", { required: true })}
            className="select select-bordered w-full mb-3"
          >
            <option value="">Select your region</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
          </select>
          <textarea
            {...register("deliveryInstruction")}
            className="textarea textarea-bordered w-full"
            placeholder="Delivery Instruction"
          />
        </div>
      </div>

      <p className="text-sm mt-4 mb-6">* PickUp Time 4pm-7pm Approx.</p>

      <button type="submit" className="btn btn-success w-full md:w-auto">
        Proceed to Confirm Booking
      </button>
    </form>
  );
};

export default SendParcel;