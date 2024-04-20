import React, { useState } from "react";
import { BiImages } from "react-icons/bi";
import { Button, Input } from ".";
import { userprofile } from "@/assets";

const AddPost: React.FC = (): React.JSX.Element => {
  const [file, setFile] = useState<File | null>(null);

  console.log(file);

  return (
    <div>
      <div className="bg-primary px-4 shadow bgcard rounded-[29px]">
        <div className="w-full flex items-center gap-2 py-4 border-b ">
          <img
            src={userprofile}
            alt="User Image"
            className="w-14 h-14 rounded-full object-cover"
          />
          <Input
            className="w-full rounded-full py-5"
            placeholder="What's on your mind...."
            name="description"
            label=""
            labelStyles=""
            type="text"
            error={""}
          />
        </div>

        <div className="flex items-center justify-between py-4">
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

          <div>
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
