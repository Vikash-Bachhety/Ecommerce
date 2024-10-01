import { Outlet } from "react-router-dom";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { AuthProvider } from "./component/AuthContext";
import ScrollToTop from "./component/ScrollToTop";
import MyProducts from "./component/MyProducts";

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <MyProducts />
      <Navbar />
      <Outlet />
      <Footer />
    </AuthProvider>
  );
}
