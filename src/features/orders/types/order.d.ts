export interface Producto {
  nombre: string;
  cantidad: number;
}

export type Estado = "Pendiente" | "En preparación" | "Listo";

export interface Order {
  id: number;
  cliente: string;
  tipo: "Delivery" | "Mesa" | "Para llevar";
  estado: Estado;
  hora: string; 
  productos: Producto[];
}
