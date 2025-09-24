// app/order-success/page.tsx

export default function OrderSuccessPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orderId = searchParams.orderId;
  const address = searchParams.address;
  const price = searchParams.price;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Order Completed Successfully!
        </h1>

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Order ID:</span> {orderId ?? "N/A"}
          </p>
          <p>
            <span className="font-semibold">Delivery Address:</span>{" "}
            {address ?? "Not provided"}
          </p>
          <p>
            <span className="font-semibold">Total Price:</span>{" "}
            {price ? `$${price}` : "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
}
