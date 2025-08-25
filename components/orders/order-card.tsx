"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Calendar, CreditCard, Truck, Eye, MessageCircle, Clock, CheckCircle, AlertCircle } from "lucide-react"
import type { OrderSummary } from "@/types/checkout"

interface OrderCardProps {
  order: OrderSummary
  onViewDetails: (order: OrderSummary) => void
}

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const getStatusConfig = (status: OrderSummary["status"]) => {
    switch (status) {
      case "pending":
        return {
          label: "Pendiente",
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: Clock,
        }
      case "confirmed":
        return {
          label: "Confirmado",
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: CheckCircle,
        }
      case "processing":
        return {
          label: "Procesando",
          color: "bg-purple-100 text-purple-700 border-purple-200",
          icon: Package,
        }
      case "shipped":
        return {
          label: "Enviado",
          color: "bg-orange-100 text-orange-700 border-orange-200",
          icon: Truck,
        }
      case "delivered":
        return {
          label: "Entregado",
          color: "bg-green-100 text-green-700 border-green-200",
          icon: CheckCircle,
        }
      default:
        return {
          label: "Desconocido",
          color: "bg-gray-100 text-gray-700 border-gray-200",
          icon: AlertCircle,
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
        return "Transferencia"
      case "mercadopago":
        return "Mercado Pago"
      case "usdt":
        return "USDT"
      default:
        return method
    }
  }

  const handleWhatsAppContact = () => {
    const message = `¡Hola! Quiero consultar sobre mi pedido #${order.orderId}.

📦 *Estado actual:* ${statusConfig.label}
📅 *Fecha:* ${formatDate(order.createdAt)}
💰 *Total:* $${order.checkoutData.total.toLocaleString("es-AR")}

¿Podrían darme una actualización? ¡Gracias!`

    const whatsappUrl = `https://chat.whatsapp.com/LV1Ne3sBX7YEkRBGVtTf9y?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Pedido #{order.orderId}</h3>
              <p className="text-sm text-slate-600 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <Badge className={`${statusConfig.color} flex items-center gap-1`}>
            <StatusIcon className="w-3 h-3" />
            {statusConfig.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Items Summary */}
        <div>
          <h4 className="font-semibold mb-2 text-sm">Productos ({order.checkoutData.items.length})</h4>
          <div className="space-y-1">
            {order.checkoutData.items.slice(0, 2).map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="truncate flex-1 mr-2">
                  {item.name} {item.description && `- ${item.description}`}
                </span>
                <span className="text-slate-600">x{item.quantity}</span>
              </div>
            ))}
            {order.checkoutData.items.length > 2 && (
              <p className="text-xs text-slate-500">+{order.checkoutData.items.length - 2} producto(s) más</p>
            )}
          </div>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">{getShippingMethodName(order.checkoutData.shippingMethod)}</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600">{getPaymentMethodName(order.checkoutData.paymentMethod)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 border-t">
          <span className="font-semibold">Total:</span>
          <span className="text-2xl font-bold text-blue-600">${order.checkoutData.total.toLocaleString("es-AR")}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button onClick={() => onViewDetails(order)} variant="outline" className="flex-1 bg-transparent">
            <Eye className="w-4 h-4 mr-2" />
            Ver Detalles
          </Button>
          <Button onClick={handleWhatsAppContact} className="flex-1 bg-green-600 hover:bg-green-700">
            <MessageCircle className="w-4 h-4 mr-2" />
            Consultar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
