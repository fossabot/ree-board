import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';

export default function Home() {
  const { isAuthenticated } = getKindeServerSession();

  if (!isAuthenticated()) {
    redirect('/api/auth/login');
  } else {
    redirect('/board');
  }
}
