/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Componente UI reutilizable tipo tarjeta
 * - Envuelve contenido visual en un contenedor uniforme
 * =========================================================
 */

/**
 * Tarjeta reutilizable para formularios y listados.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export default function Card({ children }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6">
            {children}
        </div>
    );
}