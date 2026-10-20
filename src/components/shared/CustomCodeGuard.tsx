// components/shared/CustomCodeGuard.tsx
"use client";

import { useEffect } from "react";

type Expected = Record<"head" | "body-start" | "footer", number>;

export default function CustomCodeGuard({ expected }: { expected: Expected }) {
  useEffect(() => {
    const problems: string[] = [];

    (Object.keys(expected) as (keyof Expected)[]).forEach((slot) => {
      const parent = slot === "head" ? document.head : document.body;
      const inPlace = Array.from(
        document.querySelectorAll(`[data-custom-code="${slot}"]`)
      ).filter((el) => el.parentElement === parent);

      if (inPlace.length !== expected[slot]) {
        problems.push(`${slot}: expected ${expected[slot]}, found ${inPlace.length} in the correct parent`);
      }
    });

    if (problems.length) {
      console.error("[CustomCode] placement check failed:", problems);
      navigator.sendBeacon?.("/api/custom-code-report", JSON.stringify(problems)); // optional
    }
  }, [expected]);

  return null;
}