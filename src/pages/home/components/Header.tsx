import headerBgUrl from "@/assets/images/header_bg.jpg";

export default function Header() {
  return (
    <div className="relative h-80 w-full rounded-lg shadow-xl overflow-hidden">
      <img src={headerBgUrl} className="h-full w-full object-cover" />
      <div className="flex flex-col gap-4 absolute bottom-0 w-fit p-8 text-slate-50">
        <div className="absolute w-full h-full bg-slate-950/50 blur-xl"></div>
        <h1 className="text-4xl font-semibold z-10">MyBlog</h1>
        <p className="leading-relaxed z-10">
          This project was built for the learning purposes following The Odin
          Project's curriculum.
        </p>
      </div>
    </div>
  );
}
