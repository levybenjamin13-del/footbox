import "./globals.css";
import BottomNav from "@/components/bottom-nav";

export const metadata = {
  title: "Footbox",
  description: "La mémoire collective du football",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="mx-auto min-h-screen max-w-4xl px-4 pb-24 pt-6">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
