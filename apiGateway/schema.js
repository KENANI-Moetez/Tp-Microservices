const typeDefs = `#graphql
  type Product {
    id: String!
    title: String!
    description: String!
  }

  type User {
    id: String!
    username: String!
    email: String!
    role: String!
  }

  type Query {
    product(id: String!): Product
    products: [Product]
    user(id: String!): User
    users: [User]
  }
`;

module.exports = typeDefs;
