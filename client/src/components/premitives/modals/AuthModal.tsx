import React, { useEffect } from "react";
import { useLoginMutation, useRegisterMutation } from "@/services";
import { Button, Input } from "../../widgets";
import { useAppDispatch } from "@/hooks";
import { closeComponentModal, openModal } from "@/redux/slices/modal.slice";
import { MdCancelScheduleSend } from "react-icons/md";
import { rtkMutation } from "@/utils";
import formatErrorResponse from "@/utils/formatErrorResponse";
import { Form, Field } from "react-final-form";
import validate, { required } from "@/utils/validation";

interface AuthModalProp {
  data: string;
}
const AuthModal: React.FC<AuthModalProp> = ({ data }): React.JSX.Element => {
  const [login, { isSuccess, isError, error, isLoading }] = useLoginMutation();
  const [
    register,
    {
      isSuccess: isSuccessReg,
      isError: isErrorReg,
      error: errorReg,
      isLoading: isLoadingReg,
    },
  ] = useRegisterMutation();

  const dispatch = useAppDispatch();

  const onSubmit = (values: { [key in string]: string | number }) => {
    data === "login"
      ? rtkMutation(login, { identifier: values.identifier })
      : rtkMutation(register, values);
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
    isSuccessReg && dispatch(closeComponentModal());
    isErrorReg &&
      dispatch(
        openModal({
          message: formatErrorResponse(errorReg) || "Error Occured",
        })
      );
  }, [isSuccess, isError, error, isErrorReg, isSuccessReg, errorReg, dispatch]);

  return (
    <div className="bgcard p-10 rounded-[29px]">
      <div
        className="text cursor-pointer w-10"
        onClick={() => dispatch(closeComponentModal())}
      >
        <MdCancelScheduleSend />
      </div>

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, valid }) => (
          <form className="w-full" onSubmit={handleSubmit}>
            {data !== "login" && (
              <div className="w-[230px]">
                <Field
                  name="name"
                  component={Input}
                  placeholder={"Name"}
                  validate={required("Name")}
                />
              </div>
            )}
            <div className="w-[230px] mb-5">
              <Field
                name="identifier"
                component={Input}
                validate={required(
                  data === "login" ? "User name or email" : "Email"
                )}
                // label={data === "login" ? "Name " : "Email"}
                placeholder={
                  data === "login" ? "User name or email" : "Input Email"
                }
              />
            </div>
            <div className="center w-full">
              <Button
                disabled={!valid}
                loading={isLoadingReg || isLoading}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default AuthModal;
