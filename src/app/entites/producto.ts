import { Categoria } from "./categoria"

export interface Producto {
    idProducto: number
    nombre: string
    precio: number
    stock: number
    estado: boolean
    imagen?: string | null
    marca: string
    modelo: string
    categoria: Categoria | null
}