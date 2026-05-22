const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const usuariosRoutes = require("./routes/usuarios");
const habitosRoutes = require("./routes/habitos");

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/habitos", habitosRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB conectado");
})
.catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {
    res.send("HabitUp API funcionando");
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
});