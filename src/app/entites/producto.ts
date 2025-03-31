import { Categoria } from "./categoria"

export interface Producto {
    idProducto: number
    nombre: string
    precio: number | null
    stock: number | null
    estado: boolean
    imagen?: string | null
    marca: string
    modelo: string
    categoria: Categoria | null
    condicion: string
}