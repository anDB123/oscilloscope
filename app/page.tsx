"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { workerData } from "worker_threads";
import SineCanvas from "./SineCanvas";
import Dial from "./Dial"



export default function Home() {
  const intensity = useRef(50);
  const speed = useRef(2);
  const spacing = useRef(0.1);
  const Sign = (
    <div style={{ transform: "translate(-10px, -10px)" }} className="block  bg-[#000000] w-[500px] h-[200px] rounded-[50px]">
      <div style={{ transform: "translate(-10px, -10px)" }} className="text-[50px] font-bold text-center flex items-center justify-center bg-[#D9D9D9] w-[500px] h-[200px] rounded-[50px] font-mono text-black">
        Oscilloscope
      </div>
    </div>
  );
  return (
    <main className=" min-h-screen items-center justify-between p-10 bg-black">
      <div className=" bg-[#838383] grid grid-cols-2 gap-5 m-auto rounded-[50px] p-5">
        <div className="flex flex-col items-center justify-center gap-5 p-5">
          {Sign}
          {SineCanvas(500, intensity, speed, spacing)}
        </div>
        <div className="grid grid-cols-2 items-center justify-around w-full gap-10">
          {Dial("Intensity", 200, intensity, 0, 300)}
          {Dial("Speed", 200, speed, 0, 10)}
          {Dial("Width", 200, spacing, 0, 0.1)}
        </div>
        <div></div>
        <p className="text-lg text-right p-10">
          Created by Andrew Brown
        </p>
      </div>
    </main>
  );
}
