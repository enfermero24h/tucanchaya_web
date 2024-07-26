import Partido from '../models/partido';
import Torneo, { ITorneo } from '../models/torneo';

class TablaPosicionesService {
  async inicializarTablaPosiciones(torneoId: string): Promise<ITorneo> {
    const torneo = await Torneo.findById(torneoId);
    if (!torneo) throw new Error('Torneo no encontrado');

    torneo.tablaPosiciones = torneo.equiposParticipantes.map(equipo => ({
      equipo,
      puntos: 0,
      partidosJugados: 0,
      victorias: 0,
      empates: 0,
      derrotas: 0,
      golesFavor: 0,
      golesContra: 0,
      diferenciaGoles: 0,
      partidosLocal: 0,
      partidosVisitante: 0,
      victoriasLocal: 0,
      victoriasVisitante: 0,
      empatesLocal: 0,
      empatesVisitante: 0,
      derrotasLocal: 0,
      derrotasVisitante: 0,
      rachaActual: []
    }));

    return await torneo.save();
  }

  async actualizarTablaPosiciones(partidoId: string): Promise<ITorneo> {
    const partido = await Partido.findById(partidoId);
    if (!partido) throw new Error('Partido no encontrado');

    const torneo = await Torneo.findById(partido.torneo);
    if (!torneo) throw new Error('Torneo no encontrado');

    const equipoLocal = torneo.tablaPosiciones.find(p => p.equipo.toString() === partido.equipoLocal.toString());
    const equipoVisitante = torneo.tablaPosiciones.find(p => p.equipo.toString() === partido.equipoVisitante.toString());

    if (!equipoLocal || !equipoVisitante) throw new Error('Equipo no encontrado en la tabla de posiciones');

    // Actualizar estadísticas generales
    equipoLocal.partidosJugados++;
    equipoVisitante.partidosJugados++;
    equipoLocal.golesFavor += partido.golesLocal!;
    equipoLocal.golesContra += partido.golesVisitante!;
    equipoVisitante.golesFavor += partido.golesVisitante!;
    equipoVisitante.golesContra += partido.golesLocal!;

    // Actualizar estadísticas de local/visitante
    equipoLocal.partidosLocal++;
    equipoVisitante.partidosVisitante++;

    let resultadoLocal: 'V' | 'E' | 'D';
    let resultadoVisitante: 'V' | 'E' | 'D';

    if (partido.golesLocal! > partido.golesVisitante!) {
      equipoLocal.puntos += 3;
      equipoLocal.victorias++;
      equipoLocal.victoriasLocal++;
      equipoVisitante.derrotas++;
      equipoVisitante.derrotasVisitante++;
      resultadoLocal = 'V';
      resultadoVisitante = 'D';
    } else if (partido.golesLocal! < partido.golesVisitante!) {
      equipoVisitante.puntos += 3;
      equipoVisitante.victorias++;
      equipoVisitante.victoriasVisitante++;
      equipoLocal.derrotas++;
      equipoLocal.derrotasLocal++;
      resultadoLocal = 'D';
      resultadoVisitante = 'V';
    } else {
      equipoLocal.puntos++;
      equipoVisitante.puntos++;
      equipoLocal.empates++;
      equipoLocal.empatesLocal++;
      equipoVisitante.empates++;
      equipoVisitante.empatesVisitante++;
      resultadoLocal = 'E';
      resultadoVisitante = 'E';
    }

    // Actualizar racha actual
    equipoLocal.rachaActual = [...equipoLocal.rachaActual.slice(-4), resultadoLocal];
    equipoVisitante.rachaActual = [...equipoVisitante.rachaActual.slice(-4), resultadoVisitante];

    equipoLocal.diferenciaGoles = equipoLocal.golesFavor - equipoLocal.golesContra;
    equipoVisitante.diferenciaGoles = equipoVisitante.golesFavor - equipoVisitante.golesContra;

    torneo.tablaPosiciones.sort((a, b) => {
      if (a.puntos !== b.puntos) return b.puntos - a.puntos;
      if (a.diferenciaGoles !== b.diferenciaGoles) return b.diferenciaGoles - a.diferenciaGoles;
      return b.golesFavor - a.golesFavor;
    });

    return await torneo.save();
  }

  async obtenerTablaPosiciones(torneoId: string): Promise<ITorneo['tablaPosiciones']> {
    const torneo = await Torneo.findById(torneoId).populate('tablaPosiciones.equipo');
    if (!torneo) throw new Error('Torneo no encontrado');
    return torneo.tablaPosiciones;
  }
}

export default new TablaPosicionesService();