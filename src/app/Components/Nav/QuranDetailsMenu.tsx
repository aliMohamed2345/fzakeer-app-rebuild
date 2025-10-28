"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
interface QuranDetailsMenuProps {
  title: string;
  QuranNavItems: { id: number; name: string; href: string }[];
}
const QuranDetailsMenu = ({
  title = `القرآن الكريم`,
  QuranNavItems,
}: QuranDetailsMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={`p-2 font-bold rounded-md flex justify-between items-center gap-2 transition-all cursor-pointer hover:bg-secondary hover:text-muted active:text-muted active:bg-secondary`}
      >
        {title}
        <MdOutlineKeyboardArrowDown
          className={`transition-transform duration-300 ${
            isMenuOpen ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>

      {/* Animated dropdown menu */}
      <div
        className={`
          absolute left-1/2 -translate-x-1/2 bg-primary p-2 rounded-md w-[180px] text-center flex flex-col gap-2 shadow-lg z-50
          transition-all duration-300 ease-out origin-top
          ${
            isMenuOpen
              ? "opacity-100 translate-y-2 visible"
              : "opacity-0 -translate-y-2 invisible cursor-none"
          }
        `}
      >
        {QuranNavItems.map((navItem) => (
          <Link
            key={navItem.id}
            href={navItem.href}
            className="hover:text-muted hover:bg-secondary active:text-muted active:bg-secondary transition-colors p-0.5 rounded-md"
          >
            {navItem.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuranDetailsMenu;
