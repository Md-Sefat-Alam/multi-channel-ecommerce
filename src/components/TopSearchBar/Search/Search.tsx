"use client";
import { MotionContainer } from "@/components/common/MotionContainer";
import ProductCard from "@/components/Products/ProductCard";
import { BASE_URL } from "@/constant/Defaults";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Modal, Spin, Tabs } from "antd";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
const { TabPane } = Tabs;
import { useTranslations } from "next-intl";

export default function Search({}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const t = useTranslations("search");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSearchTerm("");
    setProducts([]);
    setBlogs([]);
  };

  const fetchSearchResults = async (term: any) => {
    if (!term) {
      setProducts([]);
      setBlogs([]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/client/search?term=${encodeURIComponent(term)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      setProducts(data.products || []);
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error("Search fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the search to limit API calls
  const debouncedSearch = debounce((value) => fetchSearchResults(value), 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  // We need to expose the showModal function to the mobile navigation
  // This can be done through a context or by lifting this state up
  // For this example, we'll attach it to the window object (not ideal but simple)
  useEffect(() => {
    // @ts-ignore
    window.showSearchModal = showModal;
    return () => {
      // @ts-ignore
      delete window.showSearchModal;
    };
  }, []);

  return (
    <>
      <div className='w-[30%] hidden sm:flex justify-start items-center'>
        <div
          className='bg-[#fafafa] w-full flex px-1 py-1 rounded-full border overflow-hidden max-w-md mx-auto font-[sans-serif] cursor-pointer'
          onClick={showModal}
        >
          <input
            type='text'
            placeholder={t("placeholder_readonly")}
            className='w-full outline-none bg-[#fafafa] pl-4 text-sm'
            readOnly
          />
          <button
            type='button'
            className='bg-[var(--secondary)] hover:bg-[var(--primary)] transition-all text-white text-sm rounded-full px-5 py-2.5'
          >
            {t("button")}
          </button>
        </div>
      </div>
      <Modal
        title={t("modal_title")}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={850}
        className='!my-[100px]'
      >
        <br />
        <div className='sticky top-4'>
          <MotionContainer>
            <Input
              placeholder={t("input_placeholder")}
              prefix={<SearchOutlined size={180} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='mb-4'
              size='large'
              allowClear
            />
          </MotionContainer>
          {loading ? (
            <div className='flex justify-center transition-all'>
              <MotionContainer>
                <Spin size='large' />
              </MotionContainer>
            </div>
          ) : (
            <></>
          )}
        </div>
        <MotionContainer>
          <Tabs defaultActiveKey='1'>
            <TabPane
              style={{ minHeight: 300 }}
              tab={t("products_tab", { count: products.length })}
              key='1'
            >
              {products.length > 0 ? (
                <>
                  <div className='py-4 grid xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 mx-2 sm:mx-0'>
                    {products?.map((product: any, productIndex) => (
                      <MotionContainer
                        key={product.uuid}
                        delay={Math.ceil(Math.random() * 5) * 0.04}
                      >
                        <ProductCard product={product} />
                      </MotionContainer>
                    ))}
                  </div>
                </>
              ) : (
                <p className='text-gray-500'>{t("no_products")}</p>
              )}
            </TabPane>
            <TabPane
              style={{ minHeight: 300 }}
              tab={t("blogs_tab", { count: blogs.length })}
              key='2'
            >
              {blogs.length > 0 ? (
                <div className='space-y-2'>
                  {blogs.map((blog: any) => (
                    <div
                      key={blog.uuid}
                      className='p-2 border rounded hover:bg-gray-100 transition'
                    >
                      <h3 className='text-sm font-semibold'>{blog.title}</h3>
                      <p className='text-xs text-gray-600 truncate'>
                        {blog.summary}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className='text-gray-500'>{t("no_blogs")}</p>
              )}
            </TabPane>
          </Tabs>
        </MotionContainer>
      </Modal>
    </>
  );
}
