// src/pages/AddRider.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAaxiosSecure from "../../hooks/useAxiosSecure";

import Swal from "sweetalert2";

const AddRider = () => {
  const { user } = useAuth(); // { displayName, email, ... }
    const axiosSecure = useAaxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const [loading, setLoading] = useState(false);

  // ──────────────────────────────────────────────────────────────────────────────
const onSubmit = (data) => {
  // Add extra metadata
  const riderData = {
    ...data,
    createdAt: new Date().toISOString(),
    status: "pending",
    approved: false,
    user: {
      name: user?.displayName || "Unknown",
      email: user?.email || "unknown@example.com",
      uid: user?.uid || "anonymous",
    },
  };

  // Show confirmation before submit
  Swal.fire({
    title: "Confirm Submission",
    text: "Are you sure you want to apply as a rider?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes, Submit",
  }).then((result) => {
    if (result.isConfirmed) {
      // POST the rider data to the backend
      axiosSecure
        .post("/api/riders", riderData)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Your rider application has been submitted.",
              icon: "success",
            });
            reset();
          } else {
            Swal.fire("Error", "Could not submit your application.", "error");
          }
        })
        .catch((error) => {
          console.error("Submission failed", error);
          Swal.fire("Error", "Something went wrong.", "error");
        });
    }
  });
};



  // ──────────────────────────────────────────────────────────────────────────────

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Become a Rider</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ── PERSONAL INFO ────────────────────────────────────────────────── */}
        <fieldset className="grid md:grid-cols-2 gap-6">
          {/* Name (read‑only) */}
          <div>
            <label className="label">Full Name</label>
            <input
              type="text"
              readOnly
              {...register("name")}
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Email (read‑only) */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              readOnly
              {...register("email")}
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="label">Phone Number *</label>
            <input
              type="tel"
              placeholder="01XXXXXXXXX"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Invalid BD phone number",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* DOB */}
          <div>
            <label className="label">Date of Birth *</label>
            <input
              type="date"
              {...register("dob", { required: "Date of birth is required" })}
              className="input input-bordered w-full"
            />
            {errors.dob && (
              <p className="text-red-500 text-sm">{errors.dob.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="label">Current Address *</label>
            <textarea
              rows={3}
              {...register("address", { required: "Address is required" })}
              className="textarea textarea-bordered w-full"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
        </fieldset>

        {/* ── VEHICLE INFO ─────────────────────────────────────────────────── */}
        <fieldset className="grid md:grid-cols-2 gap-6">
          {/* Vehicle type */}
          <div>
            <label className="label">Vehicle Type *</label>
            <select
              {...register("vehicleType", { required: "Select vehicle type" })}
              className="select select-bordered w-full"
            >
              <option value="">— Select —</option>
              <option value="bicycle">Bicycle</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="car">Car</option>
              <option value="van">Van</option>
            </select>
            {errors.vehicleType && (
              <p className="text-red-500 text-sm">
                {errors.vehicleType.message}
              </p>
            )}
          </div>

          {/* Vehicle model */}
          <div>
            <label className="label">Vehicle Model *</label>
            <input
              type="text"
              {...register("vehicleModel", {
                required: "Vehicle model is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.vehicleModel && (
              <p className="text-red-500 text-sm">
                {errors.vehicleModel.message}
              </p>
            )}
          </div>

          {/* Registration number */}
          <div>
            <label className="label">Registration Number *</label>
            <input
              type="text"
              {...register("registrationNumber", {
                required: "Registration number is required",
              })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="label">Years of Experience *</label>
            <input
              type="number"
              min={0}
              {...register("experience", {
                required: "Experience is required",
                valueAsNumber: true,
              })}
              className="input input-bordered w-full"
            />
          </div>
        </fieldset>

        {/* ── DOCUMENTS ────────────────────────────────────────────────────── */}
        {/* <fieldset className="grid md:grid-cols-2 gap-6">
       
          <div>
            <label className="label">NID Image *</label>
            <input
              type="file"
              accept="image/*"
              {...register("nidImage", { required: "NID image is required" })}
              className="file-input file-input-bordered w-full"
            />
            {errors.nidImage && (
              <p className="text-red-500 text-sm">{errors.nidImage.message}</p>
            )}
          </div>

          <div>
            <label className="label">License Image *</label>
            <input
              type="file"
              accept="image/*"
              {...register("licenseImage", {
                required: "License image is required",
              })}
              className="file-input file-input-bordered w-full"
            />
            {errors.licenseImage && (
              <p className="text-red-500 text-sm">
                {errors.licenseImage.message}
              </p>
            )}
          </div>

  
          <div className="md:col-span-2">
            <label className="label">Profile Picture *</label>
            <input
              type="file"
              accept="image/*"
              {...register("profileImage", {
                required: "Profile picture is required",
              })}
              className="file-input file-input-bordered w-full"
            />
            {errors.profileImage && (
              <p className="text-red-500 text-sm">
                {errors.profileImage.message}
              </p>
            )}
          </div>
        </fieldset> */}

        {/* ── BANK INFO ────────────────────────────────────────────────────── */}
        <fieldset className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Bank Name *</label>
            <input
              type="text"
              {...register("bankName", { required: "Bank name is required" })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Account Number *</label>
            <input
              type="text"
              {...register("bankAccount", {
                required: "Account number is required",
              })}
              className="input input-bordered w-full"
            />
          </div>
        </fieldset>

        {/* ── EMERGENCY CONTACT ───────────────────────────────────────────── */}
        <fieldset className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="label">Emergency Contact Name *</label>
            <input
              type="text"
              {...register("emergencyContactName", {
                required: "Emergency contact is required",
              })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Emergency Contact Phone *</label>
            <input
              type="tel"
              {...register("emergencyContactPhone", {
                required: "Emergency phone is required",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message: "Invalid BD phone number",
                },
              })}
              className="input input-bordered w-full"
            />
            {errors.emergencyContactPhone && (
              <p className="text-red-500 text-sm">
                {errors.emergencyContactPhone.message}
              </p>
            )}
          </div>
        </fieldset>

        {/* ── SUBMIT ───────────────────────────────────────────────────────── */}
        <button type="submit" className="btn bg-[#CAEB66] w-full" disabled={loading}>
          {loading ? "Submitting…" : "Apply Now"}
        </button>
      </form>
    </div>
  );
};

export default AddRider;
