import React from "react";

interface TextInputProps {
  type: string;
  placeholder: string;
  className: string;
  label: string;
  labelStyles: string;
  error: string;
  name: string;
}

const TextInput: React.FC<TextInputProps> = React.forwardRef<
  HTMLInputElement,
  TextInputProps
>(
  (
    { type, placeholder, className, label, labelStyles, name, error },
    ref
  ): React.JSX.Element => {
    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bginput rounded-[29px] border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${className}`}
            aria-invalid={error ? "true" : "false"}
          />
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5 ">{error}</span>
        )}
      </div>
    );
  }
);

export default TextInput;
