"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CreditCard, Banknote, Bitcoin, DollarSign, TrendingUp } from "lucide-react"
import { useCryptoPrice } from "@/hooks/useCryptoPrice"

interface PaymentFormProps {
  paymentMethod: "transfer" | "mercadopago" | "usdt"
  onPaymentMethodChange: (method: "transfer" | "mercadopago" | "usdt") => void
  currency: "ARS" | "USDT"
  onCurrencyChange: (currency: "ARS" | "USDT") => void
}

export function PaymentForm({ paymentMethod, onPaymentMethodChange, currency, onCurrencyChange }: PaymentFormProps) {
  const { highestPrice, exchange, loading } = useCryptoPrice()

  const paymentOptions = [
    {
      id: "transfer" as const,
      title: "Transferencia Bancaria",
      description: "Transferí desde tu banco o billetera virtual",
      icon: Banknote,
      badge: "Más usado",
      badgeColor: "bg-blue-100 text-blue-700",
      supportsCurrency: ["ARS", "USDT"] as const,
    },
    {
      id: "mercadopago" as const,
      title: "Mercado Pago",
      description: "Pagá con tarjeta, débito o saldo en Mercado Pago",
      icon: CreditCard,
      badge: "Seguro",
      badgeColor: "bg-green-100 text-green-700",
      supportsCurrency: ["ARS"] as const,
    },
    {
      id: "usdt" as const,
      title: "USDT (Criptomoneda)",
      description: "Pagá con Tether (USDT) al mejor precio",
      icon: Bitcoin,
      badge: "Mejor precio",
      badgeColor: "bg-yellow-100 text-yellow-700",
      supportsCurrency: ["USDT"] as const,
    },
  ]

  const currencyOptions = [
    {
      id: "USDT" as const,
      title: "USDT (Dólares)",
      description: "Precio original en criptomoneda",
      icon: Bitcoin,
      badge: "Precio original",
      badgeColor: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "ARS" as const,
      title: "Pesos Argentinos",
      description: `Convertido al cambio actual: $${highestPrice.toLocaleString("es-AR")}`,
      icon: DollarSign,
      badge: "Cambio actual",
      badgeColor: "bg-green-100 text-green-700",
    },
  ]

  // Filter payment methods based on selected currency
  const availablePaymentMethods = paymentOptions.filter((option) => option.supportsCurrency.includes(currency))

  // Auto-select compatible payment method when currency changes
  const handleCurrencyChange = (newCurrency: "ARS" | "USDT") => {
    onCurrencyChange(newCurrency)

    // Auto-adjust payment method based on currency
    if (newCurrency === "USDT" && paymentMethod === "mercadopago") {
      onPaymentMethodChange("usdt")
    } else if (newCurrency === "ARS" && paymentMethod === "usdt") {
      onPaymentMethodChange("transfer")
    }
  }

  return (
    <div className="space-y-6">
      {/* Currency Selection */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            Moneda de Pago
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currency} onValueChange={handleCurrencyChange}>
            <div className="space-y-3">
              {currencyOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <RadioGroupItem value={option.id} id={`currency-${option.id}`} />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <option.icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`currency-${option.id}`} className="font-semibold cursor-pointer">
                          {option.title}
                        </Label>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${option.badgeColor}`}>
                          {option.badge}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        {option.id === "ARS" && loading ? "Cargando cotización..." : option.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>

          {/* Exchange Rate Info */}
          {currency === "ARS" && !loading && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-blue-900">Cotización Actual</span>
              </div>
              <p className="text-sm text-blue-800">
                <strong>1 USDT = ${highestPrice.toLocaleString("es-AR")} ARS</strong>
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Fuente: {exchange} • Los precios se actualizan automáticamente
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Method Selection */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-orange-600" />
            </div>
            Método de Pago
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={paymentMethod} onValueChange={onPaymentMethodChange}>
            <div className="space-y-3">
              {availablePaymentMethods.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <RadioGroupItem value={option.id} id={option.id} />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <option.icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={option.id} className="font-semibold cursor-pointer">
                          {option.title}
                        </Label>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${option.badgeColor}`}>
                          {option.badge}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{option.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>

          {/* Payment Method Details */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            {paymentMethod === "transfer" && (
              <div>
                <h4 className="font-semibold mb-2">Datos para Transferencia</h4>
                <p className="text-sm text-slate-600 mb-2">
                  Una vez confirmado el pedido, te enviaremos los datos bancarios por WhatsApp.
                </p>
                {currency === "ARS" ? (
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Banco: Santander</li>
                    <li>• CBU: 0720XXXXXXXXXXXXXXXXXX</li>
                    <li>• Alias: TECNOCORE.MP</li>
                    <li>• Moneda: Pesos Argentinos (ARS)</li>
                  </ul>
                ) : (
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Red: TRC20 (Tron)</li>
                    <li>• Wallet: TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx</li>
                    <li>• Moneda: USDT</li>
                  </ul>
                )}
              </div>
            )}

            {paymentMethod === "mercadopago" && (
              <div>
                <h4 className="font-semibold mb-2">Pago con Mercado Pago</h4>
                <p className="text-sm text-slate-600">
                  Te redirigiremos a Mercado Pago para completar el pago de forma segura. Podés pagar con tarjeta de
                  crédito, débito o saldo disponible en pesos argentinos.
                </p>
              </div>
            )}

            {paymentMethod === "usdt" && (
              <div>
                <h4 className="font-semibold mb-2">Pago con USDT</h4>
                <p className="text-sm text-slate-600 mb-2">
                  Pagá con Tether (USDT) y obtené el mejor precio del mercado.
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Red: TRC20 (Tron)</li>
                  <li>• Wallet: TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx</li>
                  <li>• Confirmación: 1 bloque</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
