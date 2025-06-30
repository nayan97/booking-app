import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const warehouses = useLoaderData();
  const { register, handleSubmit, watch } = useForm();

  const parcelType = watch("parcelType"); // 👈 Watch selected parcel type
  const isNonDoc = parcelType === "non-doc"; // Boolean for enabling inputs

  // 🔍 Watch sender & receiver region selections
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // 🔁 Extract unique regions from warehouse list
  const uniqueRegions = [...new Set(warehouses.map((w) => w.region))].sort();

  // 📦 Get districts based on selected region
  const getDistrictsByRegion = (region) => {
    if (!region) return [];
    return warehouses
      .filter((w) => w.region === region)
      .map((w) => ({
        name: w.district,
        id: `${w.region}-${w.district}`,
      }));
  };

  const onSubmit = (data) => {
    console.log("Parcel Data:", data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Enter your parcel details</h2>

      {/* Radio Buttons */}
<div className="mb-6">
  <label className="block mb-2 font-semibold">Parcel Type</label>
  <div className="flex gap-6">
    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="doc"
        {...register("parcelType", { required: true })}
        className="radio"
      />
      Doc
    </label>
    <label className="flex items-center gap-2">
      <input
        type="radio"
        value="non-doc"
        {...register("parcelType", { required: true })}
        className="radio"
      />
      Non-Doc
    </label>
  </div>
</div>


      {/* Parcel Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
           {...register("parcelName", { required: true })}
          type="text"
          placeholder="Parcel Name"
          className="input input-bordered w-full"
        
        />
        <input
          {...register("parcelWeight", {
            required: isNonDoc ? "Weight is required" : false,
          })}
          type="text"
          placeholder="Parcel Weight (KG)"
          className="input input-bordered w-full"
          disabled={!isNonDoc}
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
          <label className="block mb-2 font-semibold">Select Region</label>
          <select
            {...register("senderRegion", { required: true })}
            className="select select-bordered w-full mb-4"
            defaultValue=""
          >
            <option disabled value="">
              -- Choose a Region --
            </option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">
            Select District (Warehouse)
          </label>
          <select
            {...register("senderDistrict", { required: true })}
            className="select select-bordered w-full mb-6"
            disabled={!senderRegion}
            defaultValue=""
          >
            <option disabled value="">
              -- Choose a District --
            </option>
            {getDistrictsByRegion(senderRegion).map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
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
          <label className="block mb-2 font-semibold">Select Region</label>
          <select
            {...register("receiverRegion", { required: true })}
            className="select select-bordered w-full mb-4"
            defaultValue=""
          >
            <option disabled value="">
              -- Choose a Region --
            </option>
            {uniqueRegions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">
            Select District (Warehouse)
          </label>
          <select
            {...register("receiverDistrict", { required: true })}
            className="select select-bordered w-full mb-6"
            disabled={!receiverRegion}
            defaultValue=""
          >
            <option disabled value="">
              -- Choose a District --
            </option>
            {getDistrictsByRegion(receiverRegion).map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
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
