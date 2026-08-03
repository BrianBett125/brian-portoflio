"use client";

import { useEffect, useState } from "react";

const TYPING_STRINGS = [
  "Building systems that scale, automate, and monetize.",
  "Turning complex data flows into simple, robust APIs.",
  "Engineering for high performance and low operational drag.",
];

export default function TypewriterTerminal() {
  const [stringIndex, setStringIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(60);

  useEffect(() => {
    const currentString = TYPING_STRINGS[stringIndex];
    let timer: NodeJS.Timeout;

    const handleType = () => {
      if (!isDeleting) {
        setDisplayText(currentString.substring(0, displayText.length + 1));
        if (displayText === currentString) {
          // Pause at the end of typing
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        setDisplayText(currentString.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setStringIndex((prev) => (prev + 1) % TYPING_STRINGS.length);
          setTypingSpeed(100);
          return;
        }
      }
      setTypingSpeed(isDeleting ? 25 : 50);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, stringIndex, typingSpeed]);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-xs sm:text-sm leading-6 shadow-2xl backdrop-blur-md relative overflow-hidden select-none">
      {/* Terminal Screen Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
      
      <div className="flex items-center gap-1.5 pb-2 mb-3 border-b border-white/5 text-foreground-secondary/40">
        <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#22D3EE]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-1 text-[10px] uppercase tracking-wider font-semibold">brian@portfolio:~</span>
      </div>
      
      <p className="text-foreground-secondary/80">
        <span className="text-[#8B5CF6] font-bold">$</span> whoami
      </p>
      <p className="text-foreground font-bold mt-1">
        Brian Bett — <span className="text-[#22D3EE]">Backend Systems Engineer</span>
      </p>
      
      <p className="text-foreground-secondary/80 mt-3">
        <span className="text-[#8B5CF6] font-bold">$</span> cat core_thesis.sh
      </p>
      <p className="text-[#A78BFA] font-medium mt-1 min-h-[24px] flex items-center">
        &gt;&nbsp;{displayText}
        <span className="inline-block w-1.5 h-4 bg-[#A78BFA] ml-1 animate-pulse" />
      </p>
    </div>
  );
}
