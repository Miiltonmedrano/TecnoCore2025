"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { PersonalDataForm } from "@/components/checkout/personal-data-form"
import { ShippingForm } from "@/components/checkout/shipping-form"
import { PaymentForm } from "@/components/checkout/payment-form"
import { OrderSummary } from "@/components/checkout/order-summary"
import { SuccessPage } from "@/components/checkout/success-page"
import { useCart } from "@/contexts/cart-context"
import { useCryptoPrice } from "@/hooks/useCryptoPrice"
import { useRouter } from "next/navigation"
import type { PersonalData, ShippingAddress, CheckoutData, OrderSummary as OrderSummaryType } from "@/types/checkout"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const { highestPrice } = useCryptoPrice()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState<OrderSummaryType | null>(null)

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderCompleted) {
      router.push("/")
    }
  }, [items.length, orderCompleted, router])

  // Form data states
  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dni: "",
  })

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: "",
    number: "",
    floor: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
    additionalInfo: "",
  })

  const [shippingMethod, setShippingMethod] = useState<"pickup" | "viacargo">("pickup")
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "mercadopago" | "usdt">("transfer")
  const [currency, setCurrency] = useState<"ARS" | "USDT">("USDT")

  // Error states
  const [personalDataErrors, setPersonalDataErrors] = useState<Partial<PersonalData>>({})
  const [addressErrors, setAddressErrors] = useState<Partial<ShippingAddress>>({})

  // Calculate totals from cart
  const subtotal = getTotalPrice()
  const shippingCost = shippingMethod === "viacargo" ? 16000 : 0
  const total = subtotal + shippingCost

  const steps = [
    { number: 1, title: "Datos Personales", description: "Información de contacto" },
    { number: 2, title: "Envío", description: "Método de envío" },
    { number: 3, title: "Pago", description: "Método de pago y moneda" },
    { number: 4, title: "Confirmación", description: "Revisar pedido" },
  ]

  const validatePersonalData = (): boolean => {
    const errors: Partial<PersonalData> = {}

    if (!personalData.firstName.trim()) errors.firstName = "El nombre es requerido"
    if (!personalData.lastName.trim()) errors.lastName = "El apellido es requerido"
    if (!personalData.email.trim()) errors.email = "El email es requerido"
    else if (!/\S+@\S+\.\S+/.test(personalData.email)) errors.email = "Email inválido"
    if (!personalData.phone.trim()) errors.phone = "El teléfono es requerido"
    if (!personalData.dni.trim()) errors.dni = "El DNI es requerido"

    setPersonalDataErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (currentStep === 1 && !validatePersonalData()) return

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleConfirmOrder = async () => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const checkoutData: CheckoutData = {
      personalData,
      shippingAddress,
      shippingMethod,
      paymentMethod,
      currency,
      exchangeRate: highestPrice,
      items,
      subtotal,
      shippingCost,
      total,
    }

    const order: OrderSummaryType = {
      orderId: `TC${Date.now().toString().slice(-6)}`,
      checkoutData,
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    setOrderCompleted(order)
    setIsProcessing(false)

    // Clear cart after successful order
    clearCart()
  }

  // Show loading if cart is empty and no order completed
  if (items.length === 0 && !orderCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Redirigiendo...</p>
        </div>
      </div>
    )
  }

  if (orderCompleted) {
    return <SuccessPage order={orderCompleted} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Finalizar Compra</h1>
          <p className="text-xl text-slate-600">Completá tus datos para confirmar el pedido</p>
        </div>

        {/* Progress Steps */}
        <Card className="mb-8 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        currentStep >= step.number ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="ml-3 hidden md:block">
                      <p className={`font-semibold ${currentStep >= step.number ? "text-blue-600" : "text-slate-600"}`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-slate-500">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${currentStep > step.number ? "bg-blue-600" : "bg-slate-200"}`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 && (
              <PersonalDataForm data={personalData} onChange={setPersonalData} errors={personalDataErrors} />
            )}

            {currentStep === 2 && (
              <ShippingForm
                address={shippingAddress}
                onAddressChange={setShippingAddress}
                shippingMethod={shippingMethod}
                onShippingMethodChange={setShippingMethod}
                addressErrors={addressErrors}
              />
            )}

            {currentStep === 3 && (
              <PaymentForm
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                currency={currency}
                onCurrencyChange={setCurrency}
              />
            )}

            {currentStep === 4 && (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Confirmar Pedido</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Datos Personales</h3>
                      <div className="bg-slate-50 p-4 rounded-lg text-sm">
                        <p>
                          {personalData.firstName} {personalData.lastName}
                        </p>
                        <p>{personalData.email}</p>
                        <p>{personalData.phone}</p>
                        <p>DNI: {personalData.dni}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Envío</h3>
                      <div className="bg-slate-50 p-4 rounded-lg text-sm">
                        <p className="font-medium">
                          {shippingMethod === "pickup" && "Retiro en Local"}
                          {shippingMethod === "viacargo" && "Sucursal de ViaCargo"}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Pago</h3>
                      <div className="bg-slate-50 p-4 rounded-lg text-sm">
                        <p className="font-medium">
                          {paymentMethod === "transfer" && "Transferencia Bancaria"}
                          {paymentMethod === "mercadopago" && "Mercado Pago"}
                          {paymentMethod === "usdt" && "USDT (Criptomoneda)"}
                        </p>
                        <p className="text-slate-600 mt-1">
                          Moneda:{" "}
                          <span className="font-medium">{currency === "ARS" ? "Pesos Argentinos" : "USDT"}</span>
                        </p>
                        {currency === "ARS" && (
                          <p className="text-xs text-slate-500 mt-1">
                            Cotización: 1 USDT = ${highestPrice.toLocaleString("es-AR")} ARS
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-slate-600 mb-4">
                        Al confirmar tu pedido, aceptás nuestros términos y condiciones. Te contactaremos por WhatsApp
                        para coordinar el pago y envío.
                      </p>
                      <Button
                        onClick={handleConfirmOrder}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg py-3"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Procesando Pedido...
                          </>
                        ) : (
                          "Confirmar Pedido"
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                Anterior
              </Button>

              {currentStep < 4 && (
                <Button onClick={handleNext} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                  Siguiente
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shippingCost={shippingCost}
              total={total}
              shippingMethod={shippingMethod}
              paymentMethod={paymentMethod}
              currency={currency}
              exchangeRate={highestPrice}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
