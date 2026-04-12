/*
 * db.js — Capa de acceso a datos (implícita).
 *
 * Todas las funciones devuelven Promises. Reemplaza el cuerpo de cada una
 * con la llamada real a tu backend (fetch, axios, Firebase, Supabase, etc.).
 *
 * Ejemplo con fetch:
 *   return fetch('/api/productos', { method: 'GET' }).then(r => r.json());
 */

const API_BASE = '/api'; // <-- Ajusta a tu endpoint real

const DB = {

  obtenerTodos() {
    // TODO: Conectar a tu backend
    // return fetch(`${API_BASE}/productos`).then(r => r.json());
    return Promise.resolve([
      { id: '001', nombre: 'Crema Victoria Secret', categoria: 'Maquillaje', stock: 20, precio: 350.00 },
      { id: '002', nombre: 'Pachon Disney',         categoria: 'Tupper',     stock: 12, precio: 180.00 },
      { id: '003', nombre: 'Gloss Elf',             categoria: 'Maquillaje', stock: 8,  precio: 210.00 },
    ]);
  },

  buscarPorTermino(termino) {
    // TODO: Conectar a tu backend
    // return fetch(`${API_BASE}/productos?q=${encodeURIComponent(termino)}`).then(r => r.json());
    return this.obtenerTodos().then(productos =>
      productos.filter(p =>
        p.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        p.categoria.toLowerCase().includes(termino.toLowerCase()) ||
        p.id.includes(termino)
      )
    );
  },

  obtenerPorId(id) {
    // TODO: Conectar a tu backend
    // return fetch(`${API_BASE}/productos/${id}`).then(r => r.json());
    return this.obtenerTodos().then(productos =>
      productos.find(p => p.id === id) || null
    );
  },

  agregarProducto(producto) {
    // TODO: Conectar a tu backend
    // return fetch(`${API_BASE}/productos`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(producto)
    // }).then(r => r.json());
    console.log('DB.agregarProducto →', producto);
    return Promise.resolve({ ok: true, id: Date.now().toString() });
  },

  modificarProducto(id, datos) {
    // TODO: Conectar a tu backend
    // return fetch(`${API_BASE}/productos/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(datos)
    // }).then(r => r.json());
    console.log('DB.modificarProducto →', id, datos);
    return Promise.resolve({ ok: true });
  },

  eliminarProducto(id) {
    // TODO: Conectar a tu backend
    // return fetch(`${API_BASE}/productos/${id}`, { method: 'DELETE' }).then(r => r.json());
    console.log('DB.eliminarProducto →', id);
    return Promise.resolve({ ok: true });
  }
};
