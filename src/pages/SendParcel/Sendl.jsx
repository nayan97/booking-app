import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";

/* ───────── Price helper ───────── */
const calculateParcelPrice = ({ parcelType, weight, sameRegion }) => {
  // Document
  if (parcelType === "doc") {
    return sameRegion ? 60 : 80;
  }

  // Non‑document
  const w = Number(weight) || 0;
  if (w <= 3) {
    return sameRegion ? 110 : 150;
  }

  const extraKg          = w - 3;
  const extraCost        = extraKg * 12;
  const base             = sameRegion ? 110 : 150;
  const outsideSurcharge = sameRegion ? 0   : 40;

  return base + extraCost + outsideSurcharge;
};

/* ───────── Custom hook ───────── */
const useParcelPrice = (watch) => {
  const parcelType     = watch("parcelType");
  const weight         = watch("parcelWeight");
  const senderRegion   = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const sameRegion =
    senderRegion && receiverRegion && senderRegion === receiverRegion;

  return calculateParcelPrice({
    parcelType,
    weight,
    sameRegion,
  });
};

const SendParcel = () => {
  const warehouses = useLoaderData();           // [{ region,district,... }]

  /* ── react‑hook‑form ─────────────────────── */
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { parcelType: "doc" },
  });

  /* ── region ⇢ district helpers ───────────── */
  const regions = useMemo(
    () => [...new Set(warehouses.map((w) => w.region))].sort(),
    [warehouses]
  );

  const districtsByRegion = useMemo(() => {
    const map = {};
    warehouses.forEach((w) => {
      if (!map[w.region]) map[w.region] = [];
      map[w.region].push({ id: `${w.region}-${w.district}`, name: w.district });
    });
    return map;
  }, [warehouses]);

  const senderRegion   = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const price          = useParcelPrice(watch);

  /* ── submit ──────────────────────────────── */
  const onSubmit = (data) => console.log("Form payload:", data);

  /* ── UI ──────────────────────────────────── */
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold">Send Parcel</h2>

      {/* Parcel type */}
      <div className="flex gap-6">
        {["doc", "non-doc"].map((v) => (
          <label key={v} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value={v}
              {...register("parcelType", { required: true })}
              className="radio checked:bg-green-500"
            />
            {v === "doc" ? "Document" : "Non‑Document"}
          </label>
        ))}
      </div>

      {/* Parcel info (only for non‑doc) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["parcelName", "parcelWeight"].map((field, i) => (
          <input
            key={field}
            {...register(field, {
              required:
                watch("parcelType") === "non-doc"
                  ? `${field === "parcelName" ? "Parcel name" : "Parcel weight"} is required`
                  : false,
            })}
            type={i ? "number" : "text"}
            step="0.01"
            min="0"
            placeholder={i ? "Parcel Weight (KG)" : "Parcel Name"}
            className="input input-bordered w-full"
            disabled={watch("parcelType") !== "non-doc"}
          />
        ))}
      </div>

      {/* Sender */}
      <h3 className="text-xl font-semibold">Sender</h3>
      <select
        {...register("senderRegion", { required: true })}
        className="select select-bordered w-full mb-2"
        defaultValue=""
      >
        <option value="">-- Select Region --</option>
        {regions.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <select
        {...register("senderDistrict", { required: true })}
        className="select select-bordered w-full mb-4"
        disabled={!senderRegion}
        defaultValue=""
      >
        <option value="">-- Select District --</option>
        {(districtsByRegion[senderRegion] || []).map((d) => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>

      {/* Receiver */}
      <h3 className="text-xl font-semibold">Receiver</h3>
      <select
        {...register("receiverRegion", { required: true })}
        className="select select-bordered w-full mb-2"
        defaultValue=""
      >
        <option value="">-- Select Region --</option>
        {regions.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <select
        {...register("receiverDistrict", { required: true })}
        className="select select-bordered w-full mb-4"
        disabled={!receiverRegion}
        defaultValue=""
      >
        <option value="">-- Select District --</option>
        {(districtsByRegion[receiverRegion] || []).map((d) => (
          <option key={d.id} value={d.name}>{d.name}</option>
        ))}
      </select>

      {/* Live price */}
      <div className="text-lg font-medium">
        Estimated Price:&nbsp;
        <span className="badge badge-outline badge-lg">৳ {price.toFixed(0)}</span>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-success w-full md:w-auto"
      >
        {isSubmitting ? "Sending…" : "Confirm Booking"}
      </button>
    </form>
  );
};

export default SendParcel;
