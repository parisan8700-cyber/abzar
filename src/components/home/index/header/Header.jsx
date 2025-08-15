import Image from "next/image";

export default function Header() {

  return (
    <div className="w-full relative">
              <div className="relative w-full aspect-[1920/750] min-h-[350px] overflow-hidden">
                <Image
                  src="/img/banner.png"
                  alt="banner"
                  fill
                  className="rounded-3xl"
                />
              </div>
    </div>
  );
}
