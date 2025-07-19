"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Check } from "lucide-react"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
  onBuy: (product: Product) => void
}

export function ProductCard({ product, onBuy }: ProductCardProps) {
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
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {product.price}
            </div>
            {product.available && (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
                <Check className="w-3 h-3 mr-1" />
                Disponible
              </Badge>
            )}
          </div>

          <Button
            onClick={() => onBuy(product)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform group-hover:scale-105"
            disabled={!product.available}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Comprar por WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
