"use client";

import Link from "next/link";
import Navbar from "../components/shared/navigation/Navbar";
import Footer from "../components/shared/footer/Footer";
import Breadcrumb from "../components/ui/Breadcrumb";

function Error({ reset }) {
  return (
    <>
      <Navbar />
      <div className="container">
        <Breadcrumb
          items={[
            { text: "صفحه اصلی", href: "/" },
            { text: "مشکل در وبسایت", href: "#" },
          ]}
        />
        <div className="flex flex-col gap-y-16 justify-center items-center">
          <h2 className="md:text-4xl font-medium text-gray-800 sm:text-2xl text-xl">
            مشکلی پیش اومده، لطفا دوباره تلاش کنید
          </h2>

          <div className="flex gap-4">
            <button
              onClick={reset}
              className="text-lg text-yellow-400 font-medium border border-yellow-400 py-2.5 px-4 rounded-xl cursor-pointer"
            >
              تلاش دوباره
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 sm:text-lg  bg-yellow-400 font-medium py-2.5 px-4 rounded-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g id="9">
                  <path
                    id="Union"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5713 3.42859H6.857V3.42882L6.857 3.42881L3.50628 6.79171L8.42978 11.6974L3.69217 15.5605V20.5714H8.43942V11.707L17.1937 20.4295L20.5444 17.0666L11.6213 8.17584H20.5713V3.42859Z"
                    fill="white"
                  ></path>
                </g>
              </svg>
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Error;
