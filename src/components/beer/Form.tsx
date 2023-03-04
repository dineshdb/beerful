import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import beerImage from "./beer.png";
import { Beer } from "./types";
import ErrorDisplay from ".//Error";

interface Props {
  isOpen: boolean;
  onSave: (beer: Beer) => void;
  setOpen: (open: boolean) => void;
}

const defaultBeer: Beer = {
  id: 0,
  name: "",
  description: "",
  genre: "",
  image_url: beerImage,
};

export default function Form({ isOpen, setOpen, onSave }: Props) {
  const [beer, setBeer] = useState({ ...defaultBeer });
  const [error, setError] = useState("");

  const cancelButtonRef = useRef(null);

  const save = () => {
    const { name, description, genre } = beer;
    if (!name) {
      return setError("Name is required.");
    }
    if (!description) {
      return setError("Description is required.");
    }
    if (!genre) {
      return setError("Genre is required.");
    }

    setOpen(false);
    onSave(beer);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <form
                      onSubmit={save}
                      className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left space-y-6"
                    >
                      <Dialog.Title
                        as="h3"
                        className=" font-semibold leading-6 text-gray-900 text-2xl"
                      >
                        Add a New Beer
                      </Dialog.Title>
                      <div>
                        <img
                          className="rounded-lg h-36 my-4 shadow-lg antialiased"
                          src={beerImage}
                          alt="the beer"
                        />
                      </div>
                      <div className="mt-1 flex rounded-md shadow-sm w-full">
                        <input
                          type="text"
                          name="beername"
                          id="beername"
                          className="block p-4 w-full flex-1 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Beer Name*"
                          required
                          onChange={(e) =>
                            setBeer({ ...beer, name: e.target.value })}
                        />
                      </div>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="genre"
                          id="genre"
                          className="block p-4 w-full flex-1 border rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Genre*"
                          required
                          onChange={(e) =>
                            setBeer({ ...beer, genre: e.target.value })}
                        />
                      </div>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <textarea
                          name="description"
                          id="description"
                          className="block p-4 w-full flex-1 rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                          placeholder="Description*"
                          required
                          onChange={(e) =>
                            setBeer({ ...beer, description: e.target.value })}
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <ErrorDisplay error={error} />
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 block">
                  <input
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={save}
                    value="Save"
                  />
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
