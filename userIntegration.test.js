const { startServer, stopServer, userProto } = require('./userMicroservice');
const grpc = require('@grpc/grpc-js');

let client;

beforeAll(async () => {
  await startServer(50051);
  client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());
});

afterAll(async () => {
  await stopServer();
});

describe('User gRPC Service Integration', () => {
  it('should get a user from the gRPC service', async () => {
    const userId = '1';
    const request = { user_id: userId };

    return new Promise((resolve, reject) => {
      client.getUser(request, (error, response) => {
        if (error) {
          reject(error);
        } else {
          expect(response.user.id).toBe(userId);
          resolve();
        }
      });
    });
  });

  // Add more tests for other gRPC service methods as needed
});
