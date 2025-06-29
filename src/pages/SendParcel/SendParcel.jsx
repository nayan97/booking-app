import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const warehouses = useLoaderData(); // full JSON from loader


// console.log("Loaded warehouses:", warehouses);

  const { register, watch, handleSubmit } = useForm();

  const [selectedRegion, setSelectedRegion] = useState("");

  // ✅ Get unique regions (division list)

const uniqueRegions = [...new Set(warehouses.map(w => w.region))].sort();

  // ✅ Filter warehouses by selected region
const getDistrictsByRegion = (region) =>
  warehouses
    .filter((w) => w.region === region)
    .map((w) => w.district); // or w.district if that's the property

  // 🔄 Watch form input
  const regionSender = watch("sender_region");
  const regionRec = watch("rec_region");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
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
            {...register("region")}
            className="select select-bordered w-full"
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Select Region</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            {...register("warehouse")}
            className="select select-bordered w-full"
          >
            <option value="">Select Warehouse</option>
            {getDistrictsByRegion(regionSender).map((w) => (
              <option key={w.id} value={w.name}>
                {w.name}
              </option>
            ))}
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
            {...register("region")}
            className="select select-bordered w-full"
           
          >
            <option value="">Select Region</option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            {...register("warehouse")}
            className="select select-bordered w-full"
          >
            <option value="">Select Warehouse</option>
            {getDistrictsByRegion(regionRec).map((w) => (
              <option key={w.id} value={w.name}>
                {w.name}
              </option>
            ))}
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
