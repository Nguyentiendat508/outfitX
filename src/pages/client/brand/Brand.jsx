import { useContext, useMemo, useState } from "react";
import { BrandsContext } from "../../../contexts/BrandsProvider";
import { ProductsContext } from "../../../contexts/ProductProvider";
import { useParams } from "react-router-dom";
import { MdOutlineShoppingCart } from "react-icons/md";
import { getOjectById } from "../../../services/reponsive";

export default function Brand() {
  const brands = useContext(BrandsContext);
  const products = useContext(ProductsContext);
  const { id } = useParams();
  const [idBrand,setIdBrand] = useState(id);
  const oldBrand = useMemo(() => {
    return products?.filter((p) => idBrand == p.id_brand);
  }, [idBrand, products]);
  const proBrand = (c) => {
    const outBrand = products?.filter((p) => c.id == p.id_brand);
    return outBrand.length;
  };
  return (
    <div className="max-w-7xl mx-auto px-4 pb-10 mt-5">
      <div className="text-sm text-gray-500 mb-4">
        Trang chủ / <span className="text-black font-medium">{getOjectById(brands, idBrand)?.name}</span>
      </div>

      <div className="grid grid-cols-12 gap-20 mt-5">
        <div className="col-span-3">
          <h3 className="font-bold mb-4">Thương Hiệu</h3>
          <ul className="space-y-3 text-sm cursor-pointer font-semibold">
            {brands.map((c, i) => (
              <li
                key={i}
                onClick={() => setIdBrand(c.id)}
                className={`flex justify-between hover:text-black ${c.id == idBrand ? "text-red-500" : "text-gray-500"}`}
              >
                <span>{c.name}</span>
                <span className="text-gray-400">{proBrand(c)}</span>
              </li>
            ))}
          </ul>
        </div>
        <section className="col-span-9">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{getOjectById(brands, idBrand)?.name}</h1>
            <div className="text-sm flex items-center gap-2 cursor-pointer">
              ⇅ <span>Phổ biến</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {oldBrand.map((p) => (
              <div className="relative mt-3 bg-white shadow-md hover:shadow-xl transition overflow-hidden">
                <img
                  src={p.imgUrls[0]}
                  alt={p.name}
                  className="w-50 h-50"
                />
                <div className="p-3">
                  <h3 className="text-xs font-semibold min-h-[40px] leading-5">
                    {p.name}
                  </h3>

                  <span className="text-xs bg-gray-100 border rounded px-2 py-1 inline-block mt-2">
                    Hàng Mới
                  </span>

                  <p className="text-red-600 font-bold text-lg mt-2">
                    {parseInt(p.price).toLocaleString("vi-VN")}₫
                  </p>

                  <p className="text-gray-400 text-xs line-through -mt-1">
                    {p.discount}
                  </p>
                </div>

                {/* --- CART ICON --- */}
                <div className="absolute bottom-3 right-3 text-gray-600">
                  <MdOutlineShoppingCart size={20} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
