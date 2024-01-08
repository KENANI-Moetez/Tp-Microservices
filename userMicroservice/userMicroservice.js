const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const userProtoPath = 'userMicroservice/user.proto';

const userProtoDefinition = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const userProto = grpc.loadPackageDefinition(userProtoDefinition).user;

const userService = {
  getUser: (call, callback) => {
    const user = {
      id: call.request.user_id,
      username: 'example_user',
      email: 'user@example.com',
      role: 'user',
    };
    callback(null, { user });
  },
  searchUsers: (call, callback) => {
    const { query } = call.request;
    const users = [
      {
        id: '1',
        username: 'example_user1',
        email: 'user1@example.com',
        role: 'user',
      },
      {
        id: '2',
        username: 'example_user2',
        email: 'user2@example.com',
        role: 'admin',
      },
    ];
    callback(null, { users });
  },
};

const server = new grpc.Server();
server.addService(userProto.UserService.service, userService);

const startServer = (port) => {
  return new Promise((resolve, reject) => {
    server.bindAsync(`localhost:${port}`, grpc.ServerCredentials.createInsecure(), (err, boundPort) => {
      if (err) {
        console.error(`Failed to bind server to 0.0.0.0:${port}`, err);
        reject(err);
        return;
      }
      console.log(`Server is running on port ${boundPort}`);
      server.start();
      resolve(boundPort);
    });
  });
};

const stopServer = () => {
  return new Promise((resolve, reject) => {
    server.tryShutdown(() => {
      console.log('Server has been successfully shut down.');
      resolve();
    });
  });
};

module.exports = { userProto, server, startServer, stopServer };
