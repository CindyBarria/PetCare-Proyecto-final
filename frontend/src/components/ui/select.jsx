/**
 * =========================================================
 * ESTRUCTURA GENERAL DEL ARCHIVO
 * - Componente UI reutilizable para select
 * - Permite mantener consistencia visual con los inputs
 * =========================================================
 */

/**
 * Select reutilizable.
 *
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.value
 * @param {Function} props.onChange
 * @param {Array} props.options
 * @returns {JSX.Element}
 */
export default function Select({ name, value, onChange, options = [] }) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full h-12 px-4 border border-[#7A7A7A] rounded-lg bg-white text-[#1A1A1A] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] mb-3"
        >
            {options.map(({ value: optionValue, label }) => (
                <option key={optionValue} value={optionValue}>
                    {label}
                </option>
            ))}
        </select>
    );
}