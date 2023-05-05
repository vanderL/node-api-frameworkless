import http from 'node:http';

const users = [];

const server = http.createServer((request, response) => {
  const { method, url, } = request;

  if (method === "GET" && url === "/users") {
    return response.setHeader("Content-type", "aplication/json").end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: "bd6b96b2-a75a-5400-afd3-de91df3d1285",
      name: "Vander",
      email: "test"
    })

    return response.end('Usuario estatico criado');
  }

  return response.end("404")

});

server.listen(3001, () => {
  console.log('server running 🚀');
})