import { Modal, List, Button } from "antd";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useAuth } from "@/context/AuthContext";
import { useRemoveFromWishlistMutation } from "@/app/lib/api/rootApis";
import { removeFromWishlist } from "@/lib/features/wish-list/wishlistSlice";
import TK from "../TK";
import getUrl from "@/utils/getUrl";
import { Link, useRouter } from "@/MUST_USE_Navigation";

type Props = { visible: boolean; onClose: () => void };

export default function WishlistModal({ visible, onClose }: Props) {
  const t = useTranslations("wishlist");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const { token } = useAuth();
  const isAuthenticated = !!token;
  const [removeFromWishlistMutation] = useRemoveFromWishlistMutation();

  const handleRemove = async (productId: string) => {
    if (isAuthenticated) {
      await removeFromWishlistMutation({ productId });
    }
    dispatch(removeFromWishlist(productId));
  };

  return (
    <Modal
      title={t("title")}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
    >
      {wishlistItems.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-gray-500'>{t("emptyMessage")}</p>
        </div>
      ) : (
        <List
          dataSource={wishlistItems}
          className='cursor-pointer'
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  key='remove'
                  type='link'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(item.id);
                  }}
                >
                  {t("removeButton")}
                </Button>,
              ]}
              onClick={() => {
                router.push(`/product/${item.id}`);
                onClose();
              }}
            >
              <List.Item.Meta
                avatar={
                  item?.imageLink?.length ? (
                    <Image
                      src={getUrl({
                        path: item.imageLink[0]?.path,
                      })}
                      width={50}
                      height={50}
                      alt={item.name}
                    />
                  ) : (
                    false
                  )
                }
                title={item.name}
                description={<TK value={item.price} />}
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
}
