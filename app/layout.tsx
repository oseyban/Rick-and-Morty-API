import "./globals.css";
import type { Metadata } from "next";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Rick and Morty API",
  description: "Rick and Morty characters",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
