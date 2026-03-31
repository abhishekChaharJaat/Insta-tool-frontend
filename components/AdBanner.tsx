"use client";

interface AdBannerProps {
  slot: "header" | "sidebar" | "in-content";
  className?: string;
}

const FLIPKART_ADS = [
  {
    label: "SALE",
    labelColor: "bg-yellow-400 text-yellow-900",
    title: "Samsung Galaxy S24 Ultra",
    desc: "12GB RAM · 256GB · Titanium Black",
    price: "₹1,09,999",
    original: "₹1,29,999",
    discount: "15% off",
    tag: "Flipkart Assured",
  },
  {
    label: "BIG DEAL",
    labelColor: "bg-blue-500 text-white",
    title: "boAt Airdopes 141",
    desc: "42H Playtime · ENx™ Tech · Bluetooth 5.1",
    price: "₹999",
    original: "₹4,990",
    discount: "80% off",
    tag: "Free Delivery",
  },
  {
    label: "HOT",
    labelColor: "bg-orange-500 text-white",
    title: "Nike Air Max 270",
    desc: "Men's Running Shoes · Size 6–11",
    price: "₹7,495",
    original: "₹12,495",
    discount: "40% off",
    tag: "Flipkart Assured",
  },
];

export function AdBanner({ slot, className = "" }: AdBannerProps) {
  const ad = FLIPKART_ADS[Math.floor(Math.random() * FLIPKART_ADS.length)];

  if (slot === "in-content") {
    return (
      <div className={`w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 ${className}`}>
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-3 bg-[#2874f0]">
          <span className="text-white font-bold text-sm sm:text-xl tracking-tight">flipkart</span>
          <span className="text-[10px] sm:text-xs text-blue-200 italic">Sponsored</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 px-3 py-2 sm:px-5 sm:py-3 bg-white dark:bg-zinc-900">
          <div className="w-8 h-8 sm:w-14 sm:h-14 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg sm:text-3xl shrink-0">🛍️</div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate">{ad.title}</p>
            <p className="text-[10px] sm:text-xs text-zinc-500 truncate hidden sm:block">{ad.desc}</p>
            <div className="flex items-center gap-1 sm:gap-2 mt-0.5">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">{ad.price}</span>
              <span className="text-[10px] sm:text-xs text-zinc-400 line-through">{ad.original}</span>
              <span className="text-[10px] sm:text-xs text-green-600 font-semibold">{ad.discount}</span>
            </div>
          </div>
          <a href="#" onClick={(e) => e.preventDefault()}
            className="shrink-0 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#ff9f00] text-white text-[10px] sm:text-xs font-bold hover:bg-[#e88e00] transition-colors">
            Buy Now
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 ${className}`}>
      <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2.5 bg-[#2874f0]">
        <span className="text-white font-bold text-sm sm:text-lg tracking-tight">flipkart</span>
        <span className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full ${ad.labelColor}`}>{ad.label}</span>
        <span className="text-[10px] sm:text-xs text-blue-200 italic ml-auto">Sponsored</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 px-3 py-2 sm:px-4 sm:py-3 bg-white dark:bg-zinc-900">
        <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg sm:text-2xl shrink-0">🛍️</div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 truncate">{ad.title}</p>
          <p className="text-[10px] sm:text-xs text-zinc-500 truncate hidden sm:block">{ad.desc}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">{ad.price}</p>
          <p className="text-[10px] sm:text-xs text-green-600 font-semibold">{ad.discount}</p>
        </div>
        <a href="#" onClick={(e) => e.preventDefault()}
          className="shrink-0 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#ff9f00] text-white text-[10px] sm:text-xs font-bold hover:bg-[#e88e00] transition-colors">
          Buy
        </a>
      </div>
    </div>
  );
}
