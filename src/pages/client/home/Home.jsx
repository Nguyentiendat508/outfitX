import React, { useState } from "react";
import Header from "../../../components/client/Header";
import ClientRouters from "../../../routers/ClientRouters";
import Footer from "../../../components/client/Footer";

function Home() {
  const [openCart, setOpenCart] = useState(false);
  return (
    <div>
      <Header openCart={openCart} setOpenCart={setOpenCart} />
      {openCart && (
        <div className="fixed inset-0 z-10 bg-black/50 top-[133px]"></div>
      )}
        <ClientRouters />
      <Footer />
    </div>
  );
}

export default Home;
