"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Check, TrendingUp } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useCryptoPrice } from "@/hooks/useCryptoPrice"
import { useState } from "react"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
  onBuy: (product: Product) => void
}

export function ProductCard({ product, onBuy }: ProductCardProps) {
  const { addItem, openCart } = useCart()
  const { highestPrice, loading } = useCryptoPrice()
  const [showARS, setShowARS] = useState(false)

  // Temporarily disabled - keep code for future use
  const handleAddToCart = () => {
    // Parse price from string (remove $ and USDT, convert to number)
    const priceNumber = Number.parseFloat(product.price.replace(/[$,\s]/g, "").replace("USDT", ""))

    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: priceNumber,
      image: product.image,
    })

    // Open cart drawer to show the added item
    setTimeout(() => openCart(), 100)
  }

  const getPriceInARS = () => {
    const priceNumber = Number.parseFloat(product.price.replace(/[$,\s]/g, "").replace("USDT", ""))
    return Math.round(priceNumber * highestPrice)
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">
              {product.name}
            </h4>
            {product.description && <p className="text-slate-600 text-sm mt-1">{product.description}</p>}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {showARS && !loading ? `$${getPriceInARS().toLocaleString("es-AR")} ARS` : product.price}
              </div>
              {showARS && !loading && <div className="text-sm text-slate-500 mt-1">{product.price}</div>}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowARS(!showARS)}
                className="mt-2 h-6 p-1 text-xs hover:bg-slate-100"
                disabled={loading}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                {showARS ? "Ver en USDT" : "Ver en ARS"}
              </Button>
            </div>
            {product.available && (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                <Check className="w-3 h-3 mr-1" />
                Disponible
              </Badge>
            )}
          </div>

          {showARS && !loading && (
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <TrendingUp className="w-4 h-4" />
                <span>Cotización: 1 USDT = ${highestPrice.toLocaleString("es-AR")} ARS</span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {/* Temporarily disabled - Add to Cart button */}
            {/* 
            <Button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105"
              disabled={!product.available}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar al Carrito
            </Button>
            */}

            <Button
              onClick={() => onBuy(product)}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105"
              disabled={!product.available}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Comprar por WhatsApp
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
