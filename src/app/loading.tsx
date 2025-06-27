export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-primary-600 animate-spin"></div>
          <div
            className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-transparent border-l-4 border-r-4 border-l-accent-500 border-r-accent-500 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1s" }}
          ></div>
        </div>
        {/* <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p> */}
      </div>
    </div>
  );
}
