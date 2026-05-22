const express = require("express");
const Habito = require("../models/Habito");

const router = express.Router();

router.post("/crear", async (req, res) => {
    try {
        const { usuarioId, nombre, horario, estado, meta, color } = req.body;

        const nuevoHabito = new Habito({
    		usuarioId,
    		nombre,
    		horario,
    		estado,
    		meta,
    		color
	});

        await nuevoHabito.save();

        res.json({
            mensaje: "Hábito creado correctamente",
            habito: nuevoHabito
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear hábito"
        });
    }
});

router.get("/:usuarioId", async (req, res) => {
    try {
        const habitos = await Habito.find({
            usuarioId: req.params.usuarioId
        });

        res.json(habitos);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener hábitos"
        });
    }
});

router.put("/completar/:id", async (req, res) => {
    try {
        const habito = await Habito.findByIdAndUpdate(
            req.params.id,
            {
                completado: true,
                estado: "Completado"
            },
            {
                new: true
            }
        );

        res.json({
            mensaje: "Hábito completado",
            habito
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al completar hábito"
        });
    }
});

router.delete("/eliminar/:id", async (req, res) => {
    try {
        await Habito.findByIdAndDelete(req.params.id);

        res.json({
            mensaje: "Hábito eliminado"
        });

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar hábito"
        });
    }
});

module.exports = router;