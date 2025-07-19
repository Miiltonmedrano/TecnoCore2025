"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Search, Shield, Clock, RefreshCw, Crown } from "lucide-react"
import { CategorySection } from "./category-section"
import { priceData } from "@/data/products"
import { useCryptoPrice } from "@/hooks/useCryptoPrice"
import type { Product } from "@/types/product"

export function PriceListSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const { price, highestPrice, exchange, change24h, lastUpdated, loading, error, refresh } = useCryptoPrice()

  const handleBuyProduct = (product: Product) => {
    const phoneNumber = "5493413887729"
    const message = `¡Hola! Me interesa comprar:\n\n📱 *${product.name}*\n💰 Precio: ${product.price}\n${
      product.description ? `📋 Especificaciones: ${product.description}\n` : ""
    }\n¿Está disponible? ¡Gracias!`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const filteredCategories = priceData.categories
    .map((category) => ({
      ...category,
      products: category.products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())),
      ),
    }))
    .filter((category) => category.products.length > 0)

  return (
    <section id="precios" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-200">💰 Lista de Precios Actualizada</Badge>
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Lista de{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Precios</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Precios actualizados diariamente. Todo lo publicado lo tenemos en stock.
          </p>
        </div>

        {/* USDT Rate Card */}
        <Card className="mb-12 border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/20 rounded-full p-3">
                    {loading ? (
                      <RefreshCw className="w-8 h-8 animate-spin" />
                    ) : (
                      <Crown className="w-8 h-8 text-yellow-300" />
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Cotización USDT</h3>
                {error ? (
                  <div className="space-y-2">
                    <p className="text-red-200 text-sm">{error}</p>
                    <Button
                      onClick={refresh}
                      variant="outline"
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reintentar
                    </Button>
                  </div>
                ) : (
                  <div>
                    <p className="text-4xl font-bold text-yellow-300">${highestPrice.toLocaleString("es-AR")}</p>
                    <p className="text-sm text-yellow-200 mt-1">Precio en {exchange}</p>
                    {change24h !== 0 && (
                      <p className={`text-sm mt-1 ${change24h >= 0 ? "text-green-200" : "text-red-200"}`}>
                        {change24h >= 0 ? "+" : ""}
                        {change24h.toFixed(2)}% (24h)
                      </p>
                    )}
                    <p className="text-xs text-blue-200 mt-2">Promedio: ${price.toLocaleString("es-AR")}</p>
                  </div>
                )}
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <Shield className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Stock Garantizado</h3>
                <p className="text-blue-100">Todo lo publicado disponible</p>
                <p className="text-xs text-blue-200 mt-2">Productos bajo pedido</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <Clock className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Última Actualización</h3>
                <p className="text-blue-100 text-sm">{lastUpdated}</p>
                <Button
                  onClick={refresh}
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-blue-100 hover:bg-white/10"
                  disabled={loading}
                >
                  <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
                  Actualizar
                </Button>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center mb-2">
                  <Crown className="w-5 h-5 text-yellow-300 mr-2" />
                  <span className="font-semibold"></span>
                </div>
                <p className="text-blue-100 text-sm">
                  Monitoreamos múltiples exchanges
                </p>
              </div>
              <Button
                onClick={() =>
                  handleBuyProduct({
                    id: "consultation",
                    name: "Consulta General",
                    price: "Gratis",
                    available: true,
                  })
                }
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Consultar Equivalencia en Pesos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Categories */}
        <div className="space-y-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <CategorySection key={category.id} category={category} onBuyProduct={handleBuyProduct} />
            ))
          ) : (
            <Card className="border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No se encontraron productos</h3>
                <p className="text-slate-500">Intenta con otros términos de búsqueda</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Contact CTA */}
        <Card className="mt-16 border-0 shadow-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">¿No encontraste lo que buscas?</h3>
            <p className="text-green-100 mb-6 text-lg">
              Contáctanos por WhatsApp y te ayudamos a encontrar el producto perfecto para ti
            </p>
            <Button
              onClick={() =>
                handleBuyProduct({
                  id: "general-inquiry",
                  name: "Consulta General",
                  price: "Gratis",
                  available: true,
                })
              }
              className="bg-white text-green-600 hover:bg-green-50 font-semibold text-lg px-8 py-3"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactar por WhatsApp
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() =>
            handleBuyProduct({
              id: "floating-contact",
              name: "Consulta Rápida",
              price: "Gratis",
              available: true,
            })
          }
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </section>
  )
}
