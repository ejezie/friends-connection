import { CgSearchFound } from "react-icons/cg";

interface EmptyProp {
  title: string;
}

const Empty = ({ title }: EmptyProp) => {
  return (
    <div className="center w-full flex-col p-5">
      <div className="empty_icon_wrap">
        <div className="text-[20px] lg:text-[30px]">
          <CgSearchFound />
        </div>
      </div>
      <div className="text text-[14px]">{title}</div>
    </div>
  );
};

export default Empty;
