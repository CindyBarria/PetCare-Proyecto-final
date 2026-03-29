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
            className="
                w-full
                h-12
                px-4
                border border-[#7A7A7A]
                rounded-lg
                bg-white
                text-[#1A1A1A]
                placeholder:text-[#7A7A7A]
                focus:outline-none
                focus:border-[#2B7A78]
                focus:ring-1 focus:ring-[#2B7A78]
                mb-3
            "
        />
    );
}