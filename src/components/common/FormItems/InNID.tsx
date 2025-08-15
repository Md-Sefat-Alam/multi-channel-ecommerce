"use client";
import { Col, Form, Upload, Modal } from "antd";
import { NamePath } from "antd/es/form/interface";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import Dragger from "antd/es/upload/Dragger";
import { NidBack, NidFront } from "../SVG/Icons";
import { InputCommonProps } from "@/types/common";

const { Item } = Form;

interface Props<T> extends InputCommonProps<T> {
  maxCount?: number;
  accept?: string;
  isFront: boolean;
  label: string;
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function InNID<T>({
  name,
  bPoint,
  label,
  placeholder,
  rules,
  size,
  readOnly,
  disabled,
  maxCount = 1,
  accept,
  isFront,
}: Props<T>) {
  const [fileList, setFileList] = useState<any[]>([]); // State to manage the file list
  const [previewVisible, setPreviewVisible] = useState(false); // Modal visibility state
  const [previewImage, setPreviewImage] = useState(""); // Image URL for the modal
  const [previewTitle, setPreviewTitle] = useState(""); // Title for the modal

  // Handle file changes
  const handleChange = async (info: any) => {
    let newFileList = [...info.fileList];

    // Restrict maxCount of files
    if (maxCount && newFileList.length > maxCount) {
      newFileList = newFileList.slice(-maxCount);
    }

    // Loop through the file list and set preview for files without a preview or URL
    newFileList = await Promise.all(
      newFileList.map(async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        return file;
      })
    );

    setFileList(newFileList);

    // Set preview for the first image automatically (if desired)
    if (newFileList.length > 0) {
      const firstFile = newFileList[0];
      setPreviewImage(firstFile.url || firstFile.preview);
      setPreviewTitle(
        firstFile.name ||
          firstFile.url?.substring(firstFile.url.lastIndexOf("/") + 1)
      );
    }
  };

  // Handle image preview
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  // Helper to convert file to base64
  const getBase64 = (file: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <Col
      xs={bPoint?.xs || 24}
      sm={bPoint?.sm || bPoint?.xs || 12}
      md={bPoint?.md || bPoint?.xs || bPoint?.sm || 12}
      lg={bPoint?.lg || bPoint?.xs || bPoint?.sm || bPoint?.md || 6}
      xl={
        bPoint?.xl || bPoint?.xs || bPoint?.sm || bPoint?.md || bPoint?.lg || 6
      }
      xxl={
        bPoint?.xxl || bPoint?.xs || bPoint?.sm || bPoint?.md || bPoint?.lg || 6
      }
    >
      <Form.Item
        rules={rules}
        name={name as NamePath}
        valuePropName='fileList'
        className='!bg-white'
        getValueFromEvent={normFile}
      >
        <Dragger
          listType='picture-card'
          fileList={fileList}
          onChange={handleChange}
          onPreview={handlePreview} // Add preview handler here
          maxCount={maxCount}
          accept={".jpeg, .png, .jpg"}
          className='!bg-white'
          disabled={readOnly || disabled}
          beforeUpload={() => false} // Prevent automatic upload
        >
          {fileList.length === 0 ? (
            <p className='ant-upload-drag-icon flex justify-center items-center'>
              {isFront ? <NidFront /> : <NidBack />}
            </p>
          ) : (
            <p className='ant-upload-drag-icon flex justify-center items-center'>
              <img alt='example' style={{ width: "100%" }} src={previewImage} />
            </p>
          )}
          {label ? (
            <div className='flex justify-center items-center'>
              <p className='border p-2 bg-heading text-white rounded-lg'>
                {label}
              </p>
            </div>
          ) : (
            ""
          )}
          <small className='ant-upload-hint'>
            Supported formats: JPEG, PNG, JPG
          </small>
        </Dragger>
      </Form.Item>

      {/* Image preview modal */}
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img alt='example' style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Col>
  );
}
