interface InputFieldProps {
  label: string
  type?: "text" | "textarea"
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  required?: boolean
  id: string
}

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false,
  id,
}: InputFieldProps) {
  const baseClasses =
    "w-full px-4 py-3 bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 text-white placeholder-gray-400 transition-all duration-200 hover:border-slate-500"

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-2 tracking-wide"
      >
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={baseClasses}
          required={required}
        />
      ) : (
        <input
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClasses}
          required={required}
        />
      )}
    </div>
  )
}
