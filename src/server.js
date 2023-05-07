import http from 'node:http';

const users = [];

const server = http.createServer(async (request, response) => {
  const { method, url, } = request;

  const buffers = []

  for await (const chuck of request) {
    buffers.push(chuck)
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    request.body = null
  }

  if (method === "GET" && url === "/users") {
    return response.setHeader("Content-type", "aplication/json").end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body

    users.push({
      id: "bd6b96b2-a75a-5400-afd3-de91df3d1285",
      name,
      email
    })

    return response.writeHead(201).end();
  }

  return response.writeHead(404).end()

});

server.listen(3001, () => {
  console.log('server running 🚀');
})