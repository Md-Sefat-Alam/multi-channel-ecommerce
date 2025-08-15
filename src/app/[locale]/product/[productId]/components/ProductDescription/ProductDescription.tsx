"use client";
import { IProduct } from "@/app/lib/types/rootTypes";
import InRichTextViewQuill from "@/components/common/FormItems/InRichTextViewQuill";
import type { TabsProps } from "antd";
import { Table, Tabs } from "antd";
import { useTranslations } from "next-intl";

type Props = { product: IRes<IProduct[]>; locale: string };

export default function ProductDescription({ product: data, locale }: Props) {
  const product = data?.data[0];
  const t = useTranslations("product");

  // Helper function to get localized product data
  const getLocalizedValue = (enValue: string, bnValue?: string) => {
    return locale === "bn" && bnValue ? bnValue : enValue;
  };

  const {
    description = "",
    descriptionBn = "",
    tags = [],
    tagsBn = [],
    unitType,
    stock = 0,
  } = product || {};

  const productDescription = getLocalizedValue(description, descriptionBn);
  const productTags = locale === "bn" && tagsBn?.length ? tagsBn : tags;

  // Format product specifications
  const specs = [
    {
      key: t("specifications.stockStatus"),
      value: stock > 0 ? t("stockStatus.inStock") : t("stockStatus.outOfStock"),
    },
    {
      key: t("specifications.unitType"),
      value:
        t(`unitTypes.${unitType}`) !== `unitTypes.${unitType}`
          ? t(`unitTypes.${unitType}`)
          : unitType,
    },
  ];

  if (productTags?.length) {
    specs.push({
      key: t("specifications.tags"),
      value: productTags.join(", "),
    });
  }

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("tabs.description"),
      children: (
        <div className='py-4'>
          {productDescription ? (
            <InRichTextViewQuill content={productDescription} />
          ) : (
            <p className='text-gray-600'>{t("noDescriptionAvailable")}</p>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: t("tabs.specifications"),
      children: (
        <div className='py-4'>
          <Table
            dataSource={specs}
            pagination={false}
            showHeader={false}
            rowKey='key'
            columns={[
              {
                title: "Attribute",
                dataIndex: "key",
                key: "key",
                width: 200,
                render: (text) => (
                  <span className='font-medium text-gray-700'>{text}</span>
                ),
              },
              {
                title: "Value",
                dataIndex: "value",
                key: "value",
                render: (text) => <span className='text-gray-600'>{text}</span>,
              },
            ]}
          />
        </div>
      ),
    },
    {
      key: "3",
      label: t("tabs.shipping"),
      children: (
        <div className='py-4'>
          <h3 className='text-lg font-medium mb-3'>{t("shippingPolicy")}</h3>
          <p className='mb-4 text-gray-600'>{t("shippingPolicyText")}</p>
          <h3 className='text-lg font-medium mb-3'>{t("returnPolicy")}</h3>
          <p className='text-gray-600'>{t("returnPolicyText")}</p>
        </div>
      ),
    },
  ];

  return (
    <section>
      <Tabs
        defaultActiveKey='1'
        items={items}
        type='card'
        className='product-tabs'
      />
    </section>
  );
}
