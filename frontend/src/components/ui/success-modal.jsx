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
 * Props:
 * - isOpen: controla si el modal está visible
 * - onClose: cierra el modal
 * - title: título principal
 * - message: mensaje descriptivo
 * - buttonText: texto del botón
 * - iconSrc: ruta del ícono
 *
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {Function} props.onClose
 * @param {string} props.title
 * @param {string} props.message
 * @param {string} props.buttonText
 * @param {string} props.iconSrc
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
            {/* Caja del modal */}
            <div className="w-full max-w-md rounded-[2rem] bg-[#F3F3F3] p-8 text-center shadow-lg">
                {/* Título */}
                <h2 className="text-3xl font-semibold text-[#1A1A1A] mb-6">
                    {title}
                </h2>

                {/* Ícono */}
                {iconSrc ? (
                    <img
                        src={iconSrc}
                        alt="Confirmación exitosa"
                        className="w-32 h-32 mx-auto mb-6"
                    />
                ) : null}

                {/* Mensaje */}
                <p className="text-xl leading-relaxed text-[#1A1A1A] mb-8">
                    {message}
                </p>

                {/* Acción */}
                <Button onClick={onClose}>
                    {buttonText}
                </Button>
            </div>
        </div>
    );
}