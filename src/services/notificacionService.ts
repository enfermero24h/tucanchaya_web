import mongoose from 'mongoose';
import Equipo from '../models/equipo';
import Notificacion, { INotificacion } from '../models/notificacion';
import Partido from '../models/partido';
import Torneo from '../models/torneo';
import Usuario from '../models/usuario';

class NotificacionService {
    async crearNotificacion(notificacionData: Partial<INotificacion>): Promise<INotificacion> {
        const notificacion = new Notificacion(notificacionData);
        return await notificacion.save();
    }

    async obtenerNotificacionesPorUsuario(usuarioId: string): Promise<INotificacion[]> {
        return await Notificacion.find({ usuario: usuarioId }).sort('-fechaEnvio');
    }

    async marcarComoLeida(notificacionId: string): Promise<INotificacion | null> {
        return await Notificacion.findByIdAndUpdate(notificacionId, { leida: true }, { new: true });
    }

    async notificarPartidoProximo(partidoId: mongoose.Types.ObjectId): Promise<void> {
        const partido = await Partido.findById(partidoId);
        if (!partido) throw new Error('Partido no encontrado');

        const equipoLocal = await Equipo.findById(partido.equipoLocal);
        const equipoVisitante = await Equipo.findById(partido.equipoVisitante);
        if (!equipoLocal || !equipoVisitante) throw new Error('Equipo no encontrado');

        const equipos = [equipoLocal, equipoVisitante];
        for (const equipo of equipos) {
        const jugadores = await Usuario.find({ equipo: equipo._id });
        for (const jugador of jugadores) {
            await this.crearNotificacion({
            usuario: jugador._id,
            tipo: 'partido_proximo',
            contenido: `Tienes un partido próximo contra ${equipo._id.equals(partido.equipoLocal) ? equipoVisitante.nombre : equipoLocal.nombre} el ${partido.fecha.toLocaleDateString()}.`,
            partido: partido._id,
            torneo: partido.torneo
            });
        }
        }
    }

    async notificarCambioTorneo(torneoId: string, cambio: string): Promise<void> {
        const torneo = await Torneo.findById(torneoId);
        if (!torneo) throw new Error('Torneo no encontrado');

        const equipos = await Equipo.find({ _id: { $in: torneo.equiposParticipantes } });
        for (const equipo of equipos) {
        const jugadores = await Usuario.find({ equipo: equipo._id });
        for (const jugador of jugadores) {
            await this.crearNotificacion({
            usuario: jugador._id,
            tipo: 'cambio_torneo',
            contenido: `Ha habido un cambio en el torneo "${torneo.nombre}": ${cambio}`,
            torneo: torneo._id
            });
        }
        }
    }

    async notificarResultadoPartido(partidoId: mongoose.Types.ObjectId): Promise<void> {
        const partido = await Partido.findById(partidoId);
        if (!partido) throw new Error('Partido no encontrado');

        const equipoLocal = await Equipo.findById(partido.equipoLocal);
        const equipoVisitante = await Equipo.findById(partido.equipoVisitante);
        if (!equipoLocal || !equipoVisitante) throw new Error('Equipo no encontrado');

        const equipos = [equipoLocal, equipoVisitante];
        for (const equipo of equipos) {
        const jugadores = await Usuario.find({ equipo: equipo._id });
        for (const jugador of jugadores) {
            await this.crearNotificacion({
            usuario: jugador._id,
            tipo: 'resultado_partido',
            contenido: `El partido entre ${equipoLocal.nombre} y ${equipoVisitante.nombre} ha finalizado. Resultado: ${partido.golesLocal}-${partido.golesVisitante}`,
            partido: partido._id,
            torneo: partido.torneo
            });
        }
        }
    }
    }

    export default new NotificacionService();