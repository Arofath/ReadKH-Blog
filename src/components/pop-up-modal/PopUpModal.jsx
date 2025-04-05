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
            src="src/img/logo.png"
            alt="Login Required"
            className="mx-auto mb-4 h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 object-contain transition-transform duration-300"
          />
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            You need to log in first
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            Please log in or register to create a post on ReadKH.
          </p>
          <div className="flex justify-center gap-4">
            <Button color="dark" onClick={onLogin}>
              Login
            </Button>
            <Button color="gray" onClick={onRegister}>
              Register
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
