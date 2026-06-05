import Header from "./Header";
import CreateTestForm from "./CreateTestForm";

export default function CreateTest() {
  return (
    <div className="flex-col min-h-screen space-y-8 p-2 md:p-6">
      <Header />
      <CreateTestForm />
    </div>
  );
}
