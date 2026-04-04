export default function Button({
    children,
    onClick,
    type = 'button',
    disabled = false,
    fullWidth = true
}) {
    const baseStyles = 'h-12 rounded-full font-medium transition-colors px-4';
    const widthStyles = fullWidth ? 'w-full' : 'w-auto';
    const activeStyles = 'bg-[#2B7A78] text-white hover:bg-[#256b69]';
    const disabledStyles = 'bg-[#C5C5C5] text-[#4D4D4D] cursor-not-allowed';

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