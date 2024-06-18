import React from "react";

interface HeaderWelcomeProps {
  username: string;
}

const HeaderWelcome: React.FC<HeaderWelcomeProps> = ({ username }) => {
  return (
    <div className="my-auto grow p-2">
      <h1 className="text-xl font-bold md:text-3xl">Bem vindo, {username}</h1>
      <h2 className="text-xs md:text-base">O que vamos explorar hoje?</h2>
    </div>
  );
};

export default HeaderWelcome;
