
// component/ReviewItem.tsx
"use client";
import React, { useState } from 'react';
import { formatDate } from "@/app/common/datePicker";
import { Avatar, Button, Input, Form, Tooltip, message } from 'antd';
import {
  LikeOutlined, LikeFilled, CommentOutlined,
  SendOutlined, CheckCircleFilled
} from '@ant-design/icons';
import Image from 'next/image';
import {
  useLikeReviewMutation,
  useAddReviewCommentMutation,
  useLazyGetReviewCommentsQuery,
  useLazyGetReviewLikesQuery,
  useLazyGetUserReviewInteractionsQuery
} from '../../../lib/api/reviewApi';
import { getDecryptedData } from '@/utils/crypto/encryption';
import getUrl from '@/utils/getUrl';

type User = {
  id: number;
  uuid: string;
  userRoleId: number;
  fullName: string;
  fullNameBn: string | null;
  mobileNumber: string;
  email: string;
  password: string;
  nationalID: string | null;
  gender: string | null;
  dob: string | null;
  activeStatus: number;
  remarks: string | null;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
};

type ReviewProps = {
  uuid: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  images?: IImage[]
  ;
};

const ReviewItem: React.FC<ReviewProps> = ({
  uuid,
  rating,
  comment,
  createdAt,
  updatedAt,
  user,
  images
}) => {
  const [form] = Form.useForm();
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const isLoggedIn = !!getDecryptedData("token");

  // RTK Query hooks
  const [likeReview] = useLikeReviewMutation();
  const [addComment, { isLoading: isAddingComment }] = useAddReviewCommentMutation();
  const [fetchComments, { isLoading: isLoadingComments }] = useLazyGetReviewCommentsQuery();
  const [fetchLikes] = useLazyGetReviewLikesQuery();
  const [fetchUserInteractions] = useLazyGetUserReviewInteractionsQuery();

  // Generate star array based on rating
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(
      <svg
        key={i}
        className="h-4 w-4 text-yellow-300"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
      </svg>
    );
  }

  // Parse images if available
  const reviewImages = images || [];

  const handleLike = async () => {
    if (!isLoggedIn) {
      message.error('Please login to like this review');
      return;
    }

    try {
      await likeReview({
        reviewId: uuid,
        isLiked: !userHasLiked
      }).unwrap();

      setUserHasLiked(!userHasLiked);
      setLikes(userHasLiked ? likes - 1 : likes + 1);
      message.success(userHasLiked ? 'Like removed' : 'Review liked');
    } catch (error) {
      console.error('Failed to like review:', error);
      message.error('Failed to process your request');
    }
  };

  const handleAddComment = async (values: { comment: string }) => {
    if (!isLoggedIn) {
      message.error('Please login to comment');
      return;
    }

    try {
      const result = await addComment({
        reviewId: uuid,
        comment: values.comment
      }).unwrap();

      form.resetFields();

      loadComments();

      if (!showComments) {
        toggleComments();
      } else {
        // Refresh comments
        loadComments();
      }
      setCommentCount(commentCount + 1);
      message.success('Comment added successfully');
    } catch (error) {
      console.error('Failed to add comment:', error);
      message.error('Failed to add comment');
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      loadComments();
    }
    setShowComments(!showComments);
  };

  const loadComments = async () => {
    try {
      const result = await fetchComments(uuid).unwrap();
      setComments(result.data);
      setCommentCount(result.data.length);
    } catch (error) {
      console.error('Failed to load comments:', error);
      message.error('Failed to load comments');
    }
  };


  // Load likes count and user interaction status on mount
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const likesResult = await fetchLikes(uuid).unwrap();
        setLikes(likesResult.data.length);

        if (isLoggedIn) {
          const userInteraction = await fetchUserInteractions(uuid).unwrap();
          setUserHasLiked(userInteraction.data?.hasLiked || false);
        }
      } catch (error) {
        console.error('Failed to load interaction data:', error);
      }
    };
    loadComments()
    loadData();
  }, []);

  return (
    <div className="border-b border-gray-200 pb-8 pt-6 ">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="shrink-0 space-y-3 sm:w-48 md:w-72">
          <div className="flex items-center gap-0.5">
            {stars}
          </div>

          <div className="flex items-center gap-3">
            {/* <Avatar size={40} src={user?.profileImage} className="bg-primary text-white"> */}
            <Avatar size={40} className="bg-primary text-white">
              {user?.fullName?.charAt(0).toUpperCase()}
            </Avatar>
            <div className="space-y-0.5">
              <p className="text-base font-semibold text-gray-900 ">
                {user?.fullName}
              </p>
              <p className="text-sm font-normal text-gray-500 ">
                {formatDate(createdAt)}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1">
            <CheckCircleFilled className="!text-green-600 text-xs" />
            <p className="text-xs font-medium text-gray-900 ">
              Verified purchase
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <p className="text-base font-normal text-gray-700 ">
            {comment}
          </p>

          {/* Review Images */}
          {reviewImages.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {reviewImages.map((img, index: number) => (
                <div
                  key={index}
                  className="relative h-[120px] w-[100px] overflow-hidden rounded-lg border border-gray-200"
                >
                  <Image
                    src={getUrl({ path: img.path })}
                    alt={`Review image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-6 pt-2">
            <Button
              type="text"
              onClick={handleLike}
              className="flex items-center gap-1 text-gray-600 hover:text-primary"
              icon={userHasLiked ? <LikeFilled className="text-primary" /> : <LikeOutlined />}
            >
              {likes > 0 && <span>{likes}</span>}
              <span>{userHasLiked ? 'Liked' : 'Like'}</span>
            </Button>

            <Button
              type="text"
              onClick={toggleComments}
              className="flex items-center gap-1 text-gray-600 hover:text-primary"
              icon={<CommentOutlined />}
            >
              {commentCount > 0 && <span>{commentCount}</span>}
              <span>Comments</span>
            </Button>
          </div>

          {/* Comment form */}
          <Form form={form} onFinish={handleAddComment} layout="inline" className="mt-3 flex items-center">
            <Form.Item
              name="comment"
              className="flex-grow mb-0"
              rules={[
                { required: true, message: 'Please enter your comment' },
                { max: 200, message: 'Comment must be 200 characters or less' },
              ]}
            >
              <Input
                placeholder="Add a comment..."
                suffix={
                  <Button
                    type="text"
                    htmlType="submit"
                    icon={<SendOutlined />}
                    loading={isAddingComment}
                    className="text-primary"
                  />
                }
              />
            </Form.Item>
          </Form>

          {/* Comment list */}
          {showComments && (
            <>

              <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-100">
                {isLoadingComments ? (
                  <p className="text-sm text-gray-500">Loading comments...</p>
                ) : comments.length > 0 ? (
                  comments.map((comment: any) => (
                    <div key={comment.uuid} className="comment-item space-y-1">
                      <div className="flex items-center gap-2">
                        <Avatar size="small" className="bg-gray-200">
                          {comment.user.fullName.charAt(0)}
                        </Avatar>
                        <p className="text-sm font-medium text-gray-900">{comment.user.fullName}</p>
                        <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700 pl-7">{comment.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
                )}
              </div>

            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
