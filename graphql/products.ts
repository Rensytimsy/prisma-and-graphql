import {gql} from "graphql-tag"

export const typeDefs = gql`
    type Products {
        id: ID!
        name: String!
        image: String!
        price: Float!
        description: String!
    }

    type Query {
    products: [Products] 
    findProductByName(name: String!): Products
    }
`