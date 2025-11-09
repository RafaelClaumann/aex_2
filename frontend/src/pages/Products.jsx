import { useState, useEffect } from "react";
import api from "../services/Api";
import Modal from "../components/Modal";

function Products() {
  const [products, setProducts] = useState([]);
  const [partialValue, setPartialValue] = useState(0.0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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

  function handleProductQuantity(id, operation) {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id !== id) return product;

        let newQuantity = product.quantity;
        if (operation === "+") {
          newQuantity = Math.min(product.quantity + 1, 999);
        } else if (operation === "-") {
          newQuantity = Math.max(product.quantity - 1, 0);
        }

        console.log(`handleProductQuantity ${operation} | id: ${product.id} | name: ${product.name} | quantity: ${newQuantity}`);

        return { ...product, quantity: newQuantity };
      })
    );
  }

  function handlePartialValue() {
    const selectedProducts = products.filter((product) => product.quantity > 0);
    const partialValue = selectedProducts.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);
    setPartialValue(partialValue);
    setSelectedProducts(selectedProducts);
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
                <td>{product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td>{product.category}</td>
                <td>
                  <div>
                    <button
                      onClick={() => {
                        handleProductQuantity(product.id, "+");
                      }}
                    >
                      +
                    </button>
                    <button
                      onClick={() => {
                        handleProductQuantity(product.id, "-");
                      }}
                    >
                      -
                    </button>
                    <output>total: {product.quantity}</output>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={() => {
            setIsOpen(true);
            handlePartialValue();
          }}
        >
          Avançar
        </button>
      </div>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Resumo do pedido">
        <div>
          <ul>
            {selectedProducts.map((product) => (
              <li key={product.id}> {product.quantity}x - {product.name} — R$ {product.price} </li>
            ))}
          </ul>

          <output>Total parcial: R$ {partialValue}</output>
        </div>
      </Modal>
    </>
  );
}

export default Products;
