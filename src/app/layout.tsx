import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CHRONO-PMI // Simulador Táctico de Dirección de Proyectos",
  description:
    "Novela gráfica interactiva de decisiones en gestión de proyectos con estética anime Gainax. Sector Privado y Sector Público.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full bg-[#090b10] text-zinc-100 font-sans selection:bg-amber-500/30 selection:text-amber-200 flex flex-col">
        {children}
      </body>
    </html>
  );
}
