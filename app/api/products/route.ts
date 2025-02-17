import { NextResponse, NextRequest } from "next/server";
import { dbConnection } from "@/lib/dbConnection";
// import { Ewert } from "next/font/google"
import { Product } from "@/mongodbModels/product";

export const GET = async(request: NextRequest) => {
    try{
        const dataset = {
            product: "pencil",
            id: "1",
            price: "$20",
            description: "A simple wooden pencil"
        }

        return new NextResponse(JSON.stringify({product: dataset, success: true}), {status: 200})
    }catch(error){
        return new NextResponse(JSON.stringify({Error: error}), {status: 500});
    }
}

export const POST = async(request: NextRequest) => {
    try{
        await dbConnection();
        const body = await request.json();
        const newProduct = new Product(body);
        await newProduct.save();
        return new NextResponse(JSON.stringify({product: newProduct, success: true}), {status: 200});
    }catch(error: any){
        return new NextResponse(JSON.stringify({Error: error}), {status: 500});
    }
}
