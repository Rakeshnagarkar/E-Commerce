import { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import axios from "axios";

function Orders() {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadOrderData = async () => {
    try {
      if (!token) {
        setLoading(false);
        return null;
      }

      const response = await axios.post(
        backendUrl + '/api/order/userorders',
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date
            });
          });
        });

        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  if (loading) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1="MY" text2="ORDERS" />
        </div>
        <div className="py-8 text-center">Loading your orders...</div>
      </div>
    );
  }

  if (orderData.length === 0) {
    return (
      <div className="border-t pt-16">
        <div className="text-2xl">
          <Title text1="MY" text2="ORDERS" />
        </div>
        <div className="py-8 text-center">You haven't placed any orders yet.</div>
      </div>
    );
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>

      <div className="space-y-4">
        {(showAll ? orderData : orderData.slice(0, 3)).map((item, index) => (
          <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt={item.name} />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p className="text-lg">{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                <p className="mt-1">Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className={`min-w-2 h-2 rounded-full ${
                  item.status === 'Delivered' ? 'bg-green-500' : 
                  item.status === 'Shipped' ? 'bg-blue-500' : 
                  item.status === 'Processing' ? 'bg-yellow-500' : 
                  'bg-gray-500'
                }`}></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm h-fit hover:bg-gray-100 transition">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {orderData.length > 3 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="border border-black px-6 py-2 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            {showAll ? 'Show Less' : `Show All (${orderData.length})`}
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;