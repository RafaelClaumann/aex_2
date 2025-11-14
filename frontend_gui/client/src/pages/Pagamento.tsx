import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Trash2, Plus, Minus } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { toast } from "sonner";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
}

interface CarrinhoItem {
  produto: Produto;
  quantidade: number;
}

export default function Pagamento() {
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [clienteNome, setClienteNome] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [pedidoId, setPedidoId] = useState<number | null>(null);

  // Recuperar carrinho e cliente do localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch (err) {
        console.error("Erro ao recuperar carrinho:", err);
      }
    }

    const clienteIdSalvo = localStorage.getItem("clienteId");
    const clienteNomeSalvo = localStorage.getItem("clienteNome");
    setClienteId(clienteIdSalvo);
    setClienteNome(clienteNomeSalvo);
  }, []);

  const totalPedido = carrinho.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0
  );

  const removerDoCarrinho = (produtoId: number) => {
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  };

  const atualizarQuantidade = (produtoId: number, novaQuantidade: number) => {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(produtoId);
    } else {
      setCarrinho((prev) =>
        prev.map((item) =>
          item.produto.id === produtoId
            ? { ...item, quantidade: novaQuantidade }
            : item
        )
      );
    }
  };

  const handleFinalizarPedido = async () => {
    if (!clienteId) {
      toast.error("Por favor, faça login ou cadastro antes de finalizar o pedido");
      window.location.href = "/cadastro";
      return;
    }

    if (carrinho.length === 0) {
      toast.error("Seu carrinho está vazio");
      return;
    }

    try {
      setLoading(true);

      // Preparar dados do pedido
      const itens = carrinho.map((item) => ({
        produtoId: item.produto.id,
        quantidade: item.quantidade,
      }));

      const apiUrl = import.meta.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:8080";
      const response = await fetch(
        `${apiUrl}/v1/order/create_order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clienteId: parseInt(clienteId),
            itens: itens,
            total: totalPedido,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar pedido");
      }

      const pedido = await response.json();
      setPedidoId(pedido.id);
      localStorage.setItem("ultimoPedidoId", pedido.id.toString());
      localStorage.removeItem("carrinho");
      setCarrinho([]);
      toast.success("Pedido criado com sucesso!");
    } catch (err) {
      console.error("Erro ao finalizar pedido:", err);
      toast.error("Erro ao finalizar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (pedidoId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
                <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded" />
                <h1 className="text-2xl font-bold text-orange-600">{APP_TITLE}</h1>
              </div>
            </Link>
          </div>
        </header>

        {/* Success Message */}
        <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Pedido Confirmado!
              </h2>
              <p className="text-gray-600 mb-4">
                Seu pedido foi criado com sucesso.
              </p>
              <p className="text-3xl font-bold text-green-600 mb-6">
                Pedido #{pedidoId}
              </p>
            </div>

            <div className="space-y-3">
              <Link href={`/acompanhar/${pedidoId}`}>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Acompanhar Pedido
                </Button>
              </Link>
              <Link href="/menu">
                <Button variant="outline" className="w-full">
                  Voltar ao Menu
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80">
              <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded" />
              <h1 className="text-2xl font-bold text-orange-600">{APP_TITLE}</h1>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Resumo do Pedido</h2>

        {carrinho.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg mb-6">Seu carrinho está vazio</p>
            <Link href="/menu">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Voltar ao Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Carrinho */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Itens do Pedido
                </h3>
                <div className="space-y-4">
                  {carrinho.map((item) => (
                    <div
                      key={item.produto.id}
                      className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.produto.nome}
                        </h4>
                        <p className="text-sm text-gray-600">
                          R$ {item.produto.preco.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            atualizarQuantidade(
                              item.produto.id,
                              item.quantidade - 1
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() =>
                            atualizarQuantidade(
                              item.produto.id,
                              item.quantidade + 1
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removerDoCarrinho(item.produto.id)}
                        className="p-1 hover:bg-red-100 rounded text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Resumo
                </h3>

                {clienteNome && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm text-gray-600">Cliente</p>
                    <p className="font-semibold text-gray-900">{clienteNome}</p>
                  </div>
                )}

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>R$ {totalPedido.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxa de entrega</span>
                    <span>R$ 0,00</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-orange-600">
                    R$ {totalPedido.toFixed(2)}
                  </span>
                </div>

                {!clienteId && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      Você precisa estar logado para finalizar o pedido.
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleFinalizarPedido}
                  disabled={loading || carrinho.length === 0}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                >
                  {loading ? "Processando..." : "Finalizar Pedido"}
                </Button>

                <Link href="/menu">
                  <Button variant="outline" className="w-full mt-3">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
