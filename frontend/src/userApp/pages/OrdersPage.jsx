import { useEffect, useState } from "react";
import { useAuth } from "../features/auth/context/UserContext";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

const OrdersPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn || !user?.uid) return;

    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
      );

      const snap = await getDocs(q);
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };

    fetchOrders();
  }, [user?.uid, isLoggedIn]);

  if (!isLoggedIn) return <h2 className="text-center mt-20">Please login</h2>;

  if (loading) return <p className="text-center mt-20">Loading orders...</p>;

  if (!orders.length)
    return <p className="text-center mt-20">No orders found</p>;

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="border rounded-xl p-5 mb-5 bg-white">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order #{order.id}</span>
            <span className="text-sm bg-green-100 px-3 py-1 rounded">
              {order.orderStatus}
            </span>
          </div>

          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-4 mb-2">
              <img src={item.image} className="w-14 h-14 rounded" />
              <div className="flex-1">
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × ₹{item.price}
                </p>
              </div>
              <p>₹{item.price * item.quantity}</p>
            </div>
          ))}

          <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
