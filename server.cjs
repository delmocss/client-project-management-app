const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// middlewares base
server.use(middlewares);

// 🔐 auth middleware
server.use(auth);

// 🔥 ENDPOINT /users/me (YA AUTENTICADO)
server.get("/users/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json(req.user);
});

// router protegido
server.use(router);

server.listen(4000, () => {
  console.log("JSON Server running on http://localhost:4000");
});
