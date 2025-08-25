export interface PersonalData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dni: string
}

export interface ShippingAddress {
  street: string
  number: string
  floor?: string
  apartment?: string
  city: string
  province: string
  postalCode: string
  additionalInfo?: string
}

export interface CartItem {
  id: string
  name: string
  description?: string
  price: number
  quantity: number
  image?: string
}

export interface CheckoutData {
  personalData: PersonalData
  shippingAddress: ShippingAddress
  shippingMethod: "pickup" | "viacargo"
  paymentMethod: "transfer" | "mercadopago" | "usdt"
  currency: "ARS" | "USDT"
  exchangeRate: number
  items: CartItem[]
  subtotal: number
  shippingCost: number
  total: number
}

export interface OrderSummary {
  orderId: string
  checkoutData: CheckoutData
  createdAt: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered"
}
