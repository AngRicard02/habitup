const mongoose = require("mongoose");

const HabitoSchema = new mongoose.Schema({

    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    nombre: {
        type: String,
        required: true
    },

    horario: {
        type: String,
        enum: ["Mañana", "Tarde", "Noche"],
        required: true
    },

    estado: {
        type: String,
        default: "Pendiente"
    },

    meta: {
        type: String,
        default: ""
    },

    color: {
        type: String,
        default: "azul"
    },

    completado: {
        type: Boolean,
        default: false
    },

    fechaCreacion: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Habito", HabitoSchema);