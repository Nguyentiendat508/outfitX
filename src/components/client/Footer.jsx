function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded-full bg-black text-white grid place-items-center font-bold">OX</span>
              <span className="text-lg font-semibold">OutfitX</span>
            </div>
            <p className="mt-3 text-sm text-neutral-600">Thời trang tối giản cho mọi ngày.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Sản phẩm</h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li><a href="#new" className="hover:underline">Hàng mới</a></li>
              <li><a href="#men" className="hover:underline">Nam</a></li>
              <li><a href="#women" className="hover:underline">Nữ</a></li>
              <li><a href="#sale" className="hover:underline">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-sm text-neutral-600">
              <li><a href="#" className="hover:underline">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:underline">Vận chuyển</a></li>
              <li><a href="#" className="hover:underline">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Kết nối</h4>
            <p className="mt-3 text-sm text-neutral-600">Đăng ký nhận tin để không bỏ lỡ ưu đãi.</p>
            <form className="mt-3 flex gap-2">
              <input type="email" placeholder="Email của bạn" className="h-10 flex-1 rounded-md border border-neutral-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
              <button className="h-10 rounded-md bg-black px-4 text-sm font-semibold text-white">Đăng ký</button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-200 pt-6 text-xs text-neutral-500">© {new Date().getFullYear()} OutfitX. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer


