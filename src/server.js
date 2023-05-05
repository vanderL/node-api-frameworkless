import http from 'node:http';

const server = http.createServer((request, response) => {
  const { method, url, } = request;

  if (method === "GET" && url === "/users") {
    return response.end('GET de users');
  }

  if (method === "POST" && url === "/users") {
    return response.end('Create de users');
  }

  return response.end("404")

});

server.listen(3001, () => {
  console.log('server running 🚀');
})