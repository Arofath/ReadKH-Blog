import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";

export default function PopUpModalComponent({
  show,
  onClose,
  onLogin,
  onRegister,
}) {
  return (
    <Modal show={show} size="md" onClose={onClose} popup>
      <ModalHeader className="bg-white" />
      <ModalBody className="bg-white">
        <div className="text-center">
          <img
            src="/images/logo/logo.png"
            alt="Login Required"
            className="mx-auto mb-2 h-32 w-32 sm:h-36 sm:w-36 md:h-60 md:w-60 object-contain transition-transform duration-300 hover:scale-110"
          />

          <h3 className="mb-2 text-lg font-semibold text-gray-700">
            You need to log in first
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            Please log in or register to create a post on ReadKH.
          </p>
          <div className="flex justify-center gap-4 ">
            <Button color="dark" onClick={onLogin} className="hover:cursor-pointer">
              Login
            </Button>
            <Button color="gray" onClick={onRegister} className="hover:cursor-pointer">
              Register
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
