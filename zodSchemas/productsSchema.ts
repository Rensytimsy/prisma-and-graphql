import {number, object, string} from "zod";


export const productSchema = object({
    name: string(),
    price: number(),
    description: string(),
    image: string()
})