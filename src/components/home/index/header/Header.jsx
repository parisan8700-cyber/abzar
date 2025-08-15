"use client"
import Image from "next/image";

export default function Header() {
  return (
    <div
      className="w-full relative rounded-3xl overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[450px] bg-red-500 px-4"
      style={{
        backgroundImage: `url('/img/banner2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* استیکر اول */}
      <div className="absolute top-8 sm:top-20 left-6 sm:left-20 w-24 h-29 sm:w-[20rem] sm:h-[20rem]">
        <Image
          src="/img/sticker1.png"
          alt="sticker 1"
          fill
          className="object-contain"
        />
      </div>

      {/* متن بولد */}
      <p className="blink text-white text-4xl sm:text-5xl lg:text-7xl font-bold z-10 text-center leading-tight whitespace-pre-line">
        تو یک دقیقه{"\n"}
        ابزارتو قسطی بخر!
      </p>
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .blink {
          animation: blink 1.5s infinite;
        }
      `}</style>

      {/* استیکر دوم */}
      <div className="absolute bg-white rounded-2xl rounded-tl-[3rem] sm:rounded-tl-[7rem] bottom-5 right-5 w-40 h-23 sm:w-[18rem] sm:h-[10rem] shadow-2xl shadow-amber-600">
        <Image
          src="/img/sticker2.png"
          alt="sticker 2"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
