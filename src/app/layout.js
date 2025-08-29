import ChatWidget from "./components/chatWidget";
import Navbar from "./components/navBar";
import { CartProvider } from "./context/cartContext";
// import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata = {
  title: "My Store",
  description: "Your Needs, Just a Click Away.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <CartProvider>
          <Navbar />
          <main
            className="container mx-auto p-6"
            style={{ paddingTop: "70px" }}
          >
            {children}
            <ChatWidget />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
