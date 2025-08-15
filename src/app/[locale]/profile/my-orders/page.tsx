"use client";

import { useAuth } from "@/context/AuthContext";
import { useMessageGroup } from "@/context/MessageGroup";
import { Link } from "@/MUST_USE_Navigation";
import { EyeOutlined } from "@ant-design/icons";
import type { GetProp, TableProps } from "antd";
import { Button, Divider, Form, message, Popover, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import type { SorterResult } from "antd/es/table/interface";
import dayjs from "dayjs";
import { useRouter } from "@/MUST_USE_Navigation";
import { useEffect, useState } from "react";
import { MdPayment } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useGetOrdersQuery } from "./lib/api/orderApi";
import { IOrderGet, IOrderPayment, IOrders } from "./lib/orderType";
import TK from "@/components/common/TK";
import { useTranslations } from "next-intl";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
  search?: any;
}

const getRandomuserParams = (params: TableParams): IGetProps => {
  return {
    length: params.pagination?.pageSize || 10,
    start:
      ((params.pagination?.current || 0) - 1) *
        (params.pagination?.pageSize || 0) || 0,
    search: params.search || {},
    filters: params.filters || {},
  };
};

function page() {
  const t = useTranslations();
  const user = useAuth();
  const userUuid = user.user?.uuid;
  const [filters, setFilters] = useState<IGetProps>({
    start: 0,
    length: 10,
    filters: {
      uuid: userUuid,
    } as any,
    search: {},
  });
  const { data: orders, isLoading, isFetching } = useGetOrdersQuery(filters);

  const [search, setSearch] = useState<any>();
  const router = useRouter();
  const [form] = Form.useForm();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: ["10", "20", "50", "100"],
    },
  });
  const { notify } = useMessageGroup();
  // const [
  //     deleteUser,
  //     {
  //         isLoading: isLoadingDelete,
  //         isError: isErrorDelete,
  //         isSuccess: isSuccessDelete,
  //         error: deleteError,
  //     },
  // ] = useDeleteUserMutation();

  const handleTableChange: TableProps<IOrderGet>["onChange"] = (
    pagination,
    filters,
    sorter,
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setFilters({ start: 0, length: 10 });
    }
  };

  const filterChanged = (values: any) => {
    setSearch({ searchText: values });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const { sortField, sortOrder, filters, pagination } = tableParams;
      const params = getRandomuserParams({
        pagination: {
          current: pagination?.current,
          pageSize: pagination?.pageSize,
        },
        search: {
          productName: form.getFieldValue("searchText") || undefined,
          orderNo: form.getFieldValue("searchText") || undefined,
          remarks: form.getFieldValue("searchText") || undefined,
        },
        sortField,
        sortOrder,
        filters,
      });

      console.log({ params });

      setFilters(params);
    }, 400);

    return () => clearTimeout(handler);
  }, [tableParams, search]);

  const columns: ColumnsType<IOrderGet> = [
    {
      title: t("myOrderList.order_no"),
      dataIndex: "invoiceNo",
    },
    {
      title: t("myOrderList.order_date"),
      dataIndex: "createdAt",
      render: (orderDate: any) => (
        <Tag bordered={false} color={"success"}>
          {dayjs(orderDate).format("DD.MM.YYYY")}
        </Tag>
      ),
    },
    {
      title: t("myOrderList.product"),
      dataIndex: "items",
      render: (products: IOrders[]) =>
        products.map((item) => (
          <Tag className='!m-1' bordered={false} color={"cyan"}>
            {item?.product?.title}{" "}
            <p>
              {t("myOrderList.quantity_short")}: {item?.quantity}
            </p>
            <TK value={item.price} />
          </Tag>
        )),
    },

    {
      title: t("myOrderList.total_price"),
      dataIndex: "totalAmount",
      render(value, record, index) {
        return <TK value={value} />;
      },
    },
    {
      title: t("myOrderList.payment_status"),
      dataIndex: "payments",
      render: (payments: IOrderPayment[]) => (
        <div className='flex justify-center'>
          {payments.some((item) => item.status === "COMPLETED") ? (
            <Tag bordered={true} color={"success"}>
              {t("myOrderList.paid")}
            </Tag>
          ) : (
            <Tag bordered={true} color={"warning"}>
              {t("myOrderList.unpaid")}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: t("myOrderList.order_status"),
      dataIndex: "orderStatus",
      render: (status) => (
        <div className='flex justify-center'>
          <Tag bordered={false} color={"warning"}>
            {status}
          </Tag>
        </div>
      ),
    },

    {
      title: t("common.actions"),
      render: (_, __) => (
        <div>
          <Popover
            content={
              <div className='!flex flex-col gap-2 !justify-start !items-start'>
                {/* <Link
                  href={`availed-policy/${__.uuid}`}
                  className='flex gap-2 w-full text-heading'
                > */}
                <div className='flex gap-2'>
                  <EyeOutlined
                    onClick={() => {
                      message.info(t("common.coming_soon"));
                    }}
                    className='text-xl'
                  />{" "}
                  {t("common.view")}
                </div>
                {/* </Link> */}
                {!__?.payments.some((item) => item.status === "COMPLETED") ? (
                  <>
                    <Divider className='!m-0 !p-0 !pb-1' />
                    {/* <Link
                      href={`/payment/${__.uuid}`}
                      className='flex gap-2 w-full text-heading'
                    > */}
                    <div className='flex gap-2'>
                      <MdPayment
                        onClick={() => {
                          message.info(t("common.coming_soon"));
                        }}
                        className='text-xl'
                      />{" "}
                      {t("common.payment")}
                    </div>
                    {/* </Link> */}
                  </>
                ) : (
                  <></>
                )}
              </div>
            }
            title={false}
            trigger='click'
            placement='bottomRight'
          >
            <Button type='dashed'>
              <PiDotsThreeOutlineVerticalFill />
            </Button>
          </Popover>
        </div>
      ),
      width: "80px",
      fixed: "right",
    },
  ];

  // useEffect(() => {
  //     notify({
  //         isError: isErrorDelete,
  //         isLoading: isLoadingDelete,
  //         isSuccess: isSuccessDelete,
  //         key: "User_delete",
  //         duration: 1,
  //         success_content: "User deleted successfully",
  //     });
  // }, [isLoadingDelete, isErrorDelete, deleteError, isSuccessDelete]);

  return (
    <div className='w-full'>
      <div className='pt-4 pb-0 flex flex-col md:flex-row md:justify-between gap-2 md:gap-0'>
        <h3 className='text-[20px] font-bold text-heading'>
          {t("myOrderList.title")}
        </h3>
        <Form
          name='basic'
          form={form}
          style={{ maxWidth: 600, paddingBottom: 0 }}
          initialValues={{ remember: true }}
          onChange={filterChanged}
          autoComplete='off'
          onFinishFailed={(value: any) => {
            const fieldCount = value?.errorFields?.length || 0;
            const fieldText =
              fieldCount > 1
                ? t("common.fields_not_found")
                : t("common.field_not_found");
            message.error(`${fieldCount} ${fieldText}`);
          }}
        >
          <Form.Item style={{ paddingBottom: 0 }} label='' name='searchText'>
            <Search
              placeholder={t("myOrderList.search_placeholder")}
              enterButton={t("common.search")}
              size='middle'
              loading={isLoading}
            />
          </Form.Item>
        </Form>
      </div>
      <Table
        columns={columns}
        rowKey={(record) => record.uuid}
        dataSource={orders?.data || []}
        pagination={{
          ...tableParams.pagination,
          total: orders?.recordsTotal,
        }}
        loading={isLoading || isFetching}
        onChange={handleTableChange}
        bordered
        size='small'
        scroll={{ x: true }}
      />
    </div>
  );
}

export default page;
