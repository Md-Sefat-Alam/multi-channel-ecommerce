// component/AddReview.tsx
"use client";
import React, { useState } from 'react';
import { Button, Form, Input, Rate, Upload, Modal, message } from 'antd';
import { StarFilled, PlusOutlined } from '@ant-design/icons';
import { getDecryptedData } from '@/utils/crypto/encryption';
import Image from 'next/image';
import { useAddReviewMutation } from '../../../lib/api/reviewApi';
import { revalidatePath } from 'next/cache';
import { revalidateReviews } from '@/app/common/fetchingData/serverSideFetch';

const { TextArea } = Input;

type Props = {
  productId: string;
};

const AddReview: React.FC<Props> = ({ productId }) => {
  const [form] = Form.useForm();
  const [addReview, { isLoading }] = useAddReviewMutation();
  const [reviewImages, setReviewImages] = useState<any[]>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoggedIn = !!getDecryptedData("token");

  const showModal = () => {
    if (!isLoggedIn) {
      message.error('Please login to add a review');
      return;
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setReviewImages([]);
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleImageChange = ({ fileList }: any) => {
    setReviewImages(fileList);
  };

  const handlePreviewCancel = () => setPreviewOpen(false);

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('productId', productId);
      formData.append('rating', values.rating.toString());
      formData.append('comment', values.comment);

      reviewImages.forEach((file) => {
        if (file.originFileObj) {
          formData.append('reviewImages', file.originFileObj);
        }
      });

      await addReview(formData).unwrap();
      message.success('Review added successfully!');

      // Trigger revalidation
      await revalidateReviews();
      handleCancel();
    } catch (error) {
      console.error('Failed to add review:', error);
      message.error('Failed to add review. Please try again.');
    }
  };

  const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <div className="mb-6 flex justify-end">
        <Button
          type="primary"
          onClick={showModal}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Write a Review
        </Button>
      </div>

      <Modal
        title="Add Your Review"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className="review-modal"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <Form.Item
              name="rating"
              rules={[{ required: true, message: 'Please rate the product' }]}
            >
              <Rate
                character={<StarFilled style={{ fontSize: '24px' }} />}
                className="text-yellow-300"
              />
            </Form.Item>
          </div>

          <div className="mb-4">
            <Form.Item
              name="comment"
              label="Your Review"
              rules={[{ required: true, message: 'Please write your review' }]}
            >
              <TextArea rows={4} placeholder="Share your experience with this product..." />
            </Form.Item>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images (Optional)</label>
            <Form.Item name="images">
              <Upload
                listType="picture-card"
                fileList={reviewImages}
                onPreview={handlePreview}
                onChange={handleImageChange}
                beforeUpload={() => false}
                accept="image/*"
                maxCount={4}
              >
                {reviewImages.length >= 4 ? null : uploadButton}
              </Upload>
            </Form.Item>
            <Modal open={previewOpen} footer={null} onCancel={handlePreviewCancel}>
              <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>

          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Submit Review
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddReview;
