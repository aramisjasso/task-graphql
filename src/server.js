const server = require('./app');

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Servidor listo en ${url}`);
});