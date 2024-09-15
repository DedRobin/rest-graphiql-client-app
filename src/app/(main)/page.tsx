import { getUser } from "@/services/next-firebase-auth-edge/utils";
import { Home } from "./client";

export default async function HomePage() {
  const user = await getUser();

  return <Home user={user} />;
}
