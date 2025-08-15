import { Divider } from "antd";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import Rating from "./components/Rating/Rating";
import { IProduct } from "@/app/lib/types/rootTypes";
import { BASE_URL } from "@/constant/Defaults";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import RelatedProducts from "./components/RelatedProductst";
import { getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

type Props = { params: { productId: string; locale: string } };

export default async function ProductDetailsPage({ ...rest }: Props) {
  const t = await getTranslations("common");

  const body = {
    length: 10,
    start: 0,
    filters: {
      uuid: rest?.params?.productId,
    },
  };

  let data = await fetch(`${BASE_URL}/client/product/fetch`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  let products: IRes<IProduct[]> = await data.json();
  const product = products?.data[0];
  const locale = rest?.params?.locale;

  // Helper function to get localized product data
  const getLocalizedValue = (enValue: string, bnValue?: string) => {
    return locale === "bn" && bnValue ? bnValue : enValue;
  };

  return (
    <div className='bg-white'>
      {/* Breadcrumb (optional) */}
      <div className='bg-gray-50 py-3 block sm:hidden'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <nav className='text-sm'>
            <ol className='list-none p-0 inline-flex'>
              <li className='flex items-center'>
                <a href='/' className='text-gray-500 hover:text-green-700'>
                  {t("home")}
                </a>
                <span className='mx-2 text-gray-400'>/</span>
              </li>
              {product?.category && (
                <li className='flex items-center'>
                  <a
                    href={`/category/${product.categoryId}`}
                    className='text-gray-500 hover:text-green-700'
                  >
                    {getLocalizedValue(
                      product.category.categoryName,
                      product.category.categoryNameBn,
                    )}
                  </a>
                  <span className='mx-2 text-gray-400'>/</span>
                </li>
              )}
              <li className='text-green-700'>
                {getLocalizedValue(product?.title, product?.titleBn)}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Product Content */}
      <section className='py-8 lg:py-12'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
            <ProductGallery product={product} />
            <ProductInfo product={product} locale={locale} />
          </div>
        </div>
      </section>

      {/* Product Description with Tabs */}
      <section className='py-8 bg-gray-50'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <ProductDescription product={products} locale={locale} />
        </div>
      </section>

      {/* Ratings Section */}
      <section className='py-8'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <Rating productId={rest?.params?.productId} />
        </div>
      </section>

      {/* Related Products */}
      <section className='py-8 bg-gray-50'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <RelatedProducts
            categoryId={product?.categoryId}
            currentProductId={product?.uuid}
          />
        </div>
      </section>
    </div>
  );
}
