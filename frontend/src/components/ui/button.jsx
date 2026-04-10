/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Componente de botón reutilizable
 * - Se utiliza en formularios, cards y acciones generales
 * =========================================================
 */

/**
 * Botón reutilizable de la aplicación.
 *
 * Props:
 * - children: contenido del botón
 * - onClick: función que se ejecuta al hacer click
 * - type: tipo de botón HTML
 * - disabled: desactiva el botón
 * - fullWidth: define si ocupa todo el ancho disponible
 *
 * @param {Object} props
 * @returns {JSX.Element}
 */
export default function Button({
    children,
    onClick,
    type = 'button',
    disabled = false,
    fullWidth = true
}) {
    /* Estilos base compartidos */
    const baseStyles =
        'h-11 rounded-full font-medium transition-colors px-5 text-base';

    /* Define si el botón ocupa todo el ancho o no */
    const widthStyles = fullWidth ? 'w-full' : 'w-auto';

    /* Estilo activo principal */
    const activeStyles =
        'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]';

    /* Estilo deshabilitado */
    const disabledStyles =
        'bg-[var(--color-secondary)] text-[#4D4D4D] cursor-not-allowed';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${widthStyles} ${
                disabled ? disabledStyles : activeStyles
            }`}
        >
            {children}
        </button>
    );
}