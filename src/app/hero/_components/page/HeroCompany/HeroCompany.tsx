"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import HeroCompanyMembers from "./HeroCompanyMembers";

const HeroCompany: React.FC = () => {
  return (
    <div className="flex h-screen w-screen p-10 md:p-20">
      <Card className="w-full">
        <CardHeader>
          <h1 className="font-anton text-4xl md:text-6xl">ECOTREND</h1>
        </CardHeader>
        <CardContent className="flex h-full flex-col gap-2">
          <p className="text-lg">
            Criada em 2024, na disciplina de Projeto - Desafio Computacional com
            o Professor Gabriel da Silva Simões, a Ecotrend é uma plataforma que
            visa auxiliar as pessoas a terem uma vida mais sustentável.
          </p>
          <p className="hidden text-lg md:inline">
            Contando com uma plataforma web e um aplicativo mobile, que visam
            propagar dicas e informações sobre sustentabilidade, a Ecotrend é
            uma empresa que visa o bem-estar do planeta e de seus habitantes.
          </p>

          <HeroCompanyMembers />
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroCompany;
