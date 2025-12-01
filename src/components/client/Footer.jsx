import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="border-t border-neutral-200 text-white bg-black ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img className="w-25 h-20" src="/src/assets/logo3.png" alt="" />
              <span className="text-lg bg-gradient-to-r from-[#121FCF] to-[#CF1512] bg-clip-text text-transparent font-semibold">TDSHOP</span>
            </div>
            <p className="mt-3  text-sm text-white">Thời trang tối giản cho mọi ngày.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold ">Sản phẩm</h4>
            <ul className="mt-3 space-y-2 text-md font-bold ">
              <li><a href="#new" className="hover:underline">Hàng mới</a></li>
              <li><a href="#men" className="hover:underline">Nam</a></li>
              <li><a href="#women" className="hover:underline">Nữ</a></li>
              <li><a href="#sale" className="hover:underline">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold ">Hỗ trợ</h4>
            <ul className="mt-3 space-y-2 text-md ">
              <li><a href="#" className="hover:underline">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:underline">Vận chuyển</a></li>
              <li><a href="#" className="hover:underline">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold">Kết nối</h4>
            <p className="mt-3 text-md ">Đăng ký nhận tin để không bỏ lỡ ưu đãi.</p>
            <form className="mt-3 flex gap-2">
              <input type="email" placeholder="Email của bạn" className="h-10 flex-1 rounded-md border border-neutral-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
            </form>
          </div>
        </div>
        <div className="mt-8 border-t flex items-center justify-center border-neutral-200 pt-6 text-xs text-neutral-500">© {new Date().getFullYear()} OutfitX. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer


