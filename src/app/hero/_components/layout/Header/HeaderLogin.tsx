import { SignIn } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export default function HeaderLogin() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Entrar</Button>
        </DialogTrigger>
        <DialogContent className="flex justify-center">
          <SignIn forceRedirectUrl="/dashboard" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
