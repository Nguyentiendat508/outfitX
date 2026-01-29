import { useContext, useMemo } from "react";
import { BlogContext } from "../../../contexts/BlogProvider";
import { Link, useParams } from "react-router-dom";

export default function BlogDetail() {
  const blogs = useContext(BlogContext);
  const { id } = useParams();
  const blog = useMemo(() => {
    return blogs?.find((b) => b.id == id);
  }, [id, blogs]);
  const StringConvert = (str) => {
    const arrayString = str?.split(".");
    return arrayString?.map((item) => <div>{item}</div>);
  };
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* BREADCRUMB */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
            <img
              src={blog?.imgUrl}
              alt="blog cover"
              className="w-full rounded mb-8"
            />
            <p className="text-lg text-gray-700 mb-6">
              {StringConvert(blog?.content)}
            </p>
            <div className="space-y-8 text-gray-800 leading-7">
              <section id="item-1">
                <h2 className="text-xl font-bold mb-2">
                  1. Phối áo thun đen và quần tây xám
                </h2>
                <p>
                  Sự kết hợp giữa áo thun đen và quần tây xám mang lại vẻ ngoài
                  lịch lãm, phù hợp đi làm hoặc đi chơi.
                </p>
              </section>

              <section id="item-2">
                <h2 className="text-xl font-bold mb-2">
                  2. Phối áo thun trắng nam và jeans xanh
                </h2>
                <p>
                  Outfit basic nhưng không bao giờ lỗi mốt, phù hợp mọi hoàn
                  cảnh.
                </p>
              </section>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 border rounded-lg p-4 bg-white shadow">
              <h3 className="font-bold mb-3">Nội dung bài viết</h3>
              <ul className="space-y-2 text-sm text-blue-600 max-h-[400px] overflow-y-auto">
                {blogs.map((item, index) => (
                  <Link to={`/blogDetail/${item.id}`}>
                    <li key={index} className="cursor-pointer hover:underline">
                      {index + 1}. {item.title}
                    </li>
                  </Link>
                ))}
              </ul>
              <Link to="/blog">
                <button
                  className="p-2 mt-4 bg-black text-white text-xs font-semibold rounded-md cursor-pointer"
                >
                  Tất Cả Bài Viết
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
