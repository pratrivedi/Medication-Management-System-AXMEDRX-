// @ts-nocheck
import { AddMedication, AddMedicineModalProps } from "@/types/skutypes";
import React, { ChangeEvent, useEffect, useState } from "react";

const AddMedicineModal: React.FC<AddMedicineModalProps> = ({
  isOpen,
  onClose,
  onAddMedicine,
}) => {
  const initialMedicineState: AddMedication = {
    name: "",
    dose: 0,
    presentation: "",
    unit: 0,
    countries: [],
  };

  const [newMedicine, setNewMedicine] =
    useState<AddMedication>(initialMedicineState);
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/medications/");
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }
      const data = await response.json();
      console.log(data);
      setCountries(data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) : value;

    if (name === "countries") {
      // For countries select input, value is an array of selected options
      const selectedOptions = Array.from(e.target.selectedOptions, (option) =>
        parseInt(option.value)
      );
      setNewMedicine((prevMedicine) => ({
        ...prevMedicine,
        [name]: selectedOptions,
      }));
    } else {
      setNewMedicine((prevMedicine) => ({
        ...prevMedicine,
        [name]: parsedValue,
      }));
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/medications/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMedicine),
      });

      if (!response.ok) {
        throw new Error("Failed to add new medicine");
      }

      const data = await response.json();
      console.log("New Medicine added:", data);
      onClose();
    } catch (error) {
      console.error("Error adding new medicine:", error);
      alert(error);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto backdrop-blur-sm ${
        isOpen ? "" : "hidden"
      }`}
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
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="leading-6 font-medium text-gray-900 text-center text-xl"
                  id="modal-headline"
                >
                  Add New Medicine
                </h3>
                <div className="mt-5">
                  <form>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={newMedicine.name}
                          onChange={handleChange}
                          className="block w-full sm:text-sm border-gray-300 rounded-md border p-3"
                        />
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="dose"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Dose
                        </label>
                        <input
                          type="number"
                          name="dose"
                          id="dose"
                          value={newMedicine.dose}
                          onChange={handleChange}
                          className="block w-full sm:text-sm border-gray-300 rounded-md border p-3"
                        />
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="unit"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Unit
                        </label>
                        <input
                          type="number"
                          name="unit"
                          id="unit"
                          value={newMedicine.unit}
                          onChange={handleChange}
                          className="block w-full sm:text-sm border-gray-300 rounded-md border p-3"
                        />
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="presentation"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Presentation
                        </label>
                        <input
                          type="text"
                          name="presentation"
                          id="presentation"
                          value={newMedicine.presentation}
                          onChange={handleChange}
                          className="block w-full sm:text-sm border-gray-300 rounded-md border p-3"
                        />
                      </div>
                      <div className="col-span-1">
                        <label
                          htmlFor="countries"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Countries
                        </label>
                        <select
                          multiple
                          name="countries"
                          id="countries"
                          value={newMedicine.countries}
                          onChange={handleChange}
                          className="block w-full sm:text-sm border-gray-300 rounded-md border p-3"
                        >
                          {countries.map((country: any) => (
                            <option key={country.id} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </form>
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

export default AddMedicineModal;
