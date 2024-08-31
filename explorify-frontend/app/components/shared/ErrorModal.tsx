import { AppDispatch, RootState } from "@/app/store/store";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "@/app/store/slices/modalSlice";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export const ErrorModal: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { open, modalContent } = useSelector((state: RootState) => state.modal);

  const handleModalClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (modalContent.status === 401) {
      router.push("/");
    }
  }, [modalContent, router]);

  console.log(modalContent);

  return (
    <Fragment>
      <Dialog
        open={open}
        as='div'
        className='relative z-10 focus:outline-none'
        onClose={handleModalClose}
      >
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <DialogPanel
              transition
              className='w-full max-w-md rounded-xl bg-green-700 p-12 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
            >
              <DialogTitle
                as='h3'
                className='flex items-center text-base/7 font-medium text-black'
              >
                <ExclamationCircleIcon className='h-6 w-6 text-red-500 mr-2' />{" "}
                {/* Red error icon */}
                <h1 className='text-5xl text-bold'>Error</h1>
              </DialogTitle>
              {modalContent.status && (
                <p className='mt-2 text-lg text-black/70'>
                  Status: {modalContent.status}
                  <br />
                  Message: {modalContent.message}
                </p>
              )}
              <div className='mt-4'>
                {modalContent.displayButtons && (
                  <>
                    <Button
                      className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-gray-700'
                      onClick={handleModalClose}
                    >
                      Got it, thanks!
                    </Button>
                    <Button
                      className='inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-gray-700'
                      onClick={handleModalClose}
                    >
                      Got it, thanks!
                    </Button>
                  </>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};
