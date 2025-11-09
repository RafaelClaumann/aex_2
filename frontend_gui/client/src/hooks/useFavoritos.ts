import { useState, useEffect } from "react";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
}

export const useFavoritos = () => {
  const [favoritos, setFavoritos] = useState<Produto[]>([]);
  const [carregado, setCarregado] = useState(false);

  // Carregar favoritos do localStorage ao montar o componente
  useEffect(() => {
    const favoritosSalvos = localStorage.getItem("favoritos");
    if (favoritosSalvos) {
      try {
        setFavoritos(JSON.parse(favoritosSalvos));
      } catch (err) {
        console.error("Erro ao carregar favoritos:", err);
      }
    }
    setCarregado(true);
  }, []);

  // Salvar favoritos no localStorage sempre que mudar
  useEffect(() => {
    if (carregado) {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  }, [favoritos, carregado]);

  const adicionarFavorito = (produto: Produto) => {
    if (!isFavorito(produto.id)) {
      setFavoritos((prev) => [...prev, produto]);
    }
  };

  const removerFavorito = (produtoId: number) => {
    setFavoritos((prev) => prev.filter((p) => p.id !== produtoId));
  };

  const toggleFavorito = (produto: Produto) => {
    if (isFavorito(produto.id)) {
      removerFavorito(produto.id);
    } else {
      adicionarFavorito(produto);
    }
  };

  const isFavorito = (produtoId: number): boolean => {
    return favoritos.some((p) => p.id === produtoId);
  };

  return {
    favoritos,
    adicionarFavorito,
    removerFavorito,
    toggleFavorito,
    isFavorito,
  };
};
