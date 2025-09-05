import { create } from "zustand";
import type { Order, Estado } from "../types/order";
import * as ordersApi from "../../../api/ordersApi";

type OrdersState = {
  orders: Order[];
  loading: boolean;
  updatingIds: number[];
  error: string | null;

  fetchOrders: () => Promise<void>;
  changeStatus: (id: number) => Promise<void>;
  clearError: () => void;
};

export const useOrdersStore = create<OrdersState>((set, get) => ({
  orders: [],
  loading: false,
  updatingIds: [],
  error: null,

  // Obtener pedidos
  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const data = await ordersApi.getOrders();
      set({ orders: data });
    } catch (err) {
      set({ error: "No se pudieron cargar los pedidos." });
      console.error("Error al obtener pedidos:", err);
    } finally {
      set({ loading: false });
    }
  },

  // Cambiar estado de un pedido
  changeStatus: async (id: number) => {
    const { orders } = get();
    const curr = orders.find((o) => o.id === id);
    if (!curr || curr.estado === "Listo") return;

    const next: Estado = curr.estado === "Pendiente" ? "En preparación" : "Listo";

    set((s) => ({
      updatingIds: [...s.updatingIds, id],
      orders: s.orders.map((o) => (o.id === id ? { ...o, estado: next } : o)),
      error: null,
    }));

    try {
      const updated = await ordersApi.updateOrder(id, { estado: next }, curr);
      set((s) => ({
        orders: s.orders.map((o) => (o.id === id ? updated : o)),
      }));
    } catch (err) {
      // Revertir si falla
      set((s) => ({
        orders: s.orders.map((o) =>
          o.id === id ? { ...o, estado: curr.estado } : o
        ),
        error: "No se pudo actualizar el estado del pedido.",
      }));
      console.error("Error al actualizar pedido:", err);
    } finally {
      set((s) => ({
        updatingIds: s.updatingIds.filter((x) => x !== id),
      }));
    }
  },

  clearError: () => set({ error: null }),
}));
