import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { APP_LOGO, APP_TITLE } from "@/const";
import { useFavoritos } from "@/hooks/useFavoritos";
import { useState } from "react";
import { toast } from "sonner";

export default function Favoritos() {
  const { favoritos, removerFavorito, isFavorito } = useFavoritos();
  const [carrinho, setCarrinho] = useState<any[]>([]);

  // Recuperar carrinho do localStorage
  const carregarCarrinho = () => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      try {
        return JSON.parse(carrinhoSalvo);
      } catch (err) {
        console.error("Erro ao recuperar carrinho:", err);
        return [];
      }
    }
    return [];
  };

  const adicionarAoCarrinho = (produto: any) => {
    const carrinhoAtual = carregarCarrinho();
    const itemExistente = carrinhoAtual.find((item: any) => item.produto.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;
    } else {
      carrinhoAtual.push({ produto, quantidade: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
    toast.success(`${produto.nome} adicionado ao carrinho!`);
  };

  const removerDoFavoritos = (produtoId: number) => {
    removerFavorito(produtoId);
    toast.success("Removido dos favoritos");
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

          {/* Carrinho */}
          <Link href="/pagamento">
            <div className="relative cursor-pointer">
              <ShoppingCart className="h-6 w-6 text-orange-600" />
              {carregarCarrinho().length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {carregarCarrinho().length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/menu">
            <button className="flex items-center gap-2 text-orange-600 hover:text-orange-700">
              <ArrowLeft className="h-5 w-5" />
              Voltar ao Menu
            </button>
          </Link>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          Meus Favoritos
        </h2>

        {favoritos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-gray-600 mb-6">
              Clique no ícone de coração nos produtos para adicionar aos favoritos
            </p>
            <Link href="/menu">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Explorar Menu
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritos.map((produto) => (
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
                      onClick={() => removerDoFavoritos(produto.id)}
                      className="flex-shrink-0 ml-2 p-2 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {produto.descricao}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">
                      R$ {produto.preco.toFixed(2)}
                    </span>
                  </div>
                  <Button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="w-full bg-orange-600 hover:bg-orange-700 mt-4"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
