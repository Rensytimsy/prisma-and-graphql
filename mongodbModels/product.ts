import { productSchema } from "@/zodSchemas/productsSchema";
import {Schema, models, model} from "mongoose";
import {z} from "zod";

//instead of each and everytime redeclearing the same object, one can use zod to his advantage
interface ProductItem extends Document {
    name: string,
    price: string,
    description: string,
    image: string,
}


const newProduct = new Schema<z.infer<typeof productSchema>>({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

export const Product = models?.products || model("products", newProduct);