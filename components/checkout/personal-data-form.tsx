"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User } from "lucide-react"
import type { PersonalData } from "@/types/checkout"

interface PersonalDataFormProps {
  data: PersonalData
  onChange: (data: PersonalData) => void
  errors: Partial<PersonalData>
}

export function PersonalDataForm({ data, onChange, errors }: PersonalDataFormProps) {
  const handleChange = (field: keyof PersonalData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          Datos Personales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Nombre *</Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Tu nombre"
              className={errors.firstName ? "border-red-500" : ""}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <Label htmlFor="lastName">Apellido *</Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Tu apellido"
              className={errors.lastName ? "border-red-500" : ""}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="tu@email.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Teléfono *</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+54 9 11 1234-5678"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <Label htmlFor="dni">DNI *</Label>
            <Input
              id="dni"
              value={data.dni}
              onChange={(e) => handleChange("dni", e.target.value)}
              placeholder="12345678"
              className={errors.dni ? "border-red-500" : ""}
            />
            {errors.dni && <p className="text-red-500 text-sm mt-1">{errors.dni}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
