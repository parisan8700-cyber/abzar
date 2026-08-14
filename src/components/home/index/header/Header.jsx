import Image from "next/image";

export default function Header() {

  return (
    <div className="w-full relative">
              <div className="relative w-full aspect-[1920/680] min-h-[170px] overflow-hidden">
                <Image
                  src="/img/mainBaner21.png"
                  alt="banner"
                  fill
                  className="rounded-3xl "
                />
            </div>
    </div>
  );
}
