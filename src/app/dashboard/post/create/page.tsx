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
import { CategoryComboBox } from "~/app/_components/category/CategoryCombobox";

const MAX_TEXTAREA_LENGTH = 3500;

const TipFormPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
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

  const handlePush = (value: string) => {
    if (categories.includes(value)) {
      setCategories(categories.filter((category) => category !== value));
    } else {
      setCategories([...categories, value]);
    }
  };

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
      categories,
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
      <div className="flex w-full flex-col">
        <div className="flex flex-wrap pb-4">
          {categories.map((category) => (
            <span
              key={category}
              className="px-2 py-1 text-sm text-gray-500"
              onClick={() =>
                setCategories(categories.filter((c) => c !== category))
              }
            >
              #{category}
            </span>
          ))}
        </div>
        <label>Categorias</label>
        <div className="flex w-full flex-row gap-2">
          <CategoryComboBox handlePush={handlePush} />
        </div>
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
