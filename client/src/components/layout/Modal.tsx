// import { failed, success } from "assets/images";
import { Button, AuthModal, Notification } from "@/components";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modal.slice";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { MdOutlineCancel } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";

interface ModalTYpe {
  title: string | null;
  message: string | null;
  isOpen: boolean | null;
  isOpenComponent: boolean | null;
  promptMessage: string | null;
  promptLink: string | null;
  component: string | null;
  success: boolean | null;
  data: unknown;
}

const Modal = () => {
  const {
    title,
    message,
    isOpen,
    isOpenComponent,
    promptMessage,
    promptLink,
    component,
    success: succeeded,
    data,
  }: ModalTYpe = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // console.log(isOpen, "open", isOpenComponent, "comp-", component, "title-", amount, "transId", transaction_id);

  const handleNavigate = () => {
    navigate(promptLink ? promptLink : "None");
    dispatch(closeModal());
  };
  const handleClose = () => {
    dispatch(closeModal());
  };

  // const modalToDisplay:string = component || "None";

  const ComponentItem: JSX.Element | undefined = {
    AuthModal: <AuthModal data={data as string} />,
    Notification: <Notification />,
  }[component as string];

  return (
    <>
      {(isOpenComponent || isOpen) && (
        <div className="fixed h-[100vh] center top-0 w-[100vw] z-20 bg-opacity-20 bg-gray-87 backdrop-blur-sm bg-fixed">
          {isOpenComponent && (
            <div className="slide-up w-full center">
              {component && ComponentItem}
            </div>
          )}

          {isOpen && (
            <div className="slide-down lg:w-[25%] rounded-[29px] shadow-2xl w-[80%] z-30 center  absolute bgcard p-10">
              <div className="center">
                <div className="center flex-col">
                  {succeeded ? (
                    <div className="text-green-600 xl:text-[50px] text-[25px] ">
                      <GiCheckMark />
                    </div>
                  ) : (
                    <div className="text-red-600 xl:text-[50px] text-[25px] ">
                      <MdOutlineCancel />
                    </div>
                  )}
                  <div className="xl:text-[20px] text-[15px] mt-3 text-center">
                    {title}
                  </div>
                  <div className="xl:text-[13px] text-[11px] mb-5 text-center">
                    {message}
                  </div>

                  {
                    <Button
                      onClick={() => {
                        promptLink ? handleNavigate() : handleClose();
                      }}
                    >
                      {promptMessage ? promptMessage : "Close"}
                    </Button>
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Modal;
