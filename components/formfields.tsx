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
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium ">{label}</label>}

      <input
        className={`border p-2 rounded-md outline-none ${error ? "border-red-500" : "border-gray-300"} ${className}`}
        {...props}
      />

      {error && <span className="text-red-500 text-xs">{error}</span>}
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
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium ">{label}</label>}

      <select
        className={`border p-2 rounded-md   outline-none ${error ? "border-red-500" : "border-gray-300"} ${className}`}
        {...props}
      >
        <option value="" className="text-black">
          Select an option
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-black"
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="text-red-500 text-xs">{error}</span>}
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
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium ">
          {label} {required && "*"}
        </label>
      )}

      <div className="grid grid-cols-3 gap-3">
        {options.map((option) => {
          const isActive = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange?.(option.value)}
              className={`p-1.5 rounded-md border transition ${
                isActive
                  ? "bg-cyan-900 text-white border-cyan-600"
                  : "  border-gray-200 hover:border-cyan-900 hover:border"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};
