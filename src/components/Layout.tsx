import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomBar from "./MobileBottomBar";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="flex-1 pb-16 md:pb-0">{children}</main>
    <Footer />
    <MobileBottomBar />
  </div>
);

export default Layout;
