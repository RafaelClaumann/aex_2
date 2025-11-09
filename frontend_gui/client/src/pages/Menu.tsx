import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingCart, Plus, Minus, Heart } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { toast } from "sonner";
import { useFavoritos } from "@/hooks/useFavoritos";

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

export default function Menu() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorito, isFavorito } = useFavoritos();

  // Carregar produtos do backend
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:8080";
        const response = await fetch(
          `${apiUrl}/v1/product`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao carregar produtos");
        }

        const data = await response.json();
        setProdutos(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        setError("Não foi possível carregar os produtos. Tente novamente.");
        toast.error("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  // Recuperar carrinho do localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      try {
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch (err) {
        console.error("Erro ao recuperar carrinho:", err);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.produto.id === produto.id);
      if (itemExistente) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
    toast.success(`${produto.nome} adicionado ao carrinho!`);
  };

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

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.produto.preco * item.quantidade,
    0
  );

  const agruparPorCategoria = () => {
    const agrupado: { [key: string]: Produto[] } = {};
    produtos.forEach((produto) => {
      if (!agrupado[produto.categoria]) {
        agrupado[produto.categoria] = [];
      }
      agrupado[produto.categoria].push(produto);
    });
    return agrupado;
  };

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

          {/* Carrinho e Favoritos */}
          <div className="flex items-center gap-4">
            <Link href="/favoritos">
              <div className="relative cursor-pointer hover:opacity-80">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
            </Link>
            <Link href="/pagamento">
              <div className="relative cursor-pointer">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
                {carrinho.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {carrinho.length}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Menu</h2>

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

        {!loading && !error && produtos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhum produto disponível no momento.</p>
          </div>
        )}

        {!loading && !error && produtos.length > 0 && (
          <div className="space-y-8">
            {Object.entries(agruparPorCategoria()).map(([categoria, prods]) => (
              <div key={categoria}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                  {categoria}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {prods.map((produto) => (
                    <div
                      key={produto.id}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 flex-1">
                            {produto.nome}
                          </h4>
                          <button
                            onClick={() => toggleFavorito(produto)}
                            className="flex-shrink-0 ml-2 p-2 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                isFavorito(produto.id)
                                  ? "text-red-500 fill-red-500"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">
                          {produto.descricao}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-orange-600">
                            R$ {produto.preco.toFixed(2)}
                          </span>
                        </div>
                        <Button
                          onClick={() => adicionarAoCarrinho(produto)}
                          className="w-full bg-orange-600 hover:bg-orange-700"
                        >
                          Adicionar ao Carrinho
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Carrinho Flutuante */}
      {carrinho.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">Seu Carrinho</h4>
                  <p className="text-sm text-gray-600">
                    {carrinho.reduce((total, item) => total + item.quantidade, 0)} itens
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-orange-600">
                    R$ {totalCarrinho.toFixed(2)}
                  </p>
                </div>
              </div>
              <Link href="/pagamento">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Finalizar Pedido
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
