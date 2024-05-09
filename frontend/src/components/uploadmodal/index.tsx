//@ts-nocheck
import React, {
  useRef,
  MouseEvent,
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import Image from "next/image";

interface UploadModalProps {
  onClose: () => void;
  onUpload?: (e: ChangeEvent<HTMLInputElement>) => void;
  progress?: number;
  uploadPDFLink?: (pdfLink: string) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({
  onClose,
  onUpload,
  progress,
  uploadPDFLink = () => {},
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [f, setF] = useState<string | null>();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    const simulateUpload = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress >= 100) {
          clearInterval(interval);
        }
        setUploadProgress(progress);
      }, 100);
    };

    if (f) {
      simulateUpload();
    }
  }, [f]);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setF(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (f) {
      try {
        const formData = new FormData();
        formData.append("file", f);

        const response = await fetch("http://127.0.0.1:8000/upload/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setUploadMessage(data.message);
          setUploadProgress(0);
          setTimeout(() => {
            onClose();
          }, 3000);
          window.location.reload();
        } else {
          console.error("Upload failed");
        }
      } catch (error) {
        console.error("Error occurred during upload:", error);
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm "
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="w-[40rem] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative"
      >
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 border shadow-lg">
          <button
            onClick={onClose}
            className="mt-4 mr-4 text-gray-500 hover:text-gray-600 flex self-end justify-end w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="text-center">
            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              CSV / BATCH Upload!
            </h2>
            <p className="mt-2 text-sm text-gray-400">Stock Keeping Unit</p>
          </div>
          <div className="mt-8 space-y-3">
            <div className="grid grid-cols-1 space-y-2">
              <label className="text-sm font-bold text-gray-500 tracking-wide">
                Attach Document
              </label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFiles = e.dataTransfer.files;
                  if (droppedFiles.length > 0) {
                    const file = droppedFiles[0];
                    if (
                      file.type === "text/csv" ||
                      file.name.endsWith(".csv")
                    ) {
                      onUpload &&
                        onUpload({
                          target: { files: [file] },
                        } as unknown as ChangeEvent<HTMLInputElement>);
                    } else {
                      alert("Please upload CSV files only.");
                    }
                  }
                }}
                className="flex items-center justify-center w-full"
              >
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div className="h-full w-full text-center flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-blue-400 group-hover:text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <Image
                        className="has-mask h-34 object-center mt-2"
                        src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
                        alt="freepik image"
                        width={164}
                        height={164}
                      />
                    </div>
                    <p className="pointer-none text-gray-500 ">
                      <span className="text-sm">Drag and drop</span> files here{" "}
                      <br /> or{" "}
                      <label className="text-blue-600 hover:underline">
                        select a file
                        <input
                          type="file"
                          className="hidden"
                          onChange={changeHandler}
                        />
                      </label>{" "}
                      from your computer
                    </p>
                    <p className="text-xs text-gray-300">
                      <span>File type: csv only*</span>
                    </p>
                  </div>
                  <input
                    accept=".pdf"
                    type="file"
                    className="hidden"
                    onChange={changeHandler}
                  />
                </label>
              </div>
            </div>
            {f && (
              <p className="text-sm text-gray-500">
                Selected File:{" "}
                <span className="font-bold text-gray-500">{f.name}</span>
              </p>
            )}
            {!uploadMessage && (
              <div className="h-1 w-full bg-neutral-200 ">
                <div
                  className="h-1 bg-blue-400"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}

            {uploadMessage && (
              <div className="text-sm text-green-500">- {uploadMessage} ✅</div>
            )}
            <div>
              <button
                onClick={handleUpload}
                className="my-5 w-full flex justify-center bg-red-600 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-red-700 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
