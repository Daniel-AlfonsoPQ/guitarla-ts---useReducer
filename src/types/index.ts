export type Guitar = {
    id: number 
    name: string
    image: string
    description: string
    price: number
}

// Utility type
// PICK : Selecciona las propiedades que queremos de un objeto
// Omit: Excluye las propiedades que queremos de un objeto
// export type CarItem = Pick<Guitar, "id" | "name" | "price"> & {
//     quantity: number
// }

export type CarItem = Guitar & {
    quantity: number
}
