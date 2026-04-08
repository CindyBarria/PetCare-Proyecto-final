/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Componente de botón reutilizable
 * =========================================================
 */

export default function Button({
    children,
    onClick,
    type = 'button',
    disabled = false,
    fullWidth = true
}) {
    const baseStyles =
        'h-12 rounded-full font-medium transition-colors px-5';

    const widthStyles = fullWidth ? 'w-full' : 'w-auto';

    const activeStyles =
        'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]';

    const disabledStyles =
        'bg-[var(--color-secondary)] text-[#4D4D4D] cursor-not-allowed';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${widthStyles} ${disabled ? disabledStyles : activeStyles}`}
        >
            {children}
        </button>
    );
}