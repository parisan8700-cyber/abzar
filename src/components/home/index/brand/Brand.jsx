"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  { name: "Samsung", src: "/img/brand1.webp" },
  { name: "Samsung", src: "/img/brand2.webp" },
  { name: "Microsoft", src: "/img/brand3.webp" },
  { name: "Asus", src: "/img/brand4.webp" },
  { name: "Microsoft", src: "/img/brand5.webp" },
  { name: "Asus", src: "/img/brand6.webp" },
];

export default function Brand() {
  return (
    <div className="overflow-hidden bg-gray-100 py-6 lg:max-w-[94rem] md:max-w-[46rem] sm:max-w-[43rem] max-[500]:max-w-[25rem] max-[430]:max-w-[23rem] max-[380]:max-w-[21rem]">
      <motion.div
        className="flex gap-12 items-center"
        animate={{ x: ["0%", "50%"] }}
        transition={{
          ease: "linear",
          duration: 15,
          repeat: Infinity,
        }}
      >
        {/* سه بار تکرار می‌کنیم تا همیشه پر باشه */}
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={brand.src}
              alt={brand.name}
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
