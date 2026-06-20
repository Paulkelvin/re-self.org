"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const audiences = [
  {
    title: "HR & People Teams",
    body: "Planning wellbeing weeks, culture initiatives, and employee wellness campaigns that go beyond box-checking.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "High-Performance Leaders",
    body: "Managing burnout on ambitious teams where the pressure never lets up — and resilience isn't optional.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Federal Agencies",
    body: "Investing in workforce wellness with evidence-based programs built for the scale and rigor government demands.",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Educational Institutions",
    body: "Supporting faculty and staff with sustainable wellness practices that prevent attrition and restore purpose.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c476?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Wellness-First Organizations",
    body: "Building a long-term culture of care where wellbeing is woven into leadership, operations, and daily rhythms.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Executive Teams",
    body: "Navigating change, transition, and high-stakes demands with the emotional and strategic support to lead well.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  },
];

export function AudienceShowcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
      {/* Sticky image anchor */}
      <div className="relative hidden lg:block">
        <div className="sticky top-[15vh] h-[70vh] overflow-hidden rounded-2xl">
          {audiences.map((a, i) => (
            <Image
              key={a.title}
              src={a.image}
              alt={a.title}
              fill
              sizes="50vw"
              className={`object-cover transition-opacity duration-500 ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e3d38]/30 via-transparent to-transparent" />
        </div>
      </div>

      {/* Scrolling text blocks */}
      <div className="flex flex-col">
        {audiences.map((a, i) => (
          <div
            key={a.title}
            ref={(el) => { refs.current[i] = el; }}
            className={`transition-all duration-500 ease-in-out ${
              i === active ? "opacity-100" : "opacity-40"
            } ${i < audiences.length - 1 ? "mb-[25vh] lg:mb-[30vh]" : ""}`}
          >
            {/* Mobile image */}
            <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-xl lg:hidden">
              <Image
                src={a.image}
                alt={a.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <span className="mb-3 block font-mono text-xs tracking-widest text-forest/40">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className={`font-serif text-2xl font-bold tracking-tight transition-colors duration-500 lg:text-3xl ${
                i === active ? "text-[#1e3d38]" : "text-[#1e3d38]/50"
              }`}
            >
              {a.title}
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-[#1e3d38]/70">
              {a.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
