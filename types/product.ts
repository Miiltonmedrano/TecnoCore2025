export interface Product {
  id: string
  name: string
  description?: string
  price: string
  specs?: string
  available: boolean
  image?: string
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  icon: string
  products: Product[]
}

export interface PriceData {
  dollarRate: number
  lastUpdated: string
  categories: ProductCategory[]
}
