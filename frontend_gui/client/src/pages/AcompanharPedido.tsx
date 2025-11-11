import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link, useParams } from "wouter";

interface ItemPedido {
  id: number;
  produtoId: number;
  quantidade: number;
  preco: number;
  produtoNome?: string;
}

interface Pedido {
  id: number;
  clienteId: number;
  status: string;
  total: number;
  dataCriacao: string;
  itens: ItemPedido[];
}

const statusConfig: { [key: string]: { label: string; color: string; icon: React.ReactNode } } = {
  PENDENTE: {
    label: "Pendente",
    color: "bg-yellow-100 text-yellow-800",
    icon: <Clock className="h-6 w-6" />,
  },
  PREPARANDO: {
    label: "Preparando",
    color: "bg-blue-100 text-blue-800",
    icon: <Clock className="h-6 w-6" />,
  },
  PRONTO: {
    label: "Pronto",
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle className="h-6 w-6" />,
  },
  ENTREGUE: {
    label: "Entregue",
    color: "bg-green-100 text-green-800",
    icon: <CheckCircle className="h-6 w-6" />,
  },
  CANCELADO: {
    label: "Cancelado",
    color: "bg-red-100 text-red-800",
    icon: <AlertCircle className="h-6 w-6" />,
  },
};

export default function AcompanharPedido() {
  const { pedidoId } = useParams();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar dados do pedido
  useEffect(() => {
    const fetchPedido = async () => {
      if (!pedidoId) {
        setError("ID do pedido não fornecido");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:8080";
        const response = await fetch(
          `${apiUrl}/v1/order/${pedidoId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Pedido não encontrado");
        }

        const data = await response.json();
        setPedido(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar pedido:", err);
        setError("Não foi possível carregar os dados do pedido.");
        toast.error("Erro ao carregar pedido");
      } finally {
        setLoading(false);
      }
    };

    fetchPedido();

    // Atualizar a cada 5 segundos
    const interval = setInterval(fetchPedido, 5000);
    return () => clearInterval(interval);
  }, [pedidoId]);

  const getStatusSteps = () => {
    const steps = ["PENDENTE", "PREPARANDO", "PRONTO", "ENTREGUE"];
    const currentIndex = pedido ? steps.indexOf(pedido.status) : -1;
    return steps.map((step, index) => ({
      step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Acompanhar Pedido</h2>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {!loading && !error && pedido && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Status Timeline */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                {/* Pedido Info */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Pedido #{pedido.id}
                    </h3>
                    <div
                      className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${
                        statusConfig[pedido.status]?.color || "bg-gray-100"
                      }`}
                    >
                      {statusConfig[pedido.status]?.icon}
                      {statusConfig[pedido.status]?.label || pedido.status}
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Criado em:{" "}
                    {new Date(pedido.dataCriacao).toLocaleDateString("pt-BR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Status Timeline */}
                <div className="mb-8">
                  <h4 className="font-semibold text-gray-900 mb-6">
                    Progresso do Pedido
                  </h4>
                  <div className="space-y-4">
                    {getStatusSteps().map((item, index) => (
                      <div key={item.step} className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                              item.completed
                                ? "bg-green-500 text-white"
                                : item.active
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-300 text-gray-600"
                            }`}
                          >
                            {item.completed ? "✓" : index + 1}
                          </div>
                          {index < 3 && (
                            <div
                              className={`w-1 h-12 ${
                                item.completed ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-semibold ${
                              item.active
                                ? "text-orange-600"
                                : item.completed
                                  ? "text-green-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {statusConfig[item.step]?.label || item.step}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.step === "PENDENTE" &&
                              "Seu pedido foi recebido e está na fila"}
                            {item.step === "PREPARANDO" &&
                              "Estamos preparando seu pedido"}
                            {item.step === "PRONTO" &&
                              "Seu pedido está pronto para retirada"}
                            {item.step === "ENTREGUE" &&
                              "Seu pedido foi entregue"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Itens do Pedido */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Itens do Pedido
                  </h4>
                  <div className="space-y-3">
                    {pedido.itens && pedido.itens.length > 0 ? (
                      pedido.itens.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.produtoNome || `Produto #${item.produtoId}`}
                            </p>
                            <p className="text-sm text-gray-600">
                              Quantidade: {item.quantidade}
                            </p>
                          </div>
                          <p className="font-semibold text-gray-900">
                            R$ {(item.preco * item.quantidade).toFixed(2)}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600">Nenhum item no pedido</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Resumo */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Resumo do Pedido
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      R$ {pedido.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxa de entrega</span>
                    <span className="font-semibold text-gray-900">R$ 0,00</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-orange-600">
                    R$ {pedido.total.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <Link href="/menu">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Fazer Novo Pedido
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full">
                      Voltar ao Início
                    </Button>
                  </Link>
                </div>

                {pedido.status === "PRONTO" && (
                  <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800 font-semibold">
                      ✓ Seu pedido está pronto!
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      Venha retirar seu pedido no balcão.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
