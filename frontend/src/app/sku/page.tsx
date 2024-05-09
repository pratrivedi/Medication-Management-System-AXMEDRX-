"use client";
import React from "react";
import MedicationModal from "@/components/editmodal/modal";
import AddMedicineModal from "@/components/addmodal/modal";
import useMedicationManagement from "@/hooks/skuhooks";
import UploadModal from "@/components/uploadmodal";

const Sku = () => {
  const {
    isModalOpen,
    selectedMedication,
    isAddModalOpen,
    skus,
    emojis,
    handleEdit,
    handleCloseModal,
    handleAddMedicine,
    handleCloseAddModal,
    handleDelete,
    countries,
    upload,
    handleUpload,
    handleCloseUpload,
  } = useMedicationManagement();

  console.log({ skus });
  console.log({ countries });

  return (
    <div className="flex min-h-screen  bg-gray-50">
      <div className="p-6  px-0 h-full w-full ">
        <div className="flex justify-end  flex-row space-x-4 p-2 m-2">
          <button
            onClick={handleUpload}
            className="relative px-6 py-3 font-bold text-black group h-[3rem] mt-[2rem]"
          >
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 bg-red-300 group-hover:translate-x-0 group-hover:translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full border-4 border-black"></span>
            <span className="relative">Upload CSV / BATCH</span>
          </button>

          <div className="flex mb-4 mr-8 mt-8">
            <button
              onClick={handleAddMedicine}
              className="relative items-center justify-center inline-block p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-2xl group"
            >
              <span className="absolute top-0 left-0 w-40 h-40 -mt-10 -ml-3 transition-all duration-700 bg-red-500 rounded-full blur-md ease"></span>
              <span className="absolute inset-0 w-full h-full transition duration-700 group-hover:rotate-180 ease">
                <span className="absolute bottom-0 left-0 w-24 h-24 -ml-10 bg-purple-500 rounded-full blur-md"></span>
                <span className="absolute bottom-0 right-0 w-24 h-24 -mr-10 bg-pink-500 rounded-full blur-md"></span>
              </span>
              <span className="relative text-white"> Add Medicine SKU</span>
            </button>
          </div>
        </div>

        <p className="py-10 text-center block antialiased font-sans text-2xl text-black font-semibold leading-none ">
          Medication SKUs List
        </p>
        <table className="mx-auto w-[85%] text-left border">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-lg text-blue-gray-900 font-semibold leading-none opacity-70">
                  Medication Name
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-lg text-blue-gray-900 font-semibold leading-none opacity-70">
                  Dose
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-lg text-blue-gray-900 font-semibold leading-none opacity-70">
                  Presentation
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-lg text-blue-gray-900 font-semibold leading-none opacity-70">
                  Unit
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-lg text-blue-gray-900 font-semibold leading-none opacity-70">
                  Countries
                </p>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <p className="block antialiased font-sans text-lg text-blue-gray-900 font-semibold leading-none opacity-70">
                  Action
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {skus.map((item, index) => {
              return (
                <tr key={index} className="bg-white">
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <span className="text-xs flex justify-center items-center relative object-center rounded-full w-6 h-6  border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1">
                        {item.id}
                      </span>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-bold">
                        {item.name} {emojis[index]}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      {item.dose}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                      {item.presentation}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none ${
                          item.unit && item.unit >= 5
                            ? "bg-amber-500/20 text-amber-900"
                            : "bg-green-500/20 text-green-900"
                        } py-1 px-2 text-xs rounded-md`}
                      >
                        <span className="">{item.unit}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-12 rounded-md border border-blue-gray-50 p-1">
                        <div className="flex items-center justify-center relative rounded-md h-full w-full object-contain p-1">
                          🌎
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal capitalize">
                          {item?.countries
                            ?.map((countryId) => {
                              //@ts-ignore
                              const country = countries?.find(
                                //@ts-ignore
                                (c) => c.id === countryId
                              );
                              return country?.name;
                            })
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                      type="button"
                      onClick={() => handleEdit(item)}
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z"></path>
                        </svg>
                      </span>
                    </button>
                    <button
                      className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20"
                      type="button"
                      onClick={() => handleDelete(item?.id)}
                    >
                      <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="h-4 w-4"
                        >
                          <path d="M3 6l3.293-3.293A1 1 0 017.707 3L12 7.293l4.293-4.293a1 1 0 011.414 1.414L13.414 8l4.293 4.293a1 1 0 01-1.414 1.414L12 9.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 8 6.293 3.707A1 1 0 015.88 3.293L3 6z" />
                          <path d="M9 17a2 2 0 002 2h2a2 2 0 002-2" />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {isModalOpen && (
          <MedicationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            medication={selectedMedication}
            countries={countries}
          />
        )}
        {isAddModalOpen && (
          <AddMedicineModal
            isOpen={isAddModalOpen}
            onClose={handleCloseAddModal}
            onAddMedicine={handleAddMedicine}
          />
        )}

        {upload && <UploadModal onClose={handleCloseUpload} />}
      </div>
    </div>
  );
};

export default Sku;
