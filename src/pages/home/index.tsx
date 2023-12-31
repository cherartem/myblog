import Header from "./components/Header";
import ListOfArticles from "./components/ListOfArticles";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <Header />
      <h1 className="font-semibold text-2xl">Articles:</h1>
      <ListOfArticles />
    </div>
  );
}
