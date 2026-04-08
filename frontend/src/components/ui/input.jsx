/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Componente UI reutilizable para inputs
 * - Mantiene el mismo estilo en formularios
 * =========================================================
 */

/**
 * Input reutilizable.
 *
 * @param {Object} props
 * @param {string} props.type
 * @param {string} props.name
 * @param {string} props.placeholder
 * @param {string|number} props.value
 * @param {Function} props.onChange
 * @returns {JSX.Element}
 */
export default function Input({
    type = 'text',
    name,
    placeholder,
    value,
    onChange
}) {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full h-12 px-4 border border-[#7A7A7A] rounded-lg bg-white text-[#1A1A1A] placeholder:text-[#7A7A7A] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] mb-3"
        />
    );
}