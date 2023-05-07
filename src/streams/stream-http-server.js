import http from 'node:http'
import { Transform, Writable } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * -1

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)))
  }
}

// req => ReadableStream
// res => WritableStream

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chuck of req) {
    buffers.push(chuck)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent);

  return res.end(fullStreamContent)

  // return req.pipe(new InverseNumberStream).pipe(res)
})

server.listen(3334, () => {
  console.log("Server running port 3334 💥");
})