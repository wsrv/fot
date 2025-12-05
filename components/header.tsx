"use client";

import type { Ref } from "react";

interface HeaderProps {
  titleRef?: Ref<HTMLParagraphElement>;
}

export default function Header({ titleRef }: HeaderProps) {
  return (
    <div className="mb-4 w-full text-center">
      <div className="relative inline-block">
        <p
          ref={titleRef}
          className="text-sm uppercase tracking-[2px]  font-semibold mb-1"
        >
          Formula 1 ABU DHABI 2025
        </p>
      </div>
    </div>
  );
}
