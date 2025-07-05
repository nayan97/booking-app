import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {
  const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
  console.log(user);
  

  const { data: payments = [], isLoading, isError, error } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email, // only run when email is available
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Payment History</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <ul className="space-y-2">
          {payments.map((payment) => (
            <li key={payment._id} className="p-3 border rounded shadow-sm">
              <p><strong>Parcel ID:</strong> {payment.parcelId}</p>
              <p><strong>Amount:</strong> ${(payment.amount).toFixed(2)}</p>
              <p><strong>Transaction:</strong> {payment.transactionId}</p>
              <p><strong>Date:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PaymentHistory;
