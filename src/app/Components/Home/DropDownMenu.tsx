"use client";
import { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropDownMenuProps {
  options: string[];
  initialValue?: string;
  onSelect?: (value: string) => void;
  className?: string;
}

const DropDownMenu = ({
  options,
  initialValue = "اختر فئة",
  onSelect,
  className = "",
}: DropDownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialValue);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className={`relative inline-block text-right w-60 sm:w-72 ${className}`}
    >
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-muted border border-primary text-primary font-bold rounded-lg px-4 py-3 text-base sm:text-lg transition-all flex items-center justify-between hover:bg-primary hover:text-muted active:bg-primary active:text-muted cursor-pointer`}
      >
        <span>{selected}</span>
        <IoIosArrowDown
          className={` hover:text-muted transition-transform duration-300 ${
            isOpen && "rotate-180 "
          }`}
          size={20}
        />
      </button>

      {/* Dropdown content */}
      <div
        className={`absolute right-0 mt-2 w-full bg-background border border-secondary rounded-lg shadow-md overflow-hidden transition-all duration-300 z-20 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(opt)}
            className="w-full text-center px-4 py-3 font-semibold text-primary bg-background hover:bg-primary hover:text-muted active:bg-primary active:text-muted transition-all border-b border-primary last:border-none cursor-pointer"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropDownMenu;
