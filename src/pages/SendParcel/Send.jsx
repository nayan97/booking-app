import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const warehouses = useLoaderData();
  const { register, handleSubmit, watch } = useForm();

  // 🔍 Watch sender & receiver region selections
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  // 🔁 Extract unique regions from warehouse list
  const uniqueRegions = [...new Set(warehouses.map(w => w.region))].sort();

  // 📦 Get districts based on selected region
  const getDistrictsByRegion = (region) => {
    if (!region) return [];
    return warehouses
      .filter(w => w.region === region)
      .map(w => ({
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
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Send Parcel</h2>

      {/* ✅ Sender Section */}
      <h3 className="text-xl font-semibold mb-4">Sender Information</h3>
      <label className="block mb-2 font-semibold">Select Region</label>
      <select
        {...register("senderRegion", { required: true })}
        className="select select-bordered w-full mb-4"
        defaultValue=""
      >
        <option disabled value="">-- Choose a Region --</option>
        {uniqueRegions.map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Select District (Warehouse)</label>
      <select
        {...register("senderDistrict", { required: true })}
        className="select select-bordered w-full mb-6"
        disabled={!senderRegion}
        defaultValue=""
      >
        <option disabled value="">-- Choose a District --</option>
        {getDistrictsByRegion(senderRegion).map((d) => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>

      {/* ✅ Receiver Section */}
      <h3 className="text-xl font-semibold mb-4">Receiver Information</h3>
      <label className="block mb-2 font-semibold">Select Region</label>
      <select
        {...register("receiverRegion", { required: true })}
        className="select select-bordered w-full mb-4"
        defaultValue=""
      >
        <option disabled value="">-- Choose a Region --</option>
        {uniqueRegions.map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>

      <label className="block mb-2 font-semibold">Select District (Warehouse)</label>
      <select
        {...register("receiverDistrict", { required: true })}
        className="select select-bordered w-full mb-6"
        disabled={!receiverRegion}
        defaultValue=""
      >
        <option disabled value="">-- Choose a District --</option>
        {getDistrictsByRegion(receiverRegion).map((d) => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>

      {/* 🔘 Submit */}
      <button type="submit" className="btn btn-success w-full">
        Confirm Parcel
      </button>
    </form>
  );
};

export default SendParcel;
