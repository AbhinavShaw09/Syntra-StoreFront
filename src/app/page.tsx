"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ImagesSlider } from "@/components/ui/images-slider";

function ImagesSliderDemo() {
  const images = [
    "https://images.unsplash.com/photo-1713256452479-5a20056c0340?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1713256667652-412312c6fa08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1713256752744-fad1d7a8684c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <ImagesSlider className="h-[50rem] w-[92rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Bumper Sale is live !!! <br /> Shop the latest trends
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-violet-300/10 border-violet-500/20 text-white mx-auto text-center rounded-full relative mt-4">
          <Link href="/categories">
            <span>Shop Now→</span>
          </Link>
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-violet-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
  );
}

export default function Home() {
  return (
    <React.Fragment>
      <div className="flex items-center justify-center">
        <ImagesSliderDemo />
      </div>
    </React.Fragment>
  );
}
