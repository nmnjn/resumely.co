import Header from "@/components/Header";
import QuestionsGenerator from "@/components/QuestionsGenerator";
import NavBar from "@/components/NavBar";
import { getUser } from "@/utils/supabase/utils";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const user = await getUser(false);

  if (user) {
    redirect(`/dashboard`);
  }

  return (
    <div>
      <NavBar showName={true} />
      <div className="animate-in flex flex-col mt-8">
        <Header />
        <QuestionsGenerator />
      </div>
    </div>
  );
}
