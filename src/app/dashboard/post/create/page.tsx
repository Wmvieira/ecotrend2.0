"use client";
import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const TipFormPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const { mutate: createTip } = api.tip.createPost.useMutation({
    onSuccess: (rate) => {
      void router.push("/dashboard");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createTip({
      title,
      content: description,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center md:px-14">
        <div className="mt-4 w-full md:w-1/2">
          <Input
            placeholder="Titulo do post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-4 w-full md:w-1/2">
          <Textarea
            placeholder="Digite o conteudo da postagem"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-4 flex w-full justify-end md:w-1/2">
          <Button type="submit">Enviar</Button>
        </div>
      </div>
    </form>
  );
};

export default TipFormPage;
