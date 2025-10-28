"use client";

import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
      <FaExclamationTriangle className="text-destructive w-16 h-16 mb-6 animate-bounce" />
      <h1 className="text-xl sm:text-5xl font-bold mb-4 text-primary text-center">الصفحة غير موجودة</h1>
      <p className="text-lg text-muted-foreground mb-6 text-center max-w-md">
        عذرًا، الصفحة التي تحاول الوصول إليها غير متوفرة أو قد تم نقلها.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-secondary active:bg-secondary transition-all"
      >
        العودة إلى الصفحة الرئيسية
      </Link>
    </section>
  );
}
