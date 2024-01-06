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

describe('getUser', () => {
  it('should return a user with the specified ID', async () => {
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
  }, 10000); // Increase the timeout if necessary

});

