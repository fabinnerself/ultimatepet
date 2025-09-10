const mongoose = require('mongoose')
const { Schema } = mongoose
 

const petSchema = new Schema({
  codigo: {
    type: String,
    required: true,
    unique: true // Asegura que el código sea único
  },
  nombre: {
    type: String,
    required: true
  },
  raza: {
    type: String,
    required: true
  },
  especie: {
    type: String,
    required: true
  },
  fecha_nacimiento: {
    type: Date,
    required: true
  },
  observaciones: {
    type: String,
    default: '' // Valor por defecto si no se proporciona
  },
  created_at: {
    type: Date,
    default: Date.now // Fecha de creación automática
  },
  updated_at: {
    type: Date,
    default: Date.now // Fecha de actualización automática
  },
  deleted_at: {
    type: Date,
    default: null // Inicialmente nulo hasta que se elimine
  },
  is_deleted: {
    type: Boolean,
    default: false // Indica si el registro está marcado como eliminado
  },
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Referencia a un modelo de usuario (si existe)
    default: null
  }
}, {
  timestamps: true // Automáticamente gestiona `createdAt` y `updatedAt`
});

// Middleware para actualizar `updated_at` antes de guardar
petSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

// Modelo de mascota
//const Pet = mongoose.model('Pet', petSchema);



module.exports = mongoose.model('Pet', petSchema)
