import { render, screen, fireEvent } from "@testing-library/react";
import OrderCard from "./OrderCard";
import type { Order } from "../types/order";

const mockOrder: Order = {
  id: 1,
  cliente: "Juan Pérez",
  tipo: "Delivery",
  estado: "Pendiente",
  hora: "2025-08-30T17:45:00Z",
  productos: [
    { nombre: "Pizza Pepperoni", cantidad: 2 },
    { nombre: "Coca Cola 500ml", cantidad: 1 }
  ],
};

describe("OrderCard", () => {
  test("muestra los datos del pedido", () => {
    render(<OrderCard order={mockOrder} onAdvance={() => {}} />);

    expect(screen.getByText(/Pedido #1/)).toBeInTheDocument();
    expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    expect(screen.getByText(/Pizza Pepperoni/)).toBeInTheDocument();
  });

  test("ejecuta onAdvance al hacer click", () => {
    const handleAdvance = jest.fn();
    render(<OrderCard order={mockOrder} onAdvance={handleAdvance} />);

    const button = screen.getByRole("button", { name: /Avanzar estado/i });
    fireEvent.click(button);

    expect(handleAdvance).toHaveBeenCalledTimes(1);
  });
});
