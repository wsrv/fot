"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import TicketCard from "@/components/ticket-card";
import Header from "@/components/header";

interface Ticket {
  id: number;
  qrImage: string;
  bookingCode: string;
  date: string;
  time: string;
  hall: number;
  row: number;
  seats: number[];
}

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const headerTitleRef = useRef<HTMLParagraphElement | null>(null);
  const targetTimestamp = useRef(
    new Date("2025-12-07T19:50:00+07:00").getTime()
  );
  const [trackHeight, setTrackHeight] = useState(260);
  const [titleDistance, setTitleDistance] = useState(260);

  const computeCountdown = () => {
    const diff = Math.max(targetTimestamp.current - Date.now(), 0);
    const day = 1000 * 60 * 60 * 24;
    const hour = 1000 * 60 * 60;
    const minute = 1000 * 60;
    const days = Math.floor(diff / day);
    const hours = Math.floor((diff % day) / hour);
    const minutes = Math.floor((diff % hour) / minute);
    const seconds = Math.floor((diff % minute) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [countdown, setCountdown] = useState(computeCountdown);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(computeCountdown());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTrackHeight = () => {
      if (!headerTitleRef.current) return;
      const rect = headerTitleRef.current.getBoundingClientRect();
      const distance = Math.max(rect.top, 0);
      setTitleDistance(distance);
      const finalHeight = Math.max(distance * 1.1, 220);
      setTrackHeight(finalHeight);
    };

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateTrackHeight())
        : null;
    if (headerTitleRef.current && observer) {
      observer.observe(headerTitleRef.current);
    }

    updateTrackHeight();
    window.addEventListener("resize", updateTrackHeight);
    window.addEventListener("orientationchange", updateTrackHeight);

    return () => {
      window.removeEventListener("resize", updateTrackHeight);
      window.removeEventListener("orientationchange", updateTrackHeight);
      observer?.disconnect();
    };
  }, []);

  const tickets: Ticket[] = [
    {
      id: 1,
      qrImage: "/images/unnamed.png",
      bookingCode: "WNKJ4DS",
      date: "07.12",
      time: "19:50",
      hall: 6,
      row: 4,
      seats: [5, 6, 7, 8],
    },
    {
      id: 2,
      qrImage: "/images/unnamed1.png",
      bookingCode: "WHQJ66C",
      date: "07.12",
      time: "19:50",
      hall: 6,
      row: 4,
      seats: [4],
    },
  ];

  const handleSwipe = (e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const swipeThreshold = 50;

    if (e.type === "touchend") {
      const touchEnd = touch.clientX;
      const currentTarget = e.currentTarget as HTMLElement;
      const storedTouchStart = currentTarget.dataset.touchStart;
      const touchStart = storedTouchStart ? Number.parseInt(storedTouchStart, 10) : touchEnd;

      const diff = touchStart - touchEnd;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentIndex < tickets.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          setCurrentIndex(currentIndex - 1);
        }
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;
    currentTarget.dataset.touchStart = e.touches[0].clientX.toString();
  };

  const countdownTop = Math.min(
    Math.max(titleDistance / 2, 48),
    trackHeight - 48
  );
  const pad = (value: number) => value.toString().padStart(2, "0");
  const countdownText = `${countdown.days}д.${pad(countdown.hours)}:${pad(
    countdown.minutes
  )}:${pad(countdown.seconds)}`;

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-background via-background to-background overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
        style={{
          height: "65vh",
          minHeight: "280px",
          backgroundImage: "url('/images/bolids.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 25%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,1) 100%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 25%, rgba(0,0,0,0.9) 55%, rgba(0,0,0,1) 100%)",
        }}
        aria-hidden="true"
      ></div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"
        style={{ height: `${trackHeight}px` }}
      >
        <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl"></div>
          <div
            className="relative h-full w-full opacity-90 drop-shadow-[0_20px_40px_rgba(244,63,94,0.45)]"
            style={{
              background: "linear-gradient(120deg, #ff1a1ad5 0%, #7a0000 80%)",
              WebkitMaskImage: "url('/images/yasemarina.png')",
              maskImage: "url('/images/yasemarina.png')",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              transform: "rotate(51deg) scale(0.65)",
            }}
            aria-hidden="true"
          ></div>
          <p
            className="absolute left-1/2 -translate-x-1/2 text-center text-2xl font-black font-mono tracking-[0.25em] text-white"
            style={{
              top: `${countdownTop}px`,
              fontVariantNumeric: "tabular-nums",
              textShadow:
                "0 0 12px rgba(0,0,0,0.9), 0 6px 28px rgba(0,0,0,0.85), 0 0 55px rgba(0,0,0,0.7)",
            }}
          >
            {countdownText}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-6">
        <Header titleRef={headerTitleRef} />

        <div
          className={`w-full max-w-md transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div
            className="relative touch-pan-y select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleSwipe}
          >
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="w-full flex-shrink-0">
                    <TicketCard ticket={ticket} />
                  </div>
                ))}
              </div>
            </div>

            {/* Indicator dots */}
            <div className="flex justify-center gap-2 mt-4">
              {tickets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-primary w-8" : "bg-primary/30"
                  }`}
                  aria-label={`Билет ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
