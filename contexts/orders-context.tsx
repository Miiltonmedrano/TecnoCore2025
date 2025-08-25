"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { OrderSummary } from "@/types/checkout"

interface OrdersState {
  orders: OrderSummary[]
  loading: boolean
}

type OrdersAction =
  | { type: "ADD_ORDER"; payload: OrderSummary }
  | { type: "UPDATE_ORDER_STATUS"; payload: { orderId: string; status: OrderSummary["status"] } }
  | { type: "LOAD_ORDERS"; payload: OrderSummary[] }
  | { type: "SET_LOADING"; payload: boolean }

interface OrdersContextType extends OrdersState {
  addOrder: (order: OrderSummary) => void
  updateOrderStatus: (orderId: string, status: OrderSummary["status"]) => void
  getOrderById: (orderId: string) => OrderSummary | undefined
  getOrdersByStatus: (status: OrderSummary["status"]) => OrderSummary[]
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

function ordersReducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case "ADD_ORDER":
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      }

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.orderId === action.payload.orderId ? { ...order, status: action.payload.status } : order,
        ),
      }

    case "LOAD_ORDERS":
      return {
        ...state,
        orders: action.payload,
        loading: false,
      }

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(ordersReducer, {
    orders: [],
    loading: true,
  })

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("tecnocore-orders")
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders)
        dispatch({ type: "LOAD_ORDERS", payload: parsedOrders })
      } catch (error) {
        console.error("Error loading orders from localStorage:", error)
        dispatch({ type: "SET_LOADING", payload: false })
      }
    } else {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    if (!state.loading) {
      localStorage.setItem("tecnocore-orders", JSON.stringify(state.orders))
    }
  }, [state.orders, state.loading])

  const addOrder = (order: OrderSummary) => {
    dispatch({ type: "ADD_ORDER", payload: order })
  }

  const updateOrderStatus = (orderId: string, status: OrderSummary["status"]) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, status } })
  }

  const getOrderById = (orderId: string) => {
    return state.orders.find((order) => order.orderId === orderId)
  }

  const getOrdersByStatus = (status: OrderSummary["status"]) => {
    return state.orders.filter((order) => order.status === status)
  }

  const value: OrdersContextType = {
    ...state,
    addOrder,
    updateOrderStatus,
    getOrderById,
    getOrdersByStatus,
  }

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
