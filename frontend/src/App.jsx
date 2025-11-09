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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
