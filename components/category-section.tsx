"use client"

import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { ProductCard } from "./product-card"
import type { ProductCategory, Product } from "@/types/product"

interface CategorySectionProps {
  category: ProductCategory
  onBuyProduct: (product: Product) => void
}

export function CategorySection({ category, onBuyProduct }: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl overflow-hidden shadow-lg"
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between p-6 text-white hover:bg-black/10 transition-colors">
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-2xl">{category.icon}</div>
          <div className="text-left">
            <h3 className="text-2xl font-bold">{category.name}</h3>
            <p className="text-blue-100 text-sm">{category.description}</p>
          </div>
        </div>
        <ChevronDown className={`h-6 w-6 text-white transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-slate-50 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} onBuy={onBuyProduct} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
