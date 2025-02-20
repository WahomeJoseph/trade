import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/OrdersApi.js";
import { Message } from '../../components/Message.jsx'
import { Loader } from "../../components/Loader";
import { AdminMenu } from "./AdminMenu";

export const Orders = () => {
    const { data: orders, isLoading, error } = useGetOrdersQuery();

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <AdminMenu />

                    <table className="min-w-full border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-2">ITEMS</th>
                                <th className="text-left p-2">ID</th>
                                <th className="text-left p-2">USER</th>
                                <th className="text-left p-2">DATE</th>
                                <th className="text-left p-2">TOTAL</th>
                                <th className="text-left p-2">PAID</th>
                                <th className="text-left p-2">DELIVERED</th>
                                <th className="text-left p-2"></th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="p-2">
                                        <img
                                            src={order.orderItems[0].image}
                                            alt={order._id}
                                            className="w-[5rem] h-auto mx-auto"
                                        />
                                    </td>
                                    <td className="p-2">{order._id}</td>

                                    <td className="p-2">{order.user ? order.user.username : "N/A"}</td>

                                    <td className="p-2">
                                        {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                                    </td>

                                    <td className="p-2">$ {order.totalPrice}</td>

                                    <td className="p-2">
                                        {order.isPaid ? (
                                            <p className="p-1 text-center bg-green-400 rounded-full">
                                                Completed
                                            </p>
                                        ) : (
                                            <p className="p-1 text-center bg-red-400 rounded-full">
                                                Pending
                                            </p>
                                        )}
                                    </td>

                                    <td className="p-2">
                                        {order.isDelivered ? (
                                            <p className="p-1 text-center bg-green-400 rounded-full">
                                                Completed
                                            </p>
                                        ) : (
                                            <p className="p-1 text-center bg-red-400 rounded-full">
                                                Pending
                                            </p>
                                        )}
                                    </td>

                                    <td className="p-2">
                                        <Link to={`/order/${order._id}`}>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded-md">More</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};
