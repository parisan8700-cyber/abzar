import Link from "next/link";
import Navbar from "../components/shared/navigation/Navbar";
import Footer from "../components/shared/footer/Footer";
import BackToLastPageBtn from "../components/error/BackToLastPageBtn";

export default function Notfound() {
  return (
    <div dir="rtl">
      <Navbar />
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col gap-y-10 md:gap-y-16 justify-center items-center text-center min-h-[60vh]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-800 leading-snug">
            صفحه مورد نظر پیدا نشد
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <BackToLastPageBtn />
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-base sm:text-lg bg-yellow-400 text-white font-medium py-2.5 px-4 rounded-xl hover:bg-yellow-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.5713 3.42859H6.857V3.42882L6.857 3.42881L3.50628 6.79171L8.42978 11.6974L3.69217 15.5605V20.5714H8.43942V11.707L17.1937 20.4295L20.5444 17.0666L11.6213 8.17584H20.5713V3.42859Z"
                  fill="white"
                ></path>
              </svg>
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
