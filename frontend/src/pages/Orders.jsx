import { useState, useEffect } from "react";
import api from "../services/Api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api
      .get("/v1/order")
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
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
                <td>{order.created_at}</td>
                <td>{order.status}</td>
                <td>{order.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;
