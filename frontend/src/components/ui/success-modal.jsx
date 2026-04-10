/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Modal reutilizable para mensajes de éxito
 * - Se usa después de crear una publicación o enviar solicitud
 * =========================================================
 */

import Button from './button';

/**
 * Modal de confirmación / éxito.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controla si el modal está visible
 * @param {Function} props.onClose - Función para cerrar el modal
 * @param {string} props.title - Título principal del modal
 * @param {string} props.message - Mensaje descriptivo
 * @param {string} props.buttonText - Texto del botón principal
 * @param {string} props.iconSrc - Ruta del ícono SVG o imagen
 * @returns {JSX.Element|null}
 */
export default function SuccessModal({
    isOpen,
    onClose,
    title,
    message,
    buttonText = 'Volver a inicio',
    iconSrc
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-[2rem] bg-[#F3F3F3] p-8 text-center shadow-lg">
                {/* Título del modal */}
                <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-6">
                    {title}
                </h2>

                {/* Ícono de confirmación */}
                {iconSrc ? (
                    <img
                        src={iconSrc}
                        alt="Confirmación exitosa"
                        className="w-32 h-32 mx-auto mb-6"
                    />
                ) : null}

                {/* Mensaje descriptivo */}
                <p className="text-xl leading-relaxed text-[#1A1A1A] mb-8">
                    {message}
                </p>

                {/* Botón para cerrar el modal */}
                <Button onClick={onClose}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}