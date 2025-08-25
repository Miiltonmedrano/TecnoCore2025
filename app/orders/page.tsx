"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Package, Filter, ArrowLeft, Clock, CheckCircle, Truck } from "lucide-react"
import Link from "next/link"
import { useOrders } from "@/contexts/orders-context"
import { OrderCard } from "@/components/orders/order-card"
import { OrderDetailsModal } from "@/components/orders/order-details-modal"
import type { OrderSummary } from "@/types/checkout"

export default function OrdersPage() {
  const { orders, loading } = useOrders()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<OrderSummary | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const statusOptions = [
    { value: "all", label: "Todos los estados", icon: Package },
    { value: "pending", label: "Pendiente", icon: Clock },
    { value: "confirmed", label: "Confirmado", icon: CheckCircle },
    { value: "processing", label: "Procesando", icon: Package },
    { value: "shipped", label: "Enviado", icon: Truck },
    { value: "delivered", label: "Entregado", icon: CheckCircle },
  ]

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.checkoutData.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        `${order.checkoutData.personalData.firstName} ${order.checkoutData.personalData.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [orders, searchTerm, statusFilter])

  const getStatusStats = () => {
    const stats = {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      confirmed: orders.filter((o) => o.status === "confirmed").length,
      processing: orders.filter((o) => o.status === "processing").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
    }
    return stats
  }

  const handleViewDetails = (order: OrderSummary) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  const stats = getStatusStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-12 h-12 animate-pulse mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600">Cargando pedidos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Mis Pedidos</h1>
            <p className="text-xl text-slate-600">Historial completo de tus compras en TecnoCore</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
              <div className="text-xs text-slate-600">Total</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stats.pending}</div>
              <div className="text-xs text-slate-600">Pendientes</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stats.confirmed}</div>
              <div className="text-xs text-slate-600">Confirmados</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Package className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stats.processing}</div>
              <div className="text-xs text-slate-600">Procesando</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Truck className="w-4 h-4 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stats.shipped}</div>
              <div className="text-xs text-slate-600">Enviados</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stats.delivered}</div>
              <div className="text-xs text-slate-600">Entregados</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros y Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar por número de pedido, producto o nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className="w-4 h-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {orders.length === 0 ? (
                  <Package className="w-8 h-8 text-slate-400" />
                ) : (
                  <Search className="w-8 h-8 text-slate-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {orders.length === 0 ? "No tienes pedidos aún" : "No se encontraron pedidos"}
              </h3>
              <p className="text-slate-600 mb-6">
                {orders.length === 0
                  ? "Cuando realices tu primera compra, aparecerá aquí"
                  : "Intenta con otros términos de búsqueda o filtros"}
              </p>
              {orders.length === 0 && (
                <Link href="/">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Package className="w-4 h-4 mr-2" />
                    Explorar Productos
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.orderId} order={order} onViewDetails={handleViewDetails} />
            ))}
          </div>
        )}

        {/* Results Summary */}
        {filteredOrders.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Mostrando {filteredOrders.length} de {orders.length} pedidos
            </p>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal order={selectedOrder} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
