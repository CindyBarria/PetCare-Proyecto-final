export default function Button({
    children,
    onClick,
    type = 'button',
    disabled = false
}) {
    const baseStyles =
        'w-full h-12 rounded-full font-medium transition-colors';

    const activeStyles =
        'bg-[#2B7A78] text-white hover:bg-[#256b69]';

    const disabledStyles =
        'bg-[#C5C5C5] text-[#4D4D4D] cursor-not-allowed';

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${disabled ? disabledStyles : activeStyles}`}
        >
            {children}
        </button>
    );
}