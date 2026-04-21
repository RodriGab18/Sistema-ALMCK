/*
 * permisos.js — Control de acceso por nivel de usuario.
 *
 * nivelUsuario: integer que define los privilegios.
 *   1 = Solo lectura (consultar inventario)
 *   2 = Lectura + agregar productos
 *   3 = Lectura + agregar + modificar
 *   4 = Acceso total (incluye eliminar)
 *
 * Cambia el valor de nivelUsuario según tu sistema de autenticación.
 * Por ejemplo, al hacer login podrías asignar:
 *   Permisos.nivelUsuario = datosUsuario.nivel;
 */

const Permisos = {

  nivelUsuario: 4, // <-- Ajusta dinámicamente después del login

  NIVELES: {
    CONSULTAR:  1,
    AGREGAR:    2,
    MODIFICAR:  3,
    ELIMINAR:   4,
  },

  puede(accion) {
    return this.nivelUsuario >= accion;
  },

  puedeConsultar()  { return this.puede(this.NIVELES.CONSULTAR); },
  puedeAgregar()    { return this.puede(this.NIVELES.AGREGAR); },
  puedeModificar()  { return this.puede(this.NIVELES.MODIFICAR); },
  puedeEliminar()   { return this.puede(this.NIVELES.ELIMINAR); },

  bloquearAccion(nombreAccion) {
    alert(`No tienes permisos para "${nombreAccion}". Se requiere un nivel superior.`);
  },

  verificarOBloquear(accion, nombreAccion) {
    if (!this.puede(accion)) {
      this.bloquearAccion(nombreAccion);
      return false;
    }
    return true;
  }
};

window.Permisos = Permisos;
