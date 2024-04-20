/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import "./Modal.scss";
// import { failed, success } from "assets/images";
import { Button } from "@/components";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modal.slice";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { MdOutlineCancel } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { createPortal } from "react-dom";

interface ModalTYpe {
  title?: string | undefined;
  message?: string | undefined;
  isOpen?: boolean | undefined;
  isOpenComponent?: boolean | undefined;
  promptMessage?: string | undefined;
  promptLink?: string | undefined;
  component?: string | undefined;
  success?: boolean | undefined;
  data?: { [key in string]: number | string | object };
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
  }: // data,
  ModalTYpe = useAppSelector((state) => state.modal);

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

  const ComponentItem: any = {
    // DepositModal: <DepositModal />,
    // UpdateProfile: <UpdateProfile />,
  }[component as string];

  return createPortal(
    <div>
      {isOpenComponent && (
        <div key={isOpenComponent ? "open" : "close"} style={{ width: "100%" }}>
          {component && ComponentItem}
        </div>
      )}

      {isOpen && (
        <div className={"modal"}>
          <div className="center" style={{ width: "100%" }}>
            <div className="modal_content_wrap center col">
              {succeeded ? (
                <div className="success">
                  <GiCheckMark />
                </div>
              ) : (
                <div className="failed">
                  <MdOutlineCancel />
                </div>
              )}
              <div className="modal_content_title">{title}</div>
              <div className="modal_message_text">{message}</div>

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
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
