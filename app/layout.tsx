import type { Metadata } from "next";
import "./globals.css";
import { GaruchanFloat } from "@/components/garuchan-float";

export const metadata: Metadata = {
  title: "Garoop Data",
  description: "GaroopのJSONデータ公開用プロジェクト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
        <GaruchanFloat />
      </body>
    </html>
  );
}
