import { PrismaClient } from "@prisma/client"
import {z} from "zod";
import { productSchema } from "@/zodSchemas/productsSchema";
import { dbConnection } from "@/lib/dbConnection";

const prisma = new PrismaClient();
//product interface which will be referenced from the zod schema defination
type ProductObject = z.infer<typeof productSchema>;
//connecting to the database
export const resolvers = {
    Query : {
        products: async() => {
            return  await prisma.product.findMany();
        },
        findProductByName: async (_: any, { name }: { name: string }) => {
            return await prisma.product.findUnique({
              where: {
                name, // This uses the name to find the product
              },
            });
        }
    }
}