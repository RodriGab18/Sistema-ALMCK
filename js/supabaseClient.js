import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/+esm'
import { config } from './config.js'

const url = config.supabaseUrl;
const key = config.supabaseAnonKey;

// Cliente para el Inventario (Schema: inventario)
export const dbInventario = createClient(url, key, {
    db: { schema: 'inventario' }
});

// Cliente para Clientes y Empleados (Schema: personas)
export const dbPersonas = createClient(url, key, {
    db: { schema: 'personas' }
});

// Cliente para Ventas y Detalles (Schema: ventas)
export const dbVentas = createClient(url, key, {
    db: { schema: 'ventas' }
});

// Función de prueba de conexión
export async function testSupabaseConnection() {
    try {
        const { data, error } = await dbInventario.from('productos').select('*').limit(1);
        
        if (error) {
            console.error('Error de Supabase (Inventario):', error.message);
            return false;
        }
        
        console.log('✅ Conexión a Supabase exitosa');
        return true;
    } catch (err) {
        console.error('Error de red/conexión:', err);
        return false;
    }
}