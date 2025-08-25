"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Truck, CreditCard, TrendingUp } from "lucide-react"
import { useCryptoPrice } from "@/hooks/useCryptoPrice"
import type { CartItem } from "@/types/checkout"

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  shippingCost: number
  total: number
  shippingMethod: "pickup" | "viacargo"
  paymentMethod: "transfer" | "mercadopago" | "usdt"
  currency: "ARS" | "USDT"
  exchangeRate: number
}

export function OrderSummary({
  items,
  subtotal,
  shippingCost,
  total,
  shippingMethod,
  paymentMethod,
  currency,
  exchangeRate,
}: OrderSummaryProps) {
  const { loading } = useCryptoPrice()

  const shippingMethodNames = {
    pickup: "Retiro en Local",
    viacargo: "Sucursal de ViaCargo",
  }

  const paymentMethodNames = {
    transfer: "Transferencia Bancaria",
    mercadopago: "Mercado Pago",
    usdt: "USDT (Criptomoneda)",
  }

  const formatShippingCost = () => {
    if (shippingCost === 0) return "Gratis"
    if (currency === "USDT") {
      return `$${shippingCost.toLocaleString("es-AR")} USDT`
    } else {
      return `$${Math.round(shippingCost * exchangeRate).toLocaleString("es-AR")} ARS`
    }
  }

  const getTotalInSelectedCurrency = () => {
    if (currency === "USDT") {
      return total
    } else {
      return Math.round(total * exchangeRate)
    }
  }

  return (
    <Card className="border-0 shadow-lg sticky top-4">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-indigo-600" />
          </div>
          Resumen del Pedido
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Currency Info */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium">Moneda:</span>
          </div>
          <Badge className={currency === "USDT" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}>
            {currency === "USDT" ? "USDT" : "Pesos (ARS)"}
          </Badge>
        </div>

        {/* Exchange Rate Info */}
        {currency === "ARS" && !loading && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-800">Cotización:</span>
              <span className="font-semibold text-blue-900">1 USDT = ${exchangeRate.toLocaleString("es-AR")} ARS</span>
            </div>
          </div>
        )}

        {/* Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-slate-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm">{item.name}</h4>
                {item.description && <p className="text-xs text-slate-600">{item.description}</p>}
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    Cantidad: {item.quantity}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                {currency === "ARS" ? (
                  <div>
                    <p className="font-semibold">
                      ${Math.round(item.price * item.quantity * exchangeRate).toLocaleString("es-AR")} ARS
                    </p>
                    <p className="text-xs text-slate-500">
                      ${(item.price * item.quantity).toLocaleString("es-AR")} USDT
                    </p>
                  </div>
                ) : (
                  <p className="font-semibold">${(item.price * item.quantity).toLocaleString("es-AR")} USDT</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Shipping & Payment Info */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium">Envío:</span>
            <span className="text-sm text-slate-600">{shippingMethodNames[shippingMethod]}</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium">Pago:</span>
            <span className="text-sm text-slate-600">{paymentMethodNames[paymentMethod]}</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>
              {currency === "ARS"
                ? `$${Math.round(subtotal * exchangeRate).toLocaleString("es-AR")} ARS`
                : `$${subtotal.toLocaleString("es-AR")} USDT`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Envío</span>
            <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>{formatShippingCost()}</span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-blue-600">
              ${getTotalInSelectedCurrency().toLocaleString("es-AR")} {currency}
            </span>
          </div>

          {/* Show both currencies for comparison */}
          {currency === "ARS" && (
            <div className="text-center text-xs text-slate-500 pt-2">
              Equivalente: ${total.toLocaleString("es-AR")} USDT
            </div>
          )}
        </div>

        {/* Shipping Info */}
        {shippingMethod === "pickup" && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 font-medium">🎉 Retiro Gratis</p>
            <p className="text-xs text-green-700">Retirá sin costo en nuestro local en Rosario Centro</p>
          </div>
        )}

        {currency === "USDT" && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium">💰 Precio original en USDT</p>
            <p className="text-xs text-yellow-700">Evitás fluctuaciones del tipo de cambio</p>
          </div>
        )}

        {currency === "ARS" && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">🇦🇷 Pago en Pesos Argentinos</p>
            <p className="text-xs text-blue-700">Convertido al mejor tipo de cambio del momento</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
