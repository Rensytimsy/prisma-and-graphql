"use client"

import Image from "next/image";
import {gql, useQuery} from "@apollo/client"

const GET_PRODUCTS   = gql `
  query getProducts {
    products {
      id
      name
      image
      price
    }
  }
`;

export default function Home() {

  const {loading, data, error} = useQuery(GET_PRODUCTS );

  return (
    <div className="w-screen">
      <p className="text-xm text-center underline font-semibold">Products store</p>
      <div className="grid grid-cols-4 gap-x-8 space-y-4 p-6">
        {data?.products?.map((product: {id: string, name: string, image: string, price: number}) => (
          <div key={product.id} className="w-1/2 p-4 rounded-md shadow-sm">
              <img src={product.image} alt="" className="max-w-[150px]"/>
              <div>
                <p className="text-black mt-2 text-center text-xm text-gray-500">$ {product.price}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
