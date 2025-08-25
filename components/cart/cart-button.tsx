"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function CartButton() {
  const { openCart, getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <Button variant="outline" onClick={openCart} className="relative bg-transparent border-slate-300 hover:bg-slate-50">
      <ShoppingCart className="w-4 h-4 mr-2" />
      Carrito
      {totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 hover:bg-red-600 text-xs">
          {totalItems > 99 ? "99+" : totalItems}
        </Badge>
      )}
    </Button>
  )
}
