const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

router.render = (req, res) => {
  res.json({
    items: res.locals.data,
    total: 864,
    summary: {
      num: 100500,
      name: 0,
      email: 0,
    }
  })
}

server.use(middlewares)
server.use(router)
server.listen(3004, () => {
  console.log('JSON Server is running');
})