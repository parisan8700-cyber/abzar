import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <div className="py-6 flex items-center gap-x-1 text-gray-500 font-medium">
      {items.map((item, i) => (
        <div key={item.href} className="flex items-center gap-x-1">
          <Link
            href={item.href}
            className={`transition-colors duration-200 hover:text-yellow-400 ${i + 1 === items.length ? "text-black font-semibold" : ""
              }`}
          >
            {item.text}
          </Link>


          {i + 1 !== items.length && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="#6a7282"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
