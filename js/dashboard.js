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

    // 2. Consultar el rol del empleado usando su ID de sesión
    const { data: empleado, error: dbError } = await dbPersonas
        .from('empleados')
        .select(`
            id_puesto,
            puesto_id,
            puestos ( nivel_permiso )
        `)
        .eq('id', sesion.id)
        .single();

    if (dbError || !empleado) {
        console.error("Error obteniendo datos del empleado:", dbError);
        return;
    }

    // 3. Lógica de bloqueo — ocultar Gestión para empleados sin permiso
    const puestoId = empleado.id_puesto || empleado.puesto_id;
    const nivelPermiso = empleado.puestos?.nivel_permiso;

    if (puestoId === 2 || nivelPermiso === 2) {
        const btnGestion = document.getElementById('btn-gestion');
        if (btnGestion) {
            btnGestion.style.display = 'none'; 
        }
    }
}