import { Button } from "~/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

const HeroRequestJoin: React.FC = () => {
  return (
    <div className="mt-10 flex justify-center p-2">
      <div className="flex w-2/3 flex-col justify-center gap-3 text-sm md:w-1/3 md:text-base">
        <p>Uma plataforma 100% gratuita promovida por alunos da FEEVALE</p>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Junte-se a nós</Button>
            </DialogTrigger>
            <DialogContent className="flex justify-center">
              <SignIn />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default HeroRequestJoin;
