"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Truck, MapPin, Building } from "lucide-react"
import type { ShippingAddress } from "@/types/checkout"

interface ShippingFormProps {
  address: ShippingAddress
  onAddressChange: (address: ShippingAddress) => void
  shippingMethod: "pickup" | "viacargo"
  onShippingMethodChange: (method: "pickup" | "viacargo") => void
  addressErrors: Partial<ShippingAddress>
}

export function ShippingForm({
  address,
  onAddressChange,
  shippingMethod,
  onShippingMethodChange,
  addressErrors,
}: ShippingFormProps) {
  const shippingOptions = [
    {
      id: "pickup" as const,
      title: "Retiro en Local",
      description: "Retirá tu pedido en nuestro local en Rosario Centro",
      icon: Building,
      price: "Gratis",
    },
    {
      id: "viacargo" as const,
      title: "Sucursal de ViaCargo",
      description: "Retira en la sucursal de correo más cercana",
      icon: MapPin,
      price: "$16,000",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Shipping Method Selection */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Truck className="w-4 h-4 text-green-600" />
            </div>
            Método de Envío
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={shippingMethod} onValueChange={onShippingMethodChange}>
            <div className="space-y-3">
              {shippingOptions.map((option) => (
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
                      <Label htmlFor={option.id} className="font-semibold cursor-pointer">
                        {option.title}
                      </Label>
                      <p className="text-sm text-slate-600">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${option.price === "Gratis" ? "text-green-600" : "text-slate-900"}`}>
                        {option.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
