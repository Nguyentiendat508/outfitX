import { useContext } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "../../../contexts/BlogProvider";

export default function Blog() {
  const blog = useContext(BlogContext);

  if (!blog || blog.length === 0) {
    return <div className="text-center py-10">Không có bài viết nào</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-sm text-gray-500 mb-4">
        Trang chủ / <span className="text-black">Tất cả bài viết</span>
      </p>

      <h1 className="text-3xl font-bold mb-8">Tất cả bài viết</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blog.map((item) => (
          <Link
            key={item.id}
            to={`/blogDetail/${item.id}`}
            className="group"
          >
            <div className="overflow-hidden">
              <img
                src={item.imgUrl}
                alt={item.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            <div className="bg-white mx-4 -mt-10 p-4 relative z-10 shadow-lg">
              <h3 className="font-bold line-clamp-2 h-[48px] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 h-[40px] line-clamp-2 mb-3">
                {item.content}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t">
                <span className="text-xs">📅 {item.creatAt.toDate().toLocaleString()}</span>
                <span className="font-medium hover:underline">
                  Xem thêm »
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}