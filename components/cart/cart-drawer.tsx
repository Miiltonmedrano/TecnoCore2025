"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus, Minus, Trash2, X, TrendingUp } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useCryptoPrice } from "@/hooks/useCryptoPrice"
import { useState } from "react"
import Link from "next/link"

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCart()
  const { highestPrice, loading } = useCryptoPrice()
  const [currency, setCurrency] = useState<"ARS" | "USDT">("USDT")

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const formatPrice = (price: number) => {
    if (currency === "USDT") {
      return `$${price.toLocaleString("es-AR")} USDT`
    } else {
      const arsPrice = Math.round(price * highestPrice)
      return `$${arsPrice.toLocaleString("es-AR")} ARS`
    }
  }

  const getTotalInCurrency = () => {
    const totalUSDT = getTotalPrice()
    if (currency === "USDT") {
      return totalUSDT
    } else {
      return Math.round(totalUSDT * highestPrice)
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Carrito de Compras
            </SheetTitle>
            <Button variant="ghost" size="sm" onClick={closeCart}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {items.length > 0 && (
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="w-fit">
                {getTotalItems()} {getTotalItems() === 1 ? "producto" : "productos"}
              </Badge>

              {/* Currency Selector */}
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-slate-600" />
                <Select value={currency} onValueChange={(value: "ARS" | "USDT") => setCurrency(value)}>
                  <SelectTrigger className="w-24 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="ARS">ARS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-slate-600 mb-6">Agregá productos para comenzar tu compra</p>
              <Button onClick={closeCart} className="bg-blue-600 hover:bg-blue-700">
                Seguir Comprando
              </Button>
            </div>
          ) : (
            <>
              {/* Exchange Rate Info */}
              {currency === "ARS" && !loading && (
                <div className="py-3 px-4 bg-blue-50 rounded-lg mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-800">Cotización:</span>
                    <span className="font-semibold text-blue-900">
                      1 USDT = ${highestPrice.toLocaleString("es-AR")} ARS
                    </span>
                  </div>
                </div>
              )}

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="w-8 h-8 text-slate-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                      {item.description && <p className="text-xs text-slate-600 truncate">{item.description}</p>}
                      <div className="text-sm font-semibold text-blue-600 mt-1">
                        {formatPrice(item.price)}
                        {currency === "ARS" && (
                          <div className="text-xs text-slate-500">${item.price.toLocaleString("es-AR")} USDT</div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>

                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-6 w-6 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Cart Summary */}
              <div className="py-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-blue-600">
                      ${getTotalInCurrency().toLocaleString("es-AR")} {currency}
                    </span>
                    {currency === "ARS" && (
                      <div className="text-sm text-slate-500">${getTotalPrice().toLocaleString("es-AR")} USDT</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Link href="/checkout" onClick={closeCart}>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                      Finalizar Compra
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={closeCart} className="w-full bg-transparent">
                    Seguir Comprando
                  </Button>
                </div>

                <p className="text-xs text-slate-500 text-center">
                  {currency === "USDT"
                    ? "Los precios están en USDT. Podés cambiar a pesos en el checkout."
                    : `Precios convertidos al cambio actual. Cotización: $${highestPrice.toLocaleString("es-AR")} ARS por USDT.`}
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
