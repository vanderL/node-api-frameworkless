import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database.js';

const database = new Database()

const server = http.createServer(async (request, response) => {
  const { method, url, } = request;

  await json(request, response)

  if (method === "GET" && url === "/users") {
    const users = database.select("users")

    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body

    const user = {
      id: "bd6b96b2-a75a-5400-afd3-de91df3d1285",
      name,
      email
    }

    database.insert('users', user)

    return response.writeHead(201).end();
  }

  return response.writeHead(404).end()

});

server.listen(3001, () => {
  console.log('server running 🚀');
})