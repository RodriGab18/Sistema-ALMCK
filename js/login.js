// login.js

// 1. Importar el cliente de Supabase (Asegúrate de que la ruta sea correcta según tus carpetas)
import { dbPersonas } from '../js/supabaseClient.js';

// 2. Capturar los elementos del DOM
const loginForm = document.getElementById('login-form');
const inputUsername = document.getElementById('username');
const inputPassword = document.getElementById('password');
const btnSubmit = document.getElementById('btn-submit');
const errorAlert = document.getElementById('login-error');

// Función para mostrar errores en la interfaz
function showError(message) {
    errorAlert.textContent = message;
    errorAlert.style.display = 'block';
    // Ocultar el error después de 4 segundos
    setTimeout(() => {
        errorAlert.style.display = 'none';
    }, 4000);
}

// 3. Manejar el evento de envío del formulario
loginForm.addEventListener('submit', async (e) => {
    // IMPORTANTE: Evita que la página se recargue al dar clic en submit
    e.preventDefault();

    const usernameVal = inputUsername.value.trim();
    const passwordVal = inputPassword.value;

    if (!usernameVal || !passwordVal) {
        showError("Por favor, ingresa tu usuario y contraseña.");
        return;
    }

    // Cambiar estado del botón para dar feedback al usuario
    const originalBtnText = btnSubmit.textContent;
    btnSubmit.textContent = 'Verificando...';
    btnSubmit.disabled = true;

    try {
        // 4. Consultar la base de datos de empleados
        const { data, error } = await dbPersonas
            .from('empleados')
            .select('*')
            .eq('username', usernameVal)
            .eq('activo', true) // Solo permitir acceso a empleados activos
            .single(); // Esperamos encontrar solo un usuario

        // 5. Validar resultados
        if (error || !data) {
            // Si hay un error en la consulta o no encuentra los datos
            showError("Usuario no encontrado o inactivo.");
        } else if (data.password !== passwordVal) {
            // Validar si la contraseña coincide (Actual: texto plano)
            showError("Contraseña incorrecta.");
        } else {
            // ✅ ¡LOGIN EXITOSO!

            // 6. Guardar la "sesión" del usuario en localStorage
            // Esto servirá para que otras pantallas sepan quién está operando (ej. para registrar una venta)
            const sessionData = {
                id: data.id,
                nombre: data.nombre,
                puesto_id: data.puesto_id
            };
            localStorage.setItem('usuarioLogueado', JSON.stringify(sessionData));

            btnSubmit.textContent = '¡Ingresando...!';
            btnSubmit.style.backgroundColor = '#10b981'; // Color verde de éxito

            // 7. Redirigir al dashboard principal (Ajusta la ruta si es necesario)
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 800);
        }

    } catch (err) {
        console.error("Error crítico en login:", err);
        showError("Error de conexión con el servidor.");
    } finally {
        // Restaurar el botón si hubo un error (si fue exitoso, ya se redirigió)
        btnSubmit.textContent = originalBtnText;
        btnSubmit.disabled = false;
    }
});