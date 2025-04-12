import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import coinAnimation from "./animations/wired-flat-290-coin-hover-pinch.json";
import Lottie from "lottie-react";

defineElement(lottie.loadAnimation);

export default function CoinAnimation() {
  return (
    <div className="size-6">
      <Lottie loop={false} animationData={coinAnimation}></Lottie>
    </div>
  );
}
