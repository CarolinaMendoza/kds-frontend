import axios from "axios";
import type { Order } from "../features/orders/types/order";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});


// Obtención de todos los pedidos
export async function getOrders(): Promise<Order[]> {
  const res = await api.get<Order[]>("/orders");
  return res.data;
}

// Actualización de pedido (solo con PUT)
export async function updateOrder(
  id: number,
  partial: Partial<Order>,
  current: Order
): Promise<Order> {
  const res = await api.put<Order>(`/orders/${id}`, {
    ...current,
    ...partial,
  });
  return res.data;
}
