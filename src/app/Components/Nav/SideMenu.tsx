"use client";
import { useState } from "react";
import { PiListBold } from "react-icons/pi";
import { IoArrowBackSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosArrowUp } from "react-icons/io";
import { navData } from "@/app/Data/Data";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState<boolean>(false);
  const path = usePathname();

  const closeSideMenu = () => {
    setIsCategoryListOpen(false);
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="p-2  rounded-full transition-all ease-in-out hover:bg-secondary active:bg-secondary font-bold sm:hidden opacity-80 cursor-pointer"
      >
        <PiListBold size={25} />
      </button>

      <div
        className={`h-full fixed ${
          isOpen ? `left-0` : `left-[-500px]`
        } min-w-[250px] lg:min-w-[300px] z-10 top-0 transition-all bg-muted flex-col shadow-lg flex justify-start gap-6`}
      >
        <div className="flex content-start gap-3 items-center my-5 ml-4">
          <button
            onClick={closeSideMenu}
            aria-label="Close menu"
            className="hover:bg-secondary hover:text-muted active:bg-secondary active:text-muted cursor-pointer rounded-full transition-all p-1"
          >
            <IoArrowBackSharp size={25} />
          </button>

          <div className="text-center">
            <Link href="/" className="text-3xl font-bold">
              <span className=" bg-clip-text ">فذكر</span>
            </Link>
          </div>
        </div>
        <ul className="space-y-2">
          {navData.mainData.map((navItem) => (
            <Link
              onClick={closeSideMenu}
              key={navItem.id}
              href={navItem.href}
              className={`flex ${
                path === navItem.href && `bg-secondary text-muted`
              } items-center justify-start gap-3 rounded-lg p-2 font-bold hover:bg-secondary hover:text-muted active:bg-secondary active:text-muted transition-all mx-4 text-lg `}
            >
              {navItem.name}
            </Link>
          ))}
          <div className="mx-4">
            <div
              onClick={() => setIsCategoryListOpen((prev) => !prev)}
              className={`flex items-center justify-between gap-2 ${isCategoryListOpen?`rounded-t-xl bg-secondary text-muted`:`rounded-xl`} p-2 font-bold hover:bg-secondary hover:text-muted active:bg-secondary active:text-muted transition-all text-lg cursor-pointer`}
            >
              <span>القران</span>
              <IoIosArrowUp
                className={`transition-all ${
                  isCategoryListOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            <div
              className={`transition-all duration-300 ease-in-out transform origin-top overflow-hidden rounded-b-md ${
                isCategoryListOpen
                  ? "opacity-100 scale-y-100 max-h-96"
                  : "opacity-0 scale-y-0 max-h-0"
              }`}
            >
              <div className="flex flex-col gap-2 bg-secondary p-2 text-lg text-muted">
                {navData.quranData.map((navItem) => (
                  <Link
                    onClick={closeSideMenu}
                    key={navItem.id}
                    href={`${navItem.href}`}
                    className={`p-2 font-bold hover:bg-primary active:bg-primary rounded-md  ${
                      path.includes(`${navItem.href}`) && `bg-primary`
                    }`}
                  >
                    {navItem.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ul>
      </div>
      {
        // Overlay for the side menu
        isOpen && (
          <div
            onClick={closeSideMenu}
            className="fixed inset-0 bg-black/50 z-5"
          ></div>
        )
      }
    </>
  );
};
export default SideMenu;
