import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
const calculateParcelPrice = ({ parcelType, weight, sameRegion }) => {
  const w = Number(weight) || 0;

  // Document
  if (parcelType === "doc") {
    const base = 60;
    const outsideSurcharge = sameRegion ? 0 : 20;
    const total = base + outsideSurcharge;
    return {
      base,
      outsideSurcharge,
      extra: 0,
      total,
    };
  }

  // Non-document
  const base = 110;
  const outsideSurcharge = sameRegion ? 0 : 40;
  const extraKg = w > 10 ? w - 10 : 0;
  const extra = extraKg * 13;

  const total = base + extra + outsideSurcharge;

  return {
    base,
    extra,
    total,
    outsideSurcharge,
  };
};

/* ───────── Custom hook ───────── */
const useParcelPrice = (watch) => {
  const parcelType = watch("parcelType");
  const weight = watch("parcelWeight");
  const senderDistrict = watch("senderDistrict");
  const receiverDistrict = watch("receiverDistrict");

  const sameRegion =
    senderDistrict && receiverDistrict && senderDistrict === receiverDistrict;

  return calculateParcelPrice({
    parcelType,
    weight,
    sameRegion,
  });
};

const SendParcel = () => {
  const { user } = useAuth();

  const warehouses = useLoaderData();
  const { register, handleSubmit, watch } = useForm();

  const parcelType = watch("parcelType"); // 👈 Watch selected parcel type
  const isNonDoc = parcelType === "non-doc"; // Boolean for enabling inputs

  // 🔍 Watch sender & receiver region selections
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const total = useParcelPrice(watch);

  console.log(total);

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

  const onSubmit = async (data) => {
    const { parcelType, parcelWeight, senderDistrict, receiverDistrict } = data;
    const sameRegion = senderDistrict === receiverDistrict;

    const { base, extra, total, outsideSurcharge } = calculateParcelPrice({
      parcelType,
      weight: parcelWeight,
      sameRegion,
    });

    Swal.fire({
      title: "Confirm Parcel Details",
      icon: "info",
      html: `
    <div class="text-left space-y-2 text-sm">
      <p><span class="font-semibold">Parcel Type:</span> <span class="badge badge-info">${parcelType}</span></p>
      <p><span class="font-semibold">Weight:</span> <span class="badge badge-outline">${
        parcelWeight || "N/A"
      } kg</span></p>
      <p><span class="font-semibold">Base Cost:</span> <span class="text-green-600 font-medium">৳ ${base}</span></p>
      <p><span class="font-semibold">Extra Cost:</span> <span class="text-orange-600 font-medium">৳ ${extra}</span></p>
        <p><span class="font-semibold">Out of City:</span> <span class="text-orange-600 font-medium">৳ ${outsideSurcharge}</span></p>
      <hr class="my-2 border-gray-300"/>
      <p><span class="font-bold text-lg">Total:</span> <span class="badge badge-success text-lg">৳ ${total}</span></p>
    </div>
  `,
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, Send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          createdAt: new Date().toISOString(), // UTC time
          paymentStatus: "unpaid", // or "paid" if using a gateway
          status: "pending", // or "booked", "shipped", etc.
          user: {
            name: user?.displayName || "Unknown",
            email: user?.email,
            uid: user?.uid,
          },
          price: total,
        };
        console.log(parcelData);
        Swal.fire({
          title: "Submited!",
          text: "Your Parcel is received.",
          icon: "success",
        });
      }
    });
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
          {...register("parcelName", {
            required: "Parcel Name is required",
          })}
          type="text"
          placeholder="Parcel Name"
          className="input input-bordered w-full"
        />

        <input
          {...register("parcelWeight", {
            required: isNonDoc ? "Parcel Weight is required" : false,
          })}
          type="number"
          step="0.01"
          min="0"
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

          <label className="block mb-2 font-semibold">Select District</label>
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
          <input
            {...register("senderAddress", { required: true })}
            type="text"
            placeholder="Address"
            className="input input-bordered w-full mb-3"
          />
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
          <input
            {...register("receiverAddress", { required: true })}
            type="text"
            placeholder="Receiver Address"
            className="input input-bordered w-full mb-3"
          />
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
