import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";
import { toast } from "sonner";

interface FormData {
  nome: string;
  telefone: string;
}

export default function Cadastro() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: "",
  });
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [, navigate] = useLocation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    if (!formData.nome || !formData.telefone) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    try {
      setLoading(true);

      if (isLogin) {
        // Buscar cliente por telefone
        const apiUrl = import.meta.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:8080";
        const response = await fetch(
          `${apiUrl}/v1/client?telephone=${formData.telefone}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Cliente não encontrado");
        }

        const cliente = await response.json();
        localStorage.setItem("clienteId", cliente.id.toString());
        localStorage.setItem("clienteNome", cliente.nome);
        localStorage.setItem("clienteTelefone", cliente.telefone);
        toast.success(`Bem-vindo de volta, ${cliente.nome}!`);
        window.location.href = "/menu";
      } else {
        // Criar novo cliente
        const apiUrl = import.meta.env.VITE_FRONTEND_FORGE_API_URL || "http://localhost:8080";
        const response = await fetch(
          `${apiUrl}/v1/client`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: formData.nome,
              telefone: formData.telefone,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao criar cliente");
        }

        const cliente = await response.json();
        localStorage.setItem("clienteId", cliente.id.toString());
        localStorage.setItem("clienteNome", cliente.nome);
        localStorage.setItem("clienteTelefone", cliente.telefone);
        toast.success("Cadastro realizado com sucesso!");
        window.location.href = "/menu";
      }
    } catch (err) {
      console.error("Erro:", err);
      toast.error(
        isLogin
          ? "Erro ao fazer login. Verifique seus dados."
          : "Erro ao criar conta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
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
      <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
              {isLogin ? "Fazer Login" : "Criar Conta"}
            </h2>
            <p className="text-gray-600 text-center mb-8">
              {isLogin
                ? "Acesse sua conta para continuar"
                : "Crie uma conta para fazer pedidos"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(11) 9 9999-9999"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
              >
                {loading ? "Processando..." : isLogin ? "Entrar" : "Criar Conta"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  {isLogin ? "Cadastre-se" : "Faça login"}
                </button>
              </p>
            </div>

        {/* botão sem cadastras*/}
          {/* <div className="mt-6 pt-6 border-t border-gray-200">
              <Link href="/menu">
                <Button variant="outline" className="w-full">
                  Continuar  para fazer pedidos cadastro
                </Button>
              </Link>
            </div>
            */}
          </div>
        </div>
      </main>
    </div>
  );
}
