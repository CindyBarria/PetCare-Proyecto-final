export default function Select({ name, value, onChange, options = [] }) {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="
                w-full
                h-12
                px-4
                border border-[#7A7A7A]
                rounded-lg
                bg-white
                text-[#1A1A1A]
                focus:outline-none
                focus:border-[#2B7A78]
                focus:ring-1 focus:ring-[#2B7A78]
                mb-3
            "
        >
            {options.map(({ value: optionValue, label }) => (
                <option key={optionValue} value={optionValue}>
                    {label}
                </option>
            ))}
        </select>
    );
}