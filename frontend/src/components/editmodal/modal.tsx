// @ts-nocheck
"use client";
import React, { ChangeEvent, useState } from "react";
import { MedicationModalProps } from "@/types/skutypes";

const MedicationModal: React.FC<MedicationModalProps> = ({
  isOpen,
  onClose,
  medication,
  countries,
}) => {
  const [editedMedication, setEditedMedication] = useState({ ...medication });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) : value;

    if (name === "countries") {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
        parseInt(option.value)
      );
      setEditedMedication((prevMedication) => ({
        ...prevMedication,
        [name]: selectedOptions,
      }));
    } else {
      setEditedMedication((prevMedication) => ({
        ...prevMedication,
        [name]: parsedValue,
      }));
    }
  };

  const handleSave = async () => {
    console.log("Edited Medication:", editedMedication);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/medications/${medication?.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedMedication),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update medication");
      }
      const data = await response.json();
      console.log("Edited Medication:", data);
      onClose();
    } catch (error) {
      console.error("Error editing medication:", error);
    }
    onClose();
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } z-10 inset-0 overflow-y-auto backdrop-blur-sm`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black opacity-50 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="leading-6 font-medium text-gray-900 text-center text-xl"
                  id="modal-headline"
                >
                  Edit{" "}
                  {medication && medication.id
                    ? "/ RegistrationNumber - " + `${medication.id}`
                    : ""}
                </h3>
                <div className="mt-5">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(editedMedication).map(([key, value]) => (
                        <tr key={key}>
                          <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {key}
                          </td>
                          <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                            {key === "countries" ? (
                              <select
                                multiple
                                name="countries"
                                id="countries"
                                value={editedMedication.countries}
                                onChange={handleChange}
                                className="block w-full sm:text-sm border-gray-300 rounded-md border p-3"
                              >
                                {countries.map((country: any) => (
                                  <option key={country.id} value={country.id}>
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type="text"
                                name={key}
                                value={
                                  editedMedication[
                                    key as keyof typeof editedMedication
                                  ]
                                }
                                onChange={handleChange}
                                className="block w-full sm:text-sm border-gray-300 rounded-md border p-3"
                              />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSave}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationModal;
