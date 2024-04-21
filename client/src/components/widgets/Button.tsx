import { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
  className?: string;
}

const LoadingButton: React.FC<ButtonProps> = ({
  loading,
  loadingText,
  className,
  ...props
}): React.JSX.Element => {
  return (
    <button
      className={`transition-colors h-[25px] center lg:h-[35px] bg-blue-600 min-w-[100px] btncolor text-white font-medium px-4 py-1 rounded-[20px] hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:opacity-[0.2] ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        loadingText ? (
          loadingText
        ) : (
          <div className="w-full h-2 flex items-center justify-center">
            <Spinner />
          </div>
        )
      ) : (
        props.children
      )}
    </button>
  );
};

export default LoadingButton;
