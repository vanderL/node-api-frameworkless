export async function json(request, response) {
  const buffers = []

  for await (const chuck of request) {
    buffers.push(chuck)
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch (error) {
    request.body = null
  }

  response.setHeader("Content-type", "aplication/json")
}