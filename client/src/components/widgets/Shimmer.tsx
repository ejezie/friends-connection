interface ShimmerProps {
  className?: string; // className is optional and of type string
}

const Shimmer = ({ className }: ShimmerProps) => {
  return (
    <div className="w-full animate-pulse">
      <div
        className={` bg-gray-200 rounded-full dark:bg-gray-300 w-full ${className}`}
      ></div>
    </div>
  );
};

export default Shimmer;
