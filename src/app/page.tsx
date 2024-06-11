"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  router.push("/hero");

  return <main className=""></main>;
}
