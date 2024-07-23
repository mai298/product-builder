import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";
import { Fragment, ReactNode} from "react";

interface Iprops{
  isOpen:boolean;
  closeModal:()=>void;
  title?:string;
  children:ReactNode;

}
export default function Modal({isOpen,closeModal,title,children}:Iprops) {
  // const [isOpen, setIsOpen] = useState(true);

  // function open() {
  //   setIsOpen(true);
  // }

  // function close() {
  //   setIsOpen(false);
  // }

  return (
    <>
    {/* <div className="fixed inset-0 flex items-center justify-center">
      <Button
        onClick={open}
        className="bg-indigo-500 rounded-md
          px-4 py-2 text-sm font-medium
           text-white"
      >
        Open dialog
      </Button>
      </div> */}

<Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-lg bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
             {title&& <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                {title}
              </DialogTitle>}

            <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      </Transition>
      </>
      
    );
}