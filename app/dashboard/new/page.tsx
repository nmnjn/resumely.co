import QuestionsGenerator from "@/components/QuestionsGenerator";
import Header from "@/components/Header";

export default async function Dashboard() {
  return (
    <div className="animate-in mt-8">
      <Header />
      <QuestionsGenerator />
    </div>
  );
}
