"use client";
import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import Spinner from "~/components/ui/spinner";
import { FaPaperPlane } from "react-icons/fa6";
import { toast } from "~/components/ui/use-toast";

const MAX_TEXTAREA_LENGTH = 3500;

const TipFormPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const { mutate: createTip, isPending } = api.tip.createPost.useMutation({
    onSuccess: () => {
      toast({
        // variant: "destructive",
        title: "Sucesso.",
        description: "Você acabou de realizar uma publicação.",
      });
      void router.push("/dashboard");
    },
  });

  const handleAddDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (description.length < MAX_TEXTAREA_LENGTH) {
      setDescription(event.target.value);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !description) return;
    createTip({
      title,
      content: description,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-2 md:px-14"
    >
      <div className="w-full">
        <label className="text-lg font-bold">Titulo</label>
        <Input
          placeholder="Titulo do post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="w-full">
        <label className="text-lg font-bold">Conteudo</label>
        <Textarea
          placeholder="Digite o conteudo da postagem"
          value={description}
          onChange={handleAddDescription}
          onKeyDown={(e) =>
            e.key == "Backspace" &&
            description.length == MAX_TEXTAREA_LENGTH &&
            setDescription(description.slice(0, -1))
          }
          rows={15}
        />
        <span className="text-sm text-gray-500">
          {MAX_TEXTAREA_LENGTH - description.length} caracteres restantes
        </span>
      </div>
      <div className="flex w-full justify-end">
        <Button onClick={handleSubmit}>
          {isPending ? <Spinner /> : <FaPaperPlane />}
        </Button>
      </div>
    </form>
  );
};

export default TipFormPage;
