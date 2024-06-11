import React from "react";
import HeroRequestJoin from "./HeroRequestJoin";

const HeroResume: React.FC = () => {
  return (
    <div className="flex flex-col justify-center gap-1 md:gap-5">
      <div>
        <h3 className="p-2 text-xl md:text-2xl">Seja bem-vindo ao Ecotrend</h3>
        <h1 className="font-anton p-2 text-3xl md:text-6xl">
          A comunidade que cuida do meio ambiente
        </h1>
        <h2 className="mc:text-4xl p-2">
          Encontre dicas sobre sustentabilidade e <strong>muito mais</strong>
        </h2>
      </div>
      <div className="p-4 md:p-0" />
      <HeroRequestJoin />
    </div>
  );
};

export default HeroResume;
