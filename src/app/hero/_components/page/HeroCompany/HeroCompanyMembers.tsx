import React from "react";
import CompanyMemberItem from "./CompanyMemberItem";

const HeroCompanyMembers: React.FC = () => {
  return (
    <div className="mt-10 w-full text-center">
      <h2 className="p-1 text-lg md:p-5 md:text-3xl">Membros</h2>
      <ul className="flex flex-wrap justify-center gap-2">
        <CompanyMemberItem
          name="Wictor Mendes"
          image="/hero/members/wictor.jpeg"
        />
        <CompanyMemberItem
          name="Cassiel Machado"
          image="/hero/members/cassiel.jpeg"
        />
        <CompanyMemberItem
          name="Wictor Mendes"
          image="/hero/members/wictor.jpeg"
        />
        <CompanyMemberItem
          name="Wictor Mendes"
          image="/hero/members/wictor.jpeg"
        />
      </ul>
    </div>
  );
};

export default HeroCompanyMembers;
