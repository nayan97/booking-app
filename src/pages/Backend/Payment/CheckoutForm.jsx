import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  console.log(parcelId);

   const axiosSecure = useAxiosSecure();
  

  const [error, setError] = useState('')

    const { data: parcels = [], isPenning } = useQuery({
    queryKey: ["my-parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`api/parcels/${parcelId}`);
      return res.data;
    },
  })
  if (isPenning){
    return <Spinner></Spinner>
  }
  console.log(parcels);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
     setError(error.message)
     
    } else {
       setError('');
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      /* Was: max‑width:800px; margin:80px auto; */
      className="mx-auto mt-20 max-w-[800px] font-sans"
    >
      {/* CARD INPUT */}
      <div
        /* Mirrors the .StripeElement wrapper rules */
        className="my-2 mb-5 max-w-[500px] rounded shadow
                   shadow-[rgba(50,50,93,0.15)_0px_1px_3px,rgba(0,0,0,0.02)_0px_1px_0px]
                   bg-white p-3"
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
        />

        <div className="p-8 pb-2">
          <button
            type="submit"
            disabled={!stripe}
            className="inline-block btn btn-sm pb-10 w-full leading-10 px-4 rounded
                   bg-[#CAEB68] text-white uppercase tracking-[0.025em]
                   text-[12px] font-semibold shadow-md
                   transition-all duration-150
                   hover:-translate-y-[1px] hover:bg-[#8deb68b3]
                   hover:shadow-[0_7px_14px_rgba(50,50,93,0.10),0_3px_6px_rgba(0,0,0,0.08)]
                   disabled:opacity-60"
          >
            Pay For Parcel Pickup
          </button>
          {
            error && <p className="text-red-600 pt-2">{error}</p>
          }
        </div>
      </div>

      {/* PAY BUTTON */}

      {/* RESULT / ERROR MESSAGES */}
      {/* <p className="mt-2 font-bold text-[#666ee8]">Result text…</p>
      <p className="mt-2 font-bold text-[#e4584c]">Error text…</p> */}
    </form>
  );
};

export default CheckoutForm;
