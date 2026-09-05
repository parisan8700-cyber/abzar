import NavigationBar from "@/components/shared/navigation/NavigationBar";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import InstallmentFloatingButton from "@/components/ui/InstallmentFloatingButton";

const kalameh = localFont({
  src: [
    {
      path: "./../../public/fonts/Kalameh/Kalameh-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./../../public/fonts/Kalameh/Kalameh-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./../../public/fonts/Kalameh/Kalameh-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./../../public/fonts/Kalameh/Kalameh-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./../../public/fonts/Kalameh/Kalameh-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./../../public/fonts/Kalameh/Kalameh-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./../../public/fonts/Kalameh/Kalameh-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./../../public/fonts/Kalameh/Kalameh-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./../../public/fonts/Kalameh/Kalameh-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--local-font-kalameh",
});

export const metadata = {
  metadataBase: new URL("https://abzarkashmar.ir"),

  manifest: "/manifest.webmanifest",
  
  title: {
    default: "ابزار کاشمر | فروشگاه اینترنتی ابزارآلات",
    template: "%s | ابزار کاشمر",
  },

  description:
    "فروشگاه اینترنتی ابزار کاشمر؛ خرید انواع ابزارآلات برقی، شارژی، بادی، دستی، جوش و برش، ابزار تعمیرگاهی و لوازم جانبی با بهترین قیمت، ارسال سریع و امکان خرید اقساطی.",

  keywords: [
    "ابزار کاشمر",
    "خرید ابزار",
    "ابزارآلات",
    "ابزار برقی",
    "ابزار شارژی",
    "ابزار بادی",
    "ابزار دستی",
    "جوش و برش",
    "دریل",
    "فرز",
    "بکس",
    "خرید اقساطی ابزار",
    "ابزار صنعتی",
  ],

  authors: [
    {
      name: "ابزار کاشمر",
    },
  ],

  creator: "ابزار کاشمر",

  publisher: "ابزار کاشمر",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "ابزار کاشمر",

    description:
      "خرید ابزارآلات برقی، شارژی، بادی، دستی و صنعتی با بهترین قیمت و امکان خرید اقساطی.",

    url: "https://abzarkashmar.ir",

    siteName: "ابزار کاشمر",

    locale: "fa_IR",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "فروشگاه اینترنتی ابزار کاشمر",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ابزار کاشمر",
    description:
      "خرید ابزارآلات با بهترین قیمت و امکان خرید اقساطی.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" className={`${kalameh.variable}`}>
      <body className={`antialiased`} suppressHydrationWarning>
        {children}
        <Toaster position="bottom-center" />
        <InstallmentFloatingButton />
        <NavigationBar />
      </body>
    </html>
  );
}
