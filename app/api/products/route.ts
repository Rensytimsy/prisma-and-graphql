import { NextResponse, NextRequest } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
// import { Ewert } from "next/font/google"
import { Product } from "@/mongodbModels/product";
import { PrismaClient } from '@prisma/client';
import {ObjectId, Types} from "mongoose";
import {z} from "zod"
import { productSchema } from "@/zodSchemas/productsSchema";

type productObject = z.infer<typeof productSchema>; 

const prisma = new PrismaClient();

export const GET = async(request: NextRequest) => {
    try{
        await dbConnection();
        const products = await prisma.product.findMany(); 
        return new NextResponse(JSON.stringify({product: products, success: true}), {status: 200})
    }catch(error){
        return new NextResponse(JSON.stringify({Error: error}), {status: 500});
    }
}


export const POST = async (request: NextRequest) => {
    try {
        // Parse the request body
        const { name, image, description, price } = await request.json();

        // Create a new product in the database
        const newProduct = await prisma.product.create({
            data: {
                name,
                image,
                description,
                price,
            },
        });

        // Return the created product as a response
        return new NextResponse(
            JSON.stringify({ product: newProduct, success: true }),
            { status: 200 }
        );
    } catch (error: any) {
        // Log the error for debugging
        console.error('Error creating product:', error);

        // Return a meaningful error response
        return new NextResponse(
            JSON.stringify({ 
                Error: {
                    message: error.message, // Include the error message
                    code: error.code,      // Include the error code (if available)
                    details: error.meta,   // Include additional error details (if available)
                },
            }),
            { status: 500 }
        );
    }
};

export const PATCH = async(request: NextRequest) => {
    try{
        const {searchParams} = new URL(request.url);
        const id = searchParams.get("id");
        const {price}:productObject =  await request.json();

        if(!(id && Types.ObjectId.isValid(id))){
            return new NextResponse(JSON.stringify({message: "Invalid product id"}), {status: 402});
        }

        const updatedProduct = await prisma.product.update({
            where: {id},
            data: {
                price
            }
        });

        return new NextResponse(JSON.stringify({updated: updatedProduct, success: true}), {status: 200});

    }catch(error: any){
        return new NextResponse(JSON.stringify({Error: {message: error.message}}), {status: 500});
    }
}

export const DELETE = async(request: NextRequest) => {
    try{
        const {searchParams} = new URL(request.url);

        const id = searchParams.get("id");
        
        await prisma.product.delete({
            where: {id}
        });

        return new NextResponse(JSON.stringify({message: "Product successfully deleted"}), {status: 200});
    }catch(error: any){
        return new NextResponse(JSON.stringify({Error: {message: error.message, code: error.code, details: error.meta}}), {status: 500});
    }
}