import Footer from "../../components/shared/footer/Footer";
import Navbar from "../../components/shared/navigation/Navbar";

export default function ApplicationLayout({ children }) {
  return (
    <div className="px-4 w-full max-w-[1440px] min-w-[375px] mx-auto" dir="rtl">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}


