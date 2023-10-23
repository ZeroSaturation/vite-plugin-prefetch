const express = require("express");
const open = require("open");
const path = require("path");
const app = express();

const dist = path.join(process.cwd(), "example/dist");
const PORT = process.env.PORT || 9999;
app.use(express.static(dist));

app.get("/api/msg", (req, res) => {
  res.send({ msg: "test" });
});

app.post("/api/task", (req, res) => {
  const { body = {} } = req;
  res.send({
    userInfo:{
      name: body.username,
      age: 18,
    },
    tasks: [
      { label: 'Installation', description: 'pnpm install vite-plugin-prefetch-api' }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  open(`http://localhost:${PORT}`);
});
