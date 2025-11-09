import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { APP_LOGO, APP_TITLE } from "@/const";
import { ShoppingCart, User, Clock, Menu as MenuIcon } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-10 w-10 rounded" />
            <h1 className="text-2xl font-bold text-orange-600">{APP_TITLE}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bem-vindo ao {APP_TITLE}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Peça seu prato favorito e acompanhe seu pedido em tempo real
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Menu Card */}
          <Link href="/menu">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer h-full">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-orange-100 p-4 rounded-full">
                  <MenuIcon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Menu</h3>
                <p className="text-gray-600 text-center text-sm">
                  Veja nossos deliciosos pratos
                </p>
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                  Explorar Menu
                </Button>
              </div>
            </div>
          </Link>

          {/* Cadastro Card */}
          <Link href="/cadastro">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer h-full">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Cadastro</h3>
                <p className="text-gray-600 text-center text-sm">
                  Crie sua conta ou faça login
                </p>
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Cadastrar/Login
                </Button>
              </div>
            </div>
          </Link>

          {/* Pagamento Card */}
          <Link href="/pagamento">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer h-full">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-green-100 p-4 rounded-full">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Pagamento</h3>
                <p className="text-gray-600 text-center text-sm">
                  Finalize seu pedido
                </p>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                  Fazer Pedido
                </Button>
              </div>
            </div>
          </Link>

          {/* Acompanhar Pedido Card */}
          <Link href="/acompanhar/1">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer h-full">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-purple-100 p-4 rounded-full">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Acompanhar</h3>
                <p className="text-gray-600 text-center text-sm">
                  Veja o status do seu pedido
                </p>
                <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                  Acompanhar Pedido
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Por que escolher nosso food truck?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  ⚡
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Rápido</h4>
                <p className="text-gray-600">Pedidos preparados com rapidez e qualidade</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  ✨
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Fresco</h4>
                <p className="text-gray-600">Ingredientes frescos e de qualidade premium</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-600 text-white">
                  🎯
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Preciso</h4>
                <p className="text-gray-600">Acompanhe seu pedido em tempo real</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 {APP_TITLE}. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
