/**
 * authGuard.js — Guard de autenticación para todas las vistas protegidas.
 *
 * Verifica que exista una sesión válida en localStorage ('usuarioLogueado').
 * Si no hay sesión, redirige inmediatamente a la página de inicio de sesión.
 *
 * USO: Agregar en el <head> de cada HTML protegido ANTES de cualquier otro script:
 *   Desde /Vistas/:  <script src="../js/authGuard.js"></script>
 *   Desde la raíz:   <script src="js/authGuard.js"></script>
 */

(function () {
    'use strict';

    // 1. Ocultar el body inmediatamente para evitar "flash" de contenido protegido
    document.documentElement.style.display = 'none';

    // 2. Verificar sesión en localStorage
    var sesion = null;
    try {
        var raw = localStorage.getItem('usuarioLogueado');
        if (raw) {
            sesion = JSON.parse(raw);
        }
    } catch (e) {
        // JSON inválido → sesión corrupta
        sesion = null;
    }

    // 3. Si no hay sesión válida, redirigir al login
    if (!sesion || !sesion.id) {
        // Calcular ruta relativa hacia incioSesion.html
        var ruta = window.location.pathname;
        var destino = ruta.indexOf('/Vistas/') !== -1 || ruta.indexOf('/vistas/') !== -1
            ? 'incioSesion.html'           // Ya estamos dentro de /Vistas/
            : 'Vistas/incioSesion.html';   // Estamos en la raíz

        window.location.replace(destino);
        return; // Detener ejecución
    }

    // 4. Sesión válida → mostrar la página
    document.documentElement.style.display = '';
})();
