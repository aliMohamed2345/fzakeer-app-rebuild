import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface AlertProps {
  title: string;
  description: string;
  timer?: number; // seconds
  onClose?: () => void; // callback to notify parent
}

const Alert = ({ title, description, timer = 2, onClose }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.(); // remove from DOM after animation ends
      }, 500); // match duration-500 below
    }, timer * 1000);

    return () => clearTimeout(timeout);
  }, [timer, onClose]);

  return (
    <div
      className={`fixed right-4 bottom-5 z-50 transition-all duration-500 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
      }`}
    >
      <div className="relative bg-destructive text-destructive-foreground p-4 rounded-md min-w-[300px] border border-background shadow-lg">
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 500);
          }}
          className="absolute top-2 left-2 p-1 hover:bg-muted rounded-full transition-all"
        >
          <IoClose />
        </button>
        <div className="flex flex-col gap-2 text-right">
          <p className="text-lg font-bold">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
