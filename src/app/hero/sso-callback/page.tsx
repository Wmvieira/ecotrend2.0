"use client";

import { useRouter } from "next/navigation";

export default function RedirectToDashboard() {
  const router = useRouter();

  router.push("/dashboard");

  return <main className=""></main>;
}
