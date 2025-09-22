import ResetPassword from "@/components/ResetPassword";
import { notFound } from "next/navigation";

interface Props {
  searchParams: {
    token?: string;
    id?: string;
    userType?: string;
  };
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token, id, userType } = searchParams;

  if (!token || !id || !userType) {
    notFound();
  }

  const res = await fetch(
    `http://localhost:3000/api/auth/reset-password?id=${id}&token=${token}&userType=${userType}`,
    { cache: "no-store" }
  );

  console.log("Reset password check:", res.status, await res.text());
  if (!res.ok) {
    notFound();
  }

  return <ResetPassword token={token} id={id} userType={userType} />;
}
