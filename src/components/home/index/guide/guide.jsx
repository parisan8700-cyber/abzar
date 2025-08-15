"use client"

import Link from "next/link";

export default function Guide() {
    return (
        <Link href="/check">
            <div className="w-full bg-yellow-400 rounded-2xl my-6 text-center py-5 px-4 cursor-pointer transition hover:bg-yellow-300">
                <p className="text-lg md:text-2xl lg:text-3xl text-black flex items-center justify-center gap-2">
                    <span className="blink">«</span>
                    راهنمای خرید اقساطی به صورت چکی
                    <span className="blink">»</span>
                </p>
            </div>
            <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blink {
          animation: blink 1s infinite;
        }
      `}</style>
        </Link>
    );
}
