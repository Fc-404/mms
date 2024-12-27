import { redirect } from "next/navigation";
import { verifyToken } from "./api/verifyToken";
import HomeLayout from "./(home)/layout";
import Home from "./(home)/page";

export default async function Page() {
  if (!(await verifyToken())) {
    redirect("/login");
  }

  return (
    <HomeLayout>
      <Home />
    </HomeLayout>
  );
}
