"use client";

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import TipComments from "./TipComments";
import TipCommentCreate from "./TipCommentCreate";

interface TipCommentsDrawerProps {
  tipId: string;
  trigger: React.ReactNode;
}

export type TipCommentCreateProps = {
  tipId: TipCommentsDrawerProps["tipId"];
};

const TipCommentsDrawer: React.FC<TipCommentsDrawerProps> = ({
  tipId,
  trigger,
}) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="md:text-2xl">
            Comentários da Publicação
          </DrawerTitle>
        </DrawerHeader>
        <div className="h-52 overflow-scroll" id="commentScroll">
          <TipComments tipId={tipId} />
        </div>
        <DrawerFooter>
          <TipCommentCreate tipId={tipId} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default TipCommentsDrawer;
