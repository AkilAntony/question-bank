import {
  InputFieldProps,
  OptionSelectProps,
  SelectFieldProps,
} from "@/types/formfields";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[#1e293b]">{label}</label>
      )}
      <input
        className={`px-3.5 py-2.5 rounded-lg border transition-colors outline-none text-sm
          ${error ? "border-rose-300 ring-1 ring-rose-300" : "border-[#e2e8f0] focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"}
          ${className}`}
        {...props}
      />
      {error && <span className="text-rose-500 text-xs">{error}</span>}
    </div>
  );
};

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error,
  options,
  className,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-[#1e293b]">{label}</label>
      )}
      <select
        className={`px-3.5 py-2.5 rounded-lg border transition-colors outline-none text-sm bg-white
          ${error ? "border-rose-300 ring-1 ring-rose-300" : "border-[#e2e8f0] focus:border-[#4f46e5] focus:ring-1 focus:ring-[#4f46e5]"}
          ${className}`}
        {...props}
      >
        <option value="" className="text-[#64748b]">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-rose-500 text-xs">{error}</span>}
    </div>
  );
};

export const OptionSelect: React.FC<OptionSelectProps> = ({
  label,
  required,
  value,
  options,
  onChange,
  error,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-[#1e293b]">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        {options.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange?.(option.value)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all outline-none
                ${
                  isActive
                    ? "bg-[#4f46e5] text-white shadow-sm"
                    : "bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#4f46e5] hover:text-[#4f46e5]"
                }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error && <span className="text-rose-500 text-xs">{error}</span>}
    </div>
  );
};
