import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ShoppingCart, Heart, Plus, Minus, Trash2 } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { toast } from "sonner";
import { useFavoritos } from "@/hooks/useFavoritos";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco_venda: number;
  nome_categoria: string;
}

interface CarrinhoItem {
  produto: Produto;
  quantidade: number;
}

interface ControleQuantidade {
  [produtoId: number]: number;
}

export default function Menu() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [quantidades, setQuantidades] = useState<ControleQuantidade>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleFavorito, isFavorito, favoritos } = useFavoritos();

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
        
        // Inicializar quantidades
        const quantidadesIniciais: ControleQuantidade = {};
        data.forEach((produto: Produto) => {
          quantidadesIniciais[produto.id] = 1;
        });
        setQuantidades(quantidadesIniciais);
        
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        setError("Não foi possível carregar os produtos. Tente novamente.");
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

  const aumentarQuantidade = (produtoId: number) => {
    setQuantidades(prev => ({
      ...prev,
      [produtoId]: (prev[produtoId] || 1) + 1
    }));
  };

  const diminuirQuantidade = (produtoId: number) => {
    setQuantidades(prev => ({
      ...prev,
      [produtoId]: Math.max(1, (prev[produtoId] || 1) - 1)
    }));
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    const quantidade = quantidades[produto.id] || 1;
    
    setCarrinho((prev) => {
      const itemExistente = prev.find((item) => item.produto.id === produto.id);
      if (itemExistente) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      }
      return [...prev, { produto, quantidade }];
    });
    
    // Resetar quantidade para 1 após adicionar
    setQuantidades(prev => ({
      ...prev,
      [produto.id]: 1
    }));
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

  const limparCarrinho = () => {
    setCarrinho([]);
  };

  const getQuantidadeNoCarrinho = (produtoId: number) => {
    const item = carrinho.find(item => item.produto.id === produtoId);
    return item ? item.quantidade : 0;
  };

  const agruparPorCategoria = () => {
    const agrupado: { [key: string]: Produto[] } = {};
    produtos.forEach((produto) => {
      const categoria = produto.nome_categoria || 'Sem Categoria';
      if (!agrupado[categoria]) {
        agrupado[categoria] = [];
      }
      agrupado[categoria].push(produto);
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
                {favoritos.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritos.length}
                  </span>
                )}
              </div>
            </Link>
            <Link href="/pagamento">
              <div className="relative cursor-pointer">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
                {carrinho.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {carrinho.reduce((total, item) => total + item.quantidade, 0)}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Com margem inferior para o carrinho */}
      <main className="container mx-auto px-4 py-8 mb-24">
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
                <h3 className="text-2x1 font-bold text-gray-900 mb-4 capitalize">
                  {categoria}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                  {prods.map((produto) => {
                    const quantidadeNoCarrinho = getQuantidadeNoCarrinho(produto.id);
                    const quantidadeSelecionada = quantidades[produto.id] || 1;
                    
                    return (                   
                      <div
                        key={produto.id}
                        className="bg-white rounded shadow-md hover:shadow-lg transition-shadow overflow-hidden w-[280px] h-[300px] md:h-[340px] lg:h-[260px] flex flex-col mx-auto"
                      >
                      <div className="p-4 flex flex-col h-full">
                      <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
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
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {produto.descricao}
                </p>
             </div>

              {/* Preço e Controles - Layout Compacto */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-orange-600">
                    R$ {(produto.preco_venda || 0).toFixed(2)}
                  </span>
        
                  {/* Controle de Quantidade */}
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-1">
                    <button
                      onClick={() => diminuirQuantidade(produto.id)}
                      className="text-gray-600 hover:text-orange-600 transition-colors disabled:opacity-30"
                      disabled={quantidadeSelecionada <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-bold text-gray-900 min-w-6 text-center text-base">
                      {quantidadeSelecionada}
                    </span>
                    <button
                      onClick={() => aumentarQuantidade(produto.id)}
                      className="text-gray-600 hover:text-orange-600 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Botão Adicionar */}
                <Button
                 onClick={() => adicionarAoCarrinho(produto)}
                 className="w-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center gap-2 py-2 text-base font-semibold"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar R$ {(produto.preco_venda * quantidadeSelecionada).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>   
                   );
                    })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Carrinho Flutuante - Agora não tampa os produtos */}
      {carrinho.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-20">
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
                    R$ {carrinho.reduce((total, item) => 
                      total + (item.produto.preco_venda * item.quantidade), 0
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={limparCarrinho}
                  variant="outline"
                  className="flex items-center gap-2 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                  Limpar Carrinho
                </Button>
                <Link href="/pagamento">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Finalizar Pedido
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}