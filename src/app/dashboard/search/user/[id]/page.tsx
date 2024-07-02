"use client";


import { useParams } from 'next/navigation';

export default function UserPage() {
  const params = useParams();
  const { id } = params;

  return (
    <div>
      <h1>User ID: {id}</h1>
      {/* Aqui você pode buscar e exibir os detalhes do usuário usando o ID */}
    </div>
  );
}
