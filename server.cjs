const jsonServer = require("json-server");
const auth = require("json-server-auth");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// 🟢 MIDDLEWARES BASE
server.use(middlewares);
server.use(jsonServer.bodyParser);

// 🟢 BIND DEL ROUTER (CLAVE)
server.db = router.db;

// 🔐 AUTH (DESPUÉS DEL BIND)
server.use(auth);

// 🔥 ENDPOINT USER PROFILE
server.get("/users/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  res.json(req.user);
});

// 🟢 ROUTER FINAL
server.use(router);

// 🟢 START SERVER
server.listen(4000, () => {
  console.log("JSON Server running on http://localhost:4000");
});
