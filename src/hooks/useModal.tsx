// import { PulseSpinner } from "@/shared/components/Ui/Loading";
import React, { Fragment, useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
  title: string;
  children: any;
  noHead?: boolean;
  wide?: boolean
  capture?: boolean
}

const useModal = () => {
  const [showModal, setModal] = useState(false);
  const [modalBusy, setModalBusy] = useState(false);
  

  const setShowModal: boolean | any = (state: boolean) => setModal(state);

  const Modal:React.FC<Props> = ({ title, children, noHead, wide, capture }) => {
    return (
      <>
        {showModal && (
          <div
            className="fixed top-0 left-0 index-30 w-full h-screen flex items-center justify-center bg-modal"
            onClick={() => setShowModal(false)}
          >
            <div
              className={`w-11/12 rounded shade bg-white ${noHead? 'md:w-6/12 lg:w-96' : wide? 'md:w-8/12 lg:w-8/12 xl:w-7/12 ' : 'md:w-8/12 lg:w-5/12 xl:w-4/12 '}`}
              onClick={(e) => e.stopPropagation()}
            >
              {!noHead && (
                <div className="flex items-start justify-between py-3 px-4 border-b-2 rounded-t-lg dark:border-gray-600">
                  <h3 className="text-xl fw-600 text-[#030036BD] ">
                    {title}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="text-gray-700 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="defaultModal"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
              {modalBusy && (
                <div className="absolute w-full h-full justify-center align-top">
                  Loading...
                </div>
              )}
              <div className={noHead? "py-6 text-center" : "py-4 px-3"}>{children}</div>
            </div>
          </div>
        )}
      </>
    );
  };

  return { Modal, showModal, setShowModal, setModalBusy };
};

export default useModal;
