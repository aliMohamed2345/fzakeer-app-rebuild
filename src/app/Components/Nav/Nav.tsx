"use client";
import Theme from "./Theme";
import { navData } from "@/app/Data/Data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import QuranDetailsMenu from "./QuranDetailsMenu";
import SideMenu from "./SideMenu";
const Nav = () => {
  const path = usePathname();

  return (
    <header className=" shadow-md bg-primary fixed w-full z-10 ">
      <div className="mx-auto max-w-screen-xl px-2 sm:px-6 lg:px-8 ">
        <div className="flex h-16 items-center justify-between">
          <div className="hidden md:flex md:gap-5 md:flex-row-reverse">
            <div className="flex items-center gap-4 font-bold text-xl">
              {navData.mainData.map((navItem) => (
                <Link
                  key={navItem.id}
                  className={`p-2 font-bold rounded-md flex items-center gap-2 transition-all bg-transparent
    ${
      path === navItem.href
        ? "bg-secondary text-muted"
        : "hover:bg-secondary hover:text-muted active:bg-secondary active:text-muted" 
    }`}
                  href={navItem.href}
                >
                  {navItem.name}
                </Link>
              ))}
              <QuranDetailsMenu
                title="القران الكريم"
                QuranNavItems={navData.quranData}
              />
            </div>
            <Theme />
          </div>
          <div className="flex gap-2 sm:hidden">
            <SideMenu />
            <Theme/>
          </div>
          <Link href="/" className="text-3xl sm:text-4xl font-bold">
            فذكر
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Nav;
