/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Componente modal reutilizable
 * - Se usa para mostrar contenido centrado sobre la página
 * =========================================================
 */

/**
 * Modal reutilizable.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controla si el modal está visible
 * @param {Function} props.onClose - Cierra el modal
 * @param {React.ReactNode} props.children - Contenido interno del modal
 * @returns {JSX.Element|null}
 */
export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        /* Inicio: fondo oscuro del modal */
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            {/* Inicio: caja principal del modal */}
            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                {/* Botón para cerrar el modal */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-xl font-bold text-[var(--color-text-light)]"
                    aria-label="Cerrar modal"
                >
                    ×
                </button>

                {children}
            </div>
            {/* Fin: caja principal del modal */}
        </div>
        /* Fin: fondo oscuro del modal */
    );
}