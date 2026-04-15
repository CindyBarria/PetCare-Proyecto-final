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
 * Props:
 * - isOpen: controla si el modal está visible
 * - onClose: cierra el modal
 * - children: contenido interno del modal
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element|null}
 */
export default function Modal({ isOpen, onClose, children }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            {/* Caja principal del modal */}
            <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg">
                {/* Botón de cierre */}
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
        </div>
    );
}