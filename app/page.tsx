"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, MessageCircle, Smartphone, ShoppingCart, Truck, Shield, Award } from "lucide-react"
import Link from "next/link"
import { PriceListSection } from "@/components/price-list-section"
import { AboutUsSection } from "@/components/about-us-section"
import { CartDrawer } from "@/components/cart/cart-drawer"
import { CartButton } from "@/components/cart/cart-button"
import { useOrders } from "@/contexts/orders-context"

export default function HomePage() {
  const { orders } = useOrders()

  const scrollToPrices = () => {
    const preciosSection = document.getElementById("precios")
    if (preciosSection) {
      preciosSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleWhatsAppContact = () => {
    const phoneNumber = "5493413887729"
    const message = "¡Hola! Me interesa conocer más sobre los productos de TecnoCore. ¿Podrían ayudarme? ¡Gracias!"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TecnoCore
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#inicio" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Inicio
              </Link>
              <Link href="#precios" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Lista de precios
              </Link>
              <Link href="#nosotros" className="text-slate-700 hover:text-blue-600 font-medium transition-colors">
                Sobre Nosotros
              </Link>
              {/* Temporarily disabled - Mis Pedidos link */}
              {/* 
              <Link
                href="/orders"
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors flex items-center gap-1"
              >
                <Package className="w-4 h-4" />
                Mis Pedidos
                {orders.length > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-xs">
                    {orders.length > 99 ? "99+" : orders.length}
                  </Badge>
                )}
              </Link>
              */}
              <CartButton />
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">🚀 Los mejores precios del mercado</Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Bienvenidos a{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TecnoCore
            </span>
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Tu tienda especializada en tecnología, con los mejores precios del mercado. Encontrá dispositivos y
            accesorios de calidad garantizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={scrollToPrices}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Ver Precios
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar por WhatsApp
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Entrega Rápida</h3>
                <p className="text-slate-600 text-sm">Entrega en 3 a 7 días hábiles</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Calidad Garantizada</h3>
                <p className="text-slate-600 text-sm">Productos originales y garantía</p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">Mejores Precios</h3>
                <p className="text-slate-600 text-sm">Precios competitivos del mercado</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Work Mode Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto">
          <Card className="max-w-4xl mx-auto border-0 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900 mb-4">Modalidad de Trabajo</CardTitle>
              <CardDescription className="text-lg text-slate-600">
                Trabajamos con responsabilidad para ofrecerte la mejor experiencia de compra
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Productos bajo pedido</h4>
                    <p className="text-slate-700">
                      Todos nuestros productos son <strong>bajo pedido</strong>, con un plazo estimado de{" "}
                      <strong>3 a 7 días hábiles</strong> antes de estar disponibles para su retiro.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Compromiso de calidad</h4>
                    <p className="text-slate-700">
                      Trabajamos con responsabilidad para ofrecerte la mejor experiencia de compra, garantizando
                      productos originales y de calidad.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Us Section */}
      <AboutUsSection />

      {/* Price List Section */}
      <PriceListSection />

      {/* Contact Section */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Información de Contacto</h2>
            <p className="text-xl text-slate-300">Estamos aquí para ayudarte</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Ubicación</h3>
                <p className="text-slate-300 mb-4">
                  Zona Centro de Rosario. Coordinamos entregas y retiros por WhatsApp.
                </p>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  ¿Cómo llegar?
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Horario de Atención</h3>
                <div className="text-slate-300 space-y-2">
                  <p>
                    <strong>Lunes a Viernes:</strong> 10 a 19hs
                  </p>
                  <p>
                    <strong>Sábado:</strong> 10 a 14hs
                  </p>
                  <p className="text-sm text-slate-400 mt-4">Horarios sujetos a disponibilidad</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700 text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">WhatsApp</h3>
                <p className="text-slate-300 mb-6">Ventas: TecnoCore</p>
                <Button onClick={handleWhatsAppContact} className="bg-green-600 hover:bg-green-700 w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contactar ahora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">TecnoCore</span>
            </div>
            <div className="text-center md:text-right">
              <p className="mb-2">Copyright 2025 © TecnoCore | Todos los derechos reservados</p>
              <p className="text-sm">Desarrollado por Milton Medrano</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  )
}
