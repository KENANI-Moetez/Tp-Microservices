// apiGateway.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const productProtoPath = 'product.proto';
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

// Create a new Express application
const app = express();

// Load environment variables for service addresses
const productServiceAddress = process.env.PRODUCT_SERVICE_ADDRESS || 'localhost:50055';
const userServiceAddress = process.env.USER_SERVICE_ADDRESS || 'localhost:50051';

const productProtoDefinition = protoLoader.loadSync(productProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProtoPath = 'user.proto';
const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;
const productProto = grpc.loadPackageDefinition(productProtoDefinition).product;

// Create an instance of ApolloServer with the imported schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Apply the ApolloServer middleware to the Express application
server.start().then(() => {
  app.use(cors(), bodyParser.json(), expressMiddleware(server));
});

// Define routes for products and users
app.get('/products', (req, res) => {
  // gRPC client for the product service
  const client = new productProto.ProductService(
    productServiceAddress,
    grpc.credentials.createInsecure()
  );

  // Call the gRPC method to search for products
  client.searchProducts({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.products);
    }
  });
});

app.get('/products/:id', (req, res) => {
  // gRPC client for the product service
  const client = new productProto.ProductService(
    productServiceAddress,
    grpc.credentials.createInsecure()
  );

  const id = req.params.id;
  
  // Call the gRPC method to get a specific product by ID
  client.getProduct({ product_id: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.product);
    }
  });
});

app.get('/users', (req, res) => {
  // gRPC client for the user service
  const client = new userProto.UserService(
    userServiceAddress,
    grpc.credentials.createInsecure()
  );

  // Call the gRPC method to search for users
  client.searchUsers({}, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.users);
    }
  });
});

app.get('/users/:id', (req, res) => {
  // gRPC client for the user service
  const client = new userProto.UserService(
    userServiceAddress,
    grpc.credentials.createInsecure()
  );

  const id = req.params.id;
  
  // Call the gRPC method to get a specific user by ID
  client.getUser({ id: id }, (err, response) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(response.user);
    }
  });
});

// Start the Express application
const port = 3000;
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
