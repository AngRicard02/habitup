const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

const router = express.Router();

router.post("/registro", async (req, res) => {

    try {

        const { nombre, correo, password } = req.body;

        const existeUsuario = await Usuario.findOne({ correo });

        if (existeUsuario) {
            return res.status(400).json({
                mensaje: "Este correo ya está registrado"
            });
        }

        const passwordEncriptada = await bcrypt.hash(password, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            password: passwordEncriptada
        });

        await nuevoUsuario.save();

        res.json({
            mensaje: "Usuario registrado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error en el servidor"
        });

    }

});

router.post("/login", async (req, res) => {

    try {

        const { correo, password } = req.body;

        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const passwordCorrecta = await bcrypt.compare(password, usuario.password);

        if (!passwordCorrecta) {
            return res.status(400).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        res.json({
            mensaje: "Inicio de sesión correcto",
            usuarioId: usuario._id,
            nombre: usuario.nombre
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error en el servidor"
        });

    }

});

module.exports = router;