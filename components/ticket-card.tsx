"use client";

import Image from "next/image";

interface TicketCardProps {
  ticket: {
    id: number;
    qrImage: string;
    bookingCode: string;
    date: string;
    time: string;
    hall: number;
    row: number;
    seats: number[];
  };
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="w-full bg-gradient-to-br from-card via-card to-card/80 rounded-2xl p-6 border border-primary/30 shadow-2xl overflow-hidden">
      {/* Top stripe accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary"></div>

      <div className="flex flex-col gap-4">
        {/* QR Code - Main focus */}
        <div className="flex flex-col items-center gap-2">
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <div className="relative w-36 h-36">
              <Image
                src={ticket.qrImage || "/placeholder.svg"}
                alt="QR Code"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            QR-Код
          </p>
        </div>

        {/* Main info section */}
        <div className="space-y-2 text-center">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide leading-tight">
                Дата и время
              </p>
              <p className="text-sm font-bold text-foreground leading-tight">
                {ticket.date} - {ticket.time}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide leading-tight">
                Место
              </p>
              <p className="text-sm font-bold text-foreground leading-tight">
                ТРЦ Галерея
              </p>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/50 rounded-lg py-3 px-1 mt-3 mb-2">
            <div className="flex justify-around gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Зал
                </p>
                <p className="text-xl font-bold text-primary">{ticket.hall}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Ряд
                </p>
                <p className="text-xl font-bold text-primary">{ticket.row}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                  Место
                </p>
                <p className="text-xl font-bold text-primary break-words">
                  {ticket.seats.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/20"></div>

        {/* Secondary info */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Бронирование
          </p>
          <p className="text-xs font-mono text-muted-foreground">
            {ticket.bookingCode}
          </p>
        </div>
      </div>
    </div>
  );
}
