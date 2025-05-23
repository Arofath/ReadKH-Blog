import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";

export default function PopUpModalComponent({
  show,
  onClose,
  onLogin,
  onRegister,
}) {
  return (
    <Modal show={show} size="md" onClose={onClose} popup>
      <ModalHeader className="bg-white dark:bg-gray-900" />
      <ModalBody className="bg-white dark:bg-gray-900">
        <div className="text-center">
          <img
            src="/images/logo/logo.png"
            alt="Login Required"
            className="block dark:hidden mx-auto mb-2 h-32 w-32 sm:h-36 sm:w-36 md:h-60 md:w-60 object-contain transition-transform duration-300 hover:scale-110"
          />
          <img
            src="/images/logo/ReadKh-darkmode.1.png"
            alt="Login Required"
            className="hidden dark:block mx-auto mb-2 h-32 w-32 sm:h-36 sm:w-36 md:h-60 md:w-60 object-contain transition-transform duration-300 hover:scale-110"
          />

          <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-100">
            You need to log in first
          </h3>
          <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
            Please log in or register to create a post on ReadKH.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={onLogin}
              className="hover:cursor-pointer hover:!bg-gray-700 font-bold !bg-[#A27B5C] text-white"
            >
              Login
            </Button>
            <Button
              onClick={onRegister}
              className="hover:cursor-pointer hover:!bg-gray-700 !bg-[#A27B5C] text-white"
            >
              Register
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
