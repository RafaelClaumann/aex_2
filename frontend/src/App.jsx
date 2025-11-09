import { useState, useEffect } from "react";
import "./App.css";
import api from "./services/Api";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/v1/product")
      .then((response) => {
        const mappedProducts = response.data.map((product) => {
          return {
            id: product.id,
            name: product.nome,
            description: product.descricao,
            price: product.preco_venda,
            category: product.nome_categoria,
            quantity: 0,
          };
        });
        setProducts(mappedProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function incrementQuantity(id) {
    const productsList = [...products];
    const product = productsList.find((product) => product.id === id);
    product.quantity = product.quantity <= 999 ? product.quantity + 1 : 0;
    setProducts(productsList);
    console.log(`increment_quantity | name: ${product.name} | id: ${product.id} | quantity: ${product.quantity}`);
  }

  function decrementQuantity(id) {
    const productsList = [...products]
    const product = productsList.find((product) => product.id === id);
    product.quantity = product.quantity > 0 ? product.quantity - 1 : 0;
    setProducts(productsList);
    console.log(`decrement_quantity | name: ${product.name} | id: ${product.id} | quantity: ${product.quantity}`);
  }

  return (
    <>
      <h1>Produtos Disponíveis</h1>
      <div className="card">
        <table>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <div>
                    <button onClick={() => { incrementQuantity(product.id); }}>+</button>
                    <button onClick={() => { decrementQuantity(product.id); }} >-</button>
                    <output>total: {product.quantity}</output>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
