import React, { useEffect, useState } from "react";
import { BiImages } from "react-icons/bi";
import { Button, Input } from ".";
import { Form, Field } from "react-final-form";
import { rtkMutation } from "@/utils";
import { useCreatePostMutation } from "@/services";
import { MdCancel } from "react-icons/md";
import { userprofile } from "@/assets";
import { useAppDispatch } from "@/hooks";
import { openModal } from "@/redux/slices/modal.slice";
import formatErrorResponse from "@/utils/formatErrorResponse";

const AddPost: React.FC = (): React.JSX.Element => {
  const [file, setFile] = useState<File | null>(null);

  const dispatch = useAppDispatch();

  const [create, { isSuccess, isLoading, isError, error }] =
    useCreatePostMutation();

  const onSubmit = async (values: {
    [key in string]: string | number | File;
  }) => {
    if (!values.description) {
      dispatch(
        openModal({ message: "Nothing on your mind?, type something please?" })
      );
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64String = reader.result as string;

        values.image = base64String;

        console.log(values);

        rtkMutation(create, values);
      };
    } else {
      // Proceed with your request without the image
      rtkMutation(create, values);
    }
  };

  useEffect(() => {
    isSuccess && setFile;

    isError &&
      dispatch(
        openModal({
          message: formatErrorResponse(error) || "Error Occured",
        })
      );
  }, [isError, error, dispatch]);

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form
            className="w-full"
            onSubmit={(event) => {
              handleSubmit(event);
              isSuccess && form.reset();
            }}
          >
            <div className="bg-primary px-4 shadow bgcard rounded-[29px]">
              <div className="w-full flex items-center gap-2 py-4 border-b ">
                <img
                  src={userprofile}
                  alt="User Image"
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div className="w-full">
                  <Field
                    name="description"
                    component={Input}
                    placeholder={"Whats on your mind?"}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <div className="center">
                  <label
                    htmlFor="imgUpload"
                    className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  >
                    <input
                      type="file"
                      onChange={(e) => {
                        // Check if files is not null before accessing its first element
                        if (e.target.files && e.target.files.length > 0) {
                          setFile(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                      id="imgUpload"
                      data-max-size="5120"
                      accept=".jpg, .png, .jpeg"
                    />
                    <BiImages />
                    <span>Image</span>
                  </label>
                  {file && (
                    <>
                      <img
                        src={URL.createObjectURL(file)}
                        className="w-8 h-8 object-contain rounded-full"
                      ></img>
                      <div
                        className="text text-xl cursor-pointer"
                        onClick={() => setFile(null)}
                      >
                        <MdCancel />
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <Button loading={isLoading}>Submit</Button>
                </div>
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default AddPost;
