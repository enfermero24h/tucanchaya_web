"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const bd_1 = __importDefault(require("./config/bd"));
const asentamientoRoutes_1 = __importDefault(require("./routes/Crud/asentamientoRoutes"));
const canchaRoutes_1 = __importDefault(require("./routes/Crud/canchaRoutes"));
const equipoRoutes_1 = __importDefault(require("./routes/Crud/equipoRoutes"));
const grupoRoutes_1 = __importDefault(require("./routes/Crud/grupoRoutes"));
const partidoRoutes_1 = __importDefault(require("./routes/Crud/partidoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/auth/authRoutes"));
const app = (0, express_1.default)();
// Conectar a la base de datos
(0, bd_1.default)();
// Middleware
app.use(express_1.default.json());
// Rutas Crud 
app.use('/api', partidoRoutes_1.default);
app.use('/api', grupoRoutes_1.default);
app.use('/api', equipoRoutes_1.default);
app.use('/api', canchaRoutes_1.default);
app.use('/api', asentamientoRoutes_1.default);
//auth
app.use('/api/auth', authRoutes_1.default); //autenticacion y registro
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
