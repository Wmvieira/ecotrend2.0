import React from "react";
import HeroSolutionCard from "./HeloSolutionCard";
import {
  FaMagnifyingGlassChart,
  FaRecycle,
  FaSeedling,
  FaUsers,
} from "react-icons/fa6";

const HeroSolutionTopics: React.FC = () => {
  return (
    <div className="h-2/3 rounded-md p-2">
      <div className="grid h-full grid-cols-2 grid-rows-2 gap-5 md:grid-cols-4 md:grid-rows-1 md:gap-8">
        <HeroSolutionCard
          icon={<FaUsers />}
          title="Comunidade"
          description="Comunidade ativa para um bem maior"
          checks={[
            "Receba dicas de outros usuários",
            "Encontre pessoas com os mesmos interesses",
            "Participe de eventos",
            "De dicas para outros usuários",
          ]}
        />
        <HeroSolutionCard
          icon={<FaSeedling />}
          title="Meio Ambiente"
          description="Ajude o meio ambiente com ações sustentáveis"
          checks={[
            "Coloque em prática ações sustentáveis",
            "Acompanhe o impacto de suas ações",
            "Receba dicas de ações sustentáveis",
          ]}
        />
        <HeroSolutionCard
          icon={<FaRecycle />}
          title="Reciclagem"
          description="Ações sustentáveis para um mundo melhor"
          checks={[
            "Entenda como cuidadar do lixo",
            "Entenda como cuidadar da água",
            "Entenda como cuidadar da energia",
            "Pratique ativididades sustentáveis",
          ]}
        />
        <HeroSolutionCard
          icon={<FaMagnifyingGlassChart />}
          title="Progresso"
          description="Compartilhe como suas ações impactam o mundo"
          checks={[
            "Acompanhe o impacto de suas ações",
            "Compartilhe suas ações com a comunidade",
            "Veja o impacto de suas ações no mundo",
          ]}
        />
      </div>
    </div>
  );
};

export default HeroSolutionTopics;
