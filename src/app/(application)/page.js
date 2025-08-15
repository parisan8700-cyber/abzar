import CategorySlider from "@/components/home/index/categorySlider/CategorySlider";
import Baner from "../../components/home/index/baner/baner";
import Best from "../../components/home/index/best/best";
import Header from "../../components/home/index/header/Header";
import New from "../../components/home/index/new/New";
import Offer from "../../components/home/index/offer/Offer";
import Brand from "@/components/home/index/brand/Brand";
import Guide from "@/components/home/index/guide/guide";
import BArg from "@/components/home/index/barg/barg";
import Bady from "@/components/home/index/bady/bady";
import Tamir from "@/components/home/index/tamir/tamir";
import Jush from "@/components/home/index/jush/jush";

export default async function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen font-kalameh">
      <Header />
      <Guide />
      <CategorySlider/>
      <Offer/>
      <Best/>
      <Baner />
      <New/>
      <BArg />
      <Bady />
      <Tamir />
      <Jush />
      <Brand />
    </div>
  );
}