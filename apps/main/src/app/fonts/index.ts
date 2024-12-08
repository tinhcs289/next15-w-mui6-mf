import localFont from "next/font/local";

const geistSans = localFont({
  src: "./GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const FONT_CLASS_NAMES = [geistSans, geistMono].map(f => f.variable).join(' ');