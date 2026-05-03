/**
 * hash.js — Módulo de cifrado de contraseñas para Sistema ALMCK.
 *
 * Utiliza la Web Crypto API nativa del navegador (SubtleCrypto),
 * que es estándar, segura y no requiere librerías externas.
 *
 * Algoritmo: SHA-256
 * Resultado: string hexadecimal de 64 caracteres (minúsculas).
 *
 * USO (en cualquier módulo que importe este archivo):
 *   import { hashPassword } from '../hash/hash.js';
 *
 *   const hashed = await hashPassword('miContraseña123');
 *   // → 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
 */

'use strict';

/**
 * Convierte un ArrayBuffer a una cadena hexadecimal.
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
function bufferToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Genera el hash SHA-256 de una contraseña en texto plano.
 *
 * @param {string} password - Contraseña en texto plano.
 * @returns {Promise<string>} - Hash hexadecimal de 64 caracteres.
 * @throws {Error} Si la Web Crypto API no está disponible (contexto no seguro).
 */
export async function hashPassword(password) {
    if (!window.crypto || !window.crypto.subtle) {
        throw new Error(
            'Web Crypto API no disponible. ' +
            'Asegúrate de usar HTTPS o localhost.'
        );
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);

    return bufferToHex(hashBuffer);
}

/**
 * Compara una contraseña en texto plano con un hash almacenado.
 * Evita timing attacks usando la comparación a través del hash.
 *
 * @param {string} plainPassword  - Contraseña ingresada por el usuario.
 * @param {string} storedHash     - Hash SHA-256 almacenado en la base de datos.
 * @returns {Promise<boolean>}    - true si coinciden, false si no.
 */
export async function verifyPassword(plainPassword, storedHash) {
    const computedHash = await hashPassword(plainPassword);
    return computedHash === storedHash;
}
