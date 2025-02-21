const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-52 bg-gray-300 rounded rounded-t-lg mb-4"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
    </div>
  );
};

export default LoadingSkeleton;
