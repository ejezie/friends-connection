/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldInputProps,
  FieldMetaState,
  FieldRenderProps,
} from "react-final-form";

interface TextInputProps {
  type?: string;
  placeholder?: string;
  className?: string;
  label?: string;
  labelStyles?: string;
  input?: FieldInputProps<string>;
  meta: FieldMetaState<string | boolean>;
}

const TextInput = ({
  type,
  placeholder,
  className,
  label,
  labelStyles,
  meta,
  input,
}: TextInputProps | FieldRenderProps<any>) => {
  return (
    <div className="w-full flex flex-col mt-2">
      {label && (
        <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
      )}

      <div className="w-full">
        <input
          {...input}
          type={type}
          placeholder={placeholder}
          className={`bginput rounded-[29px] w-full border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${className}`}
          aria-invalid={meta.error ? "true" : "false"}
        />
      </div>
      {meta.error && meta.touched && (
        <span className="text-[10px] text-[#f76b6bfe] mt-0.5 ">
          {meta.error}
        </span>
      )}
    </div>
  );
};

export default TextInput;
