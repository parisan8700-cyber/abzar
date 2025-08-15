import { ArrowUpLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const banners = [
  {
    image: '/img/banerr.png',
    icon: '/img/1.png',
    title: 'مجبوب ترین برندها',
    subtitle: 'درابزار آلات کاشمر',
  },
  {
    image: '/img/banerr.png',
    icon: '/img/3.png',
    title: "تجربه ای متفاوت باخرید",
    subtitle: 'از ابزارکاشمر...',
  },
  {
    image: '/img/banerr.png',
    icon: '/img/2.png',
    title: 'هرچیزی که نیاز داری',
    subtitle: 'اینجا هست...',
  },
];

export default function Banner() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {banners.map((banner, i) => (
        <div key={i} className="relative rounded-2xl overflow-hidden shadow-lg h-40 sm:h-42">
          {/* تصویر اصلی */}
          <Image
            src={banner.image}
            alt="banner"
            width={800}
            height={400}
            priority
            className="object-cover w-full h-full"
          />

          {/* آیکون روی تصویر */}
          {banner.icon && (
            <Image
              src={banner.icon}
              alt="icon"
              width={130}
              height={130}
              priority
              className="absolute top-5 md:top-2 left-10 md:w-[160px] md:h-[160px]"
            />
          )}

          {/* متن و دکمه */}
          <div className="absolute inset-0 flex flex-col justify-center items-right pr-6 text-black">
            <h2 className="text-lg md:text-2xl font-bold mb-2 drop-shadow-sm text-white">{banner.title}</h2>
            <p className="text-lg md:text-2xl mb-4 drop-shadow-sm text-gray-200">{banner.subtitle}</p>
            <Link href="/shop">
              <button className="bg-black flex w-44 gap-2 hover:bg-yellow-400 hover:text-black text-white px-4 py-2 rounded-full text-sm hover:bg-opacity-80 transition">
                همین حالا خریدکن
                <ArrowUpLeft />
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
