import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const GlowEffect = dynamic(() => import("@/components/landing/GlowEffect"));

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    return (
      <div className="hero bg-base-200 min-h-screen">
        <GlowEffect />
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Ree Board</h1>
            <p className="py-6">
              Retro board build with Next.js and Tailwind CSS
            </p>
            <button className="btn btn-outline btn-primary">
              <LoginLink>Login</LoginLink>
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/board");
  }
}
