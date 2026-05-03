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
        // Obtenemos la ruta absoluta de dónde se cargó este script (authGuard.js)
        // para calcular dinámicamente la raíz del proyecto y apuntar al login correctamente
        // sin importar si estamos en la raíz, en /Vistas/ o en /Vistas/Inventario/
        if (document.currentScript) {
            var scriptSrc = document.currentScript.src;
            var destino = scriptSrc.replace(/\/[jJ][sS]\/authGuard\.js.*/, '/Vistas/incioSesion.html');
            window.location.replace(destino);
        } else {
            // Fallback por si acaso
            window.location.replace('/Vistas/incioSesion.html');
        }
        return; // Detener ejecución
    }

    // 4. Sesión válida → mostrar la página
    document.documentElement.style.display = '';
})();
