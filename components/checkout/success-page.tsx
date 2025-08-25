"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, MessageCircle, Copy, Clock, Package } from "lucide-react"
import type { OrderSummary } from "@/types/checkout"
import { useOrders } from "@/contexts/orders-context"
import { useEffect } from "react"

interface SuccessPageProps {
  order: OrderSummary
}

export function SuccessPage({ order }: SuccessPageProps) {
  const { addOrder } = useOrders()

  useEffect(() => {
    // Save order to history when success page loads
    addOrder(order)
  }, [order, addOrder])

  const handleWhatsAppContact = () => {
    const message = `¡Hola! Mi pedido #${order.orderId} fue confirmado exitosamente.

📦 *Detalles del Pedido:*
${order.checkoutData.items.map((item) => `• ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toLocaleString("es-AR")}`).join("\n")}

💰 *Total:* $${order.checkoutData.total.toLocaleString("es-AR")}
🚚 *Envío:* ${order.checkoutData.shippingMethod === "pickup" ? "Retiro en Local" : "Sucursal de ViaCargo"}
💳 *Pago:* ${order.checkoutData.paymentMethod === "transfer" ? "Transferencia" : order.checkoutData.paymentMethod === "mercadopago" ? "Mercado Pago" : "USDT"}

¿Podrían confirmarme los próximos pasos? ¡Gracias!`

    const whatsappUrl = `https://chat.whatsapp.com/LV1Ne3sBX7YEkRBGVtTf9y?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">¡Pedido Confirmado!</h1>
          <p className="text-xl text-slate-600 mb-6">
            Tu pedido ha sido recibido exitosamente y está siendo procesado.
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-semibold">Número de Pedido:</span>
            <Badge className="text-lg px-4 py-2 bg-blue-100 text-blue-700">#{order.orderId}</Badge>
            <Button variant="ghost" size="sm" onClick={copyOrderId} className="ml-2">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-blue-600" />
                Detalles del Pedido
              </h2>

              <div className="space-y-6">
                {/* Items */}
                <div>
                  <h3 className="font-semibold mb-3">Productos</h3>
                  <div className="space-y-3">
                    {order.checkoutData.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.description && <p className="text-sm text-slate-600">{item.description}</p>}
                          <p className="text-sm text-slate-500">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${(item.price * item.quantity).toLocaleString("es-AR")}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="font-semibold mb-3">Datos del Cliente</h3>
                  <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                    <p>
                      <span className="font-medium">Nombre:</span> {order.checkoutData.personalData.firstName}{" "}
                      {order.checkoutData.personalData.lastName}
                    </p>
                    <p>
                      <span className="font-medium">Email:</span> {order.checkoutData.personalData.email}
                    </p>
                    <p>
                      <span className="font-medium">Teléfono:</span> {order.checkoutData.personalData.phone}
                    </p>
                    <p>
                      <span className="font-medium">DNI:</span> {order.checkoutData.personalData.dni}
                    </p>
                  </div>
                </div>

                {/* Shipping Info */}
                <div>
                  <h3 className="font-semibold mb-3">Información de Envío</h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="font-medium mb-2">
                      {order.checkoutData.shippingMethod === "pickup" && "Retiro en Local"}
                      {order.checkoutData.shippingMethod === "viacargo" && "Sucursal de ViaCargo"}
                    </p>
                  </div>
                </div>

                {/* Payment Info */}
                <div>
                  <h3 className="font-semibold mb-3">Método de Pago</h3>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="font-medium">
                      {order.checkoutData.paymentMethod === "transfer" && "Transferencia Bancaria"}
                      {order.checkoutData.paymentMethod === "mercadopago" && "Mercado Pago"}
                      {order.checkoutData.paymentMethod === "usdt" && "USDT (Criptomoneda)"}
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className="pt-4 border-t">
                  <div className="flex justify-between text-2xl font-bold text-blue-600">
                    <span>Total Pagado:</span>
                    <span>${order.checkoutData.total.toLocaleString("es-AR")}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                  Próximos Pasos
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold">Confirmación por WhatsApp</h3>
                      <p className="text-sm text-slate-600">
                        Te contactaremos por WhatsApp para confirmar los detalles y coordinar el pago/envío.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold">Procesamiento</h3>
                      <p className="text-sm text-slate-600">
                        Una vez confirmado el pago, procesaremos tu pedido (3-7 días hábiles).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold">Entrega</h3>
                      <p className="text-sm text-slate-600">
                        Te notificaremos cuando tu pedido esté listo para retiro o envío.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">¿Necesitás Ayuda?</h2>
                <p className="mb-6 text-green-100">Contactanos por WhatsApp para cualquier consulta sobre tu pedido</p>
                <Button
                  onClick={handleWhatsAppContact}
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold text-lg px-8 py-3"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar por WhatsApp
                </Button>
                <p className="mt-4 text-sm text-green-200">Horario de atención: Lun-Vie 10-19hs | Sáb 10-14hs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
