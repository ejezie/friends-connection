import React, { useEffect, useState } from "react";
import { userprofile } from "@/assets";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Form, Field } from "react-final-form";
import { Button, Input } from ".";
import { useMakeCommentMutation, useReplyCommentMutation } from "@/services";
import { rtkMutation } from "@/utils";
import { closeComponentModal, openModal } from "@/redux/slices/modal.slice";
import formatErrorResponse from "@/utils/formatErrorResponse";

interface CommentFormProps {
  commentId?: string | null;
  postId?: string | null;
}

const CommentForm: React.FC<CommentFormProps> = ({
  commentId,
  postId,
}): React.JSX.Element => {
  //   const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const [makeComment, { isError, error, isLoading, isSuccess }] =
    useMakeCommentMutation();
  const [
    replyComment,
    {
      isError: isErrorReply,
      error: errorReply,
      isLoading: isLoadingReply,
      isSuccess: isSuccessReply,
    },
  ] = useReplyCommentMutation();

  const onSubmit = async (values: {
    [key in string]: string | number;
  }) => {
    if (commentId) {
      values.postId = postId as string;
    } else {
      values.commentId = commentId as string;
    }
    commentId
      ? rtkMutation(replyComment, values)
      : rtkMutation(makeComment, values);
  };

  useEffect(() => {
    // login messages
    isError &&
      dispatch(
        openModal({
          message: formatErrorResponse(error) || "Error Occured",
        })
      );
    isSuccess && dispatch(closeComponentModal());

    // reg messages
    isSuccessReply && dispatch(closeComponentModal());
    isErrorReply &&
      dispatch(
        openModal({
          message: formatErrorResponse(errorReply) || "Error Occured",
        })
      );
  }, [
    isSuccess,
    isError,
    error,
    isErrorReply,
    isSuccessReply,
    errorReply,
    dispatch,
  ]);

  return (
    <div className="w-full border-b">
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form
            className="w-full"
            onSubmit={(event) => {
              handleSubmit(event);
              (isSuccess || isSuccessReply) && form.reset();
            }}
          >
            <div className="bg-primary px-4 pb-4 shadow bgcard rounded-[29px]">
              <div className="w-full flex items-center gap-2 py-4  ">
                <img
                  src={userprofile}
                  alt="User Image"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="w-full">
                  <Field
                    name="comment"
                    component={Input}
                    placeholder={"Say something?"}
                  />
                </div>
              </div>
              <div className="w-full end">
                <Button loading={isLoading || isLoadingReply}>Submit</Button>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default CommentForm;
