import {object, string} from "zod";


export const productSchema = object({
    name: string(),
    price: string(),
    description: string(),
    image: string()
})