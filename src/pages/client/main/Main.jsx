import React from 'react';
import Carousel from '../carousel/Carousel';
function ProductCard({ image, title, price, badge }) {
  return (
    <a href="#" className="group block">
      <div className="relative overflow-hidden rounded-xl border border-neutral-200">
        {badge && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {badge}
          </span>
        )}
        <img src={image} alt={title} className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-neutral-900">{title}</h3>
          <span className="text-sm font-semibold">{price}</span>
        </div>
        <p className="mt-1 text-xs text-neutral-500">Free size • Unisex</p>
      </div>
    </a>
  )
}
function Main() {
      const products = [
    { image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1640&auto=format&fit=crop", title: "Áo thun basic", price: "249.000đ", badge: "New" },
    { image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1640&auto=format&fit=crop", title: "Áo sơ mi linen", price: "399.000đ" },
    { image: "https://images.unsplash.com/photo-1520975693411-b39e99a6d63a?q=80&w=1640&auto=format&fit=crop", title: "Quần jean slim", price: "549.000đ" },
    { image: "https://images.unsplash.com/photo-1520975582033-6c3c63f22c65?q=80&w=1640&auto=format&fit=crop", title: "Váy midi tôn dáng", price: "629.000đ", badge: "Hot" },
    { image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1640&auto=format&fit=crop", title: "Áo khoác denim", price: "699.000đ" },
    { image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1640&auto=format&fit=crop", title: "Giày sneaker retro", price: "899.000đ" },
    { image: "https://images.unsplash.com/photo-1520975804745-4e855d255f8b?q=80&w=1640&auto=format&fit=crop", title: "Áo polo dệt mịn", price: "329.000đ" },
    { image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1640&auto=format&fit=crop", title: "Túi tote vải", price: "159.000đ", badge: "-20%" }
  ]
    return (
          <main>
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img
            src="/public/video 4k.mp4"
            alt="bg"
            className="hidden"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Thời trang tối giản, tôn dáng mỗi ngày
              </h1>
              <p className="mt-4 text-neutral-600">
                Chất liệu thoáng mát, phom dáng chuẩn, dễ phối mọi hoàn cảnh. Bộ sưu tập mới đã lên kệ.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#new" className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white">
                  Mua ngay
                </a>
                <a href="#sale" className="inline-flex items-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold">
                  Ưu đãi tháng này
                </a>
              </div>
            </div>
            <div className="relative">
              <Carousel/>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 shadow border text-xs font-medium">
                OutfitX • Sáng xịn mịn
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="new" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold">Hàng mới về</h2>
            <p className="text-sm text-neutral-600">Cập nhật mỗi tuần</p>
          </div>
          <a href="#" className="text-sm font-semibold hover:underline">Xem tất cả</a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid gap-6 md:grid-cols-3">
          <a href="#men" className="group relative overflow-hidden rounded-2xl">
            <img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1640&auto=format&fit=crop" alt="Men" className="aspect-[5/3] w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold">Bộ sưu tập Nam</span>
          </a>
          <a href="#women" className="group relative overflow-hidden rounded-2xl">
            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1640&auto=format&fit=crop" alt="Women" className="aspect-[5/3] w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold">Bộ sưu tập Nữ</span>
          </a>
          <a href="#sale" className="group relative overflow-hidden rounded-2xl">
            <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1640&auto=format&fit=crop" alt="Sale" className="aspect-[5/3] w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white font-semibold">Sale sốc</span>
          </a>
        </div>
      </section>
    </main>
    );
}

export default Main;