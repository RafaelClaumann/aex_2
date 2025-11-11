import { useState, useEffect } from "react";
import api from "../services/Api";
import { formatDateTime, formatCurrency } from "../utils/formatters";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("/v1/order")
      .then((response) => {
        const orders = response.data.map((order) => ({ ...order, created_at: new Date(order.created_at) }));
        const sortedOrders = orders.sort((orderA, orderB) => orderB.created_at - orderA.created_at);

        console.log(`pedidos ordenados: ${JSON.stringify(sortedOrders)}`);
        setOrders(sortedOrders);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <h1>Pedidos</h1>
      <div className="card">
        <table>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.client_id}</td>
                <td>{formatDateTime(order.created_at)}</td>
                <td>{order.status}</td>
                <td>{formatCurrency(order.valor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;
