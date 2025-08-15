import { serverFetch } from "@/app/common/fetchingData/serverSideFetch";

type Props = {};

export default async function ViewArticle({}: Props) {
  const data = await serverFetch<any[]>("/admin/farmingBlog/allBlogs", "GET");
  return (
    <section className="">
      <div className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            Farming Blogs
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {data?.data?.map((blog: any) => (
              <div
                key={blog.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  {blog.title}
                </h2>
                <img
                  src={`http://localhost:5000/api/uploads/imageUrl/${blog.imageUrl}`}
                  alt={blog.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-5">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
