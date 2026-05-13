// Importamos solo el cliente que necesitamos para consultar al empleado
import { dbPersonas } from './supabaseClient.js'; 

document.addEventListener('DOMContentLoaded', async () => {
    await verificarRolYMostrarModulos();
});

async function verificarRolYMostrarModulos() {
    // 1. Obtener el usuario de la sesión local (authGuard.js ya verificó que exista)
    const sesion = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (!sesion || !sesion.id) {
        // authGuard.js ya maneja la redirección, pero por seguridad:
        window.location.href = 'Vistas/incioSesion.html';
        return;
    }

    // Mostrar el nombre del usuario en la interfaz principal
    const greetingEl = document.getElementById('user-greeting');
    if (greetingEl && sesion.nombre) {
        // Obtenemos solo el primer nombre para mantener el diseño limpio
        greetingEl.textContent = `${sesion.nombre.split(' ')[0]}`;
    }

    // 2. Consultar el rol del empleado usando su ID de sesión
    const { data: empleado, error: dbError } = await dbPersonas
        .from('empleados')
        .select('puesto_id')
        .eq('id', sesion.id)
        .single();

    if (dbError || !empleado) {
        console.error("Error obteniendo datos del empleado:", dbError);
        return;
    }

    const puestoId = empleado.puesto_id;
    
    // Obtener nivel_permiso del puesto en una consulta separada
    let nivelPermiso = null;
    if (puestoId) {
        const { data: puesto } = await dbPersonas
            .from('puestos')
            .select('nivel_permiso')
            .eq('id', puestoId)
            .maybeSingle();
        if (puesto) nivelPermiso = puesto.nivel_permiso;
    }

    // 3. Lógica de bloqueo — ocultar Gestión para empleados sin permiso

    if (puestoId === 2 || nivelPermiso === 2) {
        const btnGestion = document.getElementById('btn-gestion');
        if (btnGestion) {
            btnGestion.style.display = 'none'; 
        }
    }
}