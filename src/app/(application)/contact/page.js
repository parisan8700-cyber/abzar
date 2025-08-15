
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Instagram, Send } from "lucide-react";


export default function Contact() {

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { text: "صفحه اصلی", href: "/" },
          { text: "تماس با ما", href: "/contact-us" },
        ]}
      />

      <section className="py-10" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-30">

          <div className="bg-white p-6 rounded-xl shadow-md text-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">شما عزیزان می‌توانید با سه روش با ما ارتباط برقرار کنید:</h3>
            <ol className="list-decimal pr-5 space-y-3 leading-7">
              <li>
                <strong>روش اول:</strong> می‌توانید به صورت حضوری به آدرس:<br />
                کاشمر، بلوار فروتقه، بعد از امام‌رضا(ع)15 مراجعه کنید.
              </li>
              <li>
                <strong>روش دوم:</strong> اگر نتوانستید به صورت حضوری به فروشگاه تشریف بیارید می‌توانید با شماره تماس <a href="tel:09151203083" className="text-blue-600 hover:underline">09151203083</a> تماس بگیرید.
              </li>
              <li>
                <strong>روش سوم:</strong> شما عزیزان می‌توانید به اینستاگرام ما به آیدی <a href="https://instagram.com/abzar-kashmar" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">@abzar-kashmar</a> پیام دهید و از آنجا با ما در ارتباط باشید.
              </li>
            </ol>
          </div>


          {/* متن و اطلاعات تماس */}
          <div className="flex flex-col gap-6 justify-center">
            <h2 className="text-2xl font-bold">
              با ما در <span className="text-yellow-400">ارتباط</span> باش !
            </h2>
            <p className="text-sm leading-7 text-gray-800">
              برای ارتباط باما می توانید از روش های نام برده استفاده کنید.
            </p>

            <div className="flex flex-col gap-4 text-sm text-black">
              <div>
                <strong>آدرس</strong>
                <br /> کاشمر، بلوار فروتقه، بعد از امام‌رضا(ع)15
              </div>
              <div>
                <strong>شماره</strong>
                <br /> 09151203083
              </div>
              <div>
                <strong>شماره</strong>
                <br /> 09151203083
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <a href="https://t.me/yourchannel" className="text-xl text-black hover:text-[#229ED9]" target="_blank" rel="noopener noreferrer">
                <Send size={24} />
              </a>
              <a href="https://instagram.com/yourprofile" className="text-xl text-black hover:text-[#E1306C]" target="_blank" rel="noopener noreferrer">
                <Instagram size={24} />
              </a>
            </div>


          </div>
        </div>
      </section>

    </div>
  );
}
