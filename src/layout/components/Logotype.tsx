export default function Logotype() {
  return (
    <div className="flex flex-row items-center justify-center gap-2 text-base">
      <div className="h-4 w-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600"></div>
      <p className="font-bold text-lg">
        <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-600">
          My
        </span>
        Blog
      </p>
    </div>
  );
}
