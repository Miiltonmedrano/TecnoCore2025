"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Calendar,
  User,
  CreditCard,
  Truck,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
} from "lucide-react"
import type { OrderSummary } from "@/types/checkout"

interface OrderDetailsModalProps {
  order: OrderSummary | null
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null

  const getStatusConfig = (status: OrderSummary["status"]) => {
    switch (status) {
      case "pending":
        return {
          label: "Pendiente",
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: Clock,
          description: "Tu pedido está siendo revisado",
        }
      case "confirmed":
        return {
          label: "Confirmado",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: CheckCircle,
          description: "Pedido confirmado, procesando pago",
        }
      case "processing":
        return {
          label: "Procesando",
          color: "bg-purple-100 text-purple-700 border-purple-200",
          icon: Package,
          description: "Preparando tu pedido para envío",
        }
      case "shipped":
        return {
          label: "Enviado",
          color: "bg-orange-100 text-orange-700 border-orange-200",
          icon: Truck,
          description: "Tu pedido está en camino",
        }
      case "delivered":
        return {
          label: "Entregado",
          color: "bg-green-100 text-green-700 border-green-200",
          icon: CheckCircle,
          description: "Pedido entregado exitosamente",
        }
      default:
        return {
          label: "Desconocido",
          color: "bg-gray-100 text-gray-700 border-gray-200",
          icon: AlertCircle,
          description: "Estado desconocido",
        }
    }
  }

  const statusConfig = getStatusConfig(order.status)
  const StatusIcon = statusConfig.icon

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getShippingMethodName = (method: string) => {
    switch (method) {
      case "pickup":
        return "Retiro en Local"
      case "viacargo":
        return "Sucursal de ViaCargo"
      default:
        return method
    }
  }

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "transfer":
        return "Transferencia Bancaria"
      case "mercadopago":
        return "Mercado Pago"
      case "usdt":
        return "USDT (Criptomoneda)"
      default:
        return method
    }
  }

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId)
  }

  const handleWhatsAppContact = () => {
    const message = `¡Hola! Quiero consultar sobre mi pedido #${order.orderId}.

📦 *Estado actual:* ${statusConfig.label}
📅 *Fecha:* ${formatDate(order.createdAt)}
💰 *Total:* $${order.checkoutData.total.toLocaleString("es-AR")}

*Productos:*
${order.checkoutData.items.map((item) => `• ${item.name} (${item.quantity}x) - $${(item.price * item.quantity).toLocaleString("es-AR")}`).join("\n")}

¿Podrían darme una actualización? ¡Gracias!`

    const whatsappUrl = `https://chat.whatsapp.com/LV1Ne3sBX7YEkRBGVtTf9y?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Pedido #{order.orderId}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={copyOrderId}>
              <Copy className="w-4 h-4 mr-2" />
              Copiar ID
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <Badge className={`${statusConfig.color} flex items-center gap-2 px-4 py-2`}>
              <StatusIcon className="w-4 h-4" />
              {statusConfig.label}
            </Badge>
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar className="w-4 h-4" />
              {formatDate(order.createdAt)}
            </div>
          </div>

          <p className="text-slate-600">{statusConfig.description}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Items */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Productos ({order.checkoutData.items.length})
            </h3>
            <div className="space-y-3">
              {order.checkoutData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    {item.description && <p className="text-sm text-slate-600">{item.description}</p>}
                    <p className="text-sm text-slate-500">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toLocaleString("es-AR")}</p>
                    <p className="text-sm text-slate-600">${item.price.toLocaleString("es-AR")} c/u</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Información del Cliente
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
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
          </div>

          <Separator />

          {/* Shipping Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Información de Envío
            </h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Método:</span> {getShippingMethodName(order.checkoutData.shippingMethod)}
              </p>
            </div>
          </div>

          <Separator />

          {/* Payment Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Información de Pago
            </h3>
            <p>
              <span className="font-medium">Método:</span> {getPaymentMethodName(order.checkoutData.paymentMethod)}
            </p>
          </div>

          <Separator />

          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resumen del Pedido</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.checkoutData.subtotal.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span className={order.checkoutData.shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                  {order.checkoutData.shippingCost === 0
                    ? "Gratis"
                    : `$${order.checkoutData.shippingCost.toLocaleString("es-AR")}`}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-blue-600">${order.checkoutData.total.toLocaleString("es-AR")}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button onClick={handleWhatsAppContact} className="flex-1 bg-green-600 hover:bg-green-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Consultar por WhatsApp
            </Button>
            <Button onClick={onClose} variant="outline" className="bg-transparent">
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
