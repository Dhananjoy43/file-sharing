import React, { useState, useEffect, useRef } from "react";
import { uploadFile } from "./services/api";

import { MdContentCopy } from "react-icons/md";
import { ImCloudCheck } from "react-icons/im";

// For toast notification
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const [file, setFile] = useState("");
    const [result, setResult] = useState("");
    const [statusOK, setStatusOK] = useState(false);
    const fileInputRef = useRef();

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await uploadFile(data);
                if (response.status == 200) {
                    setStatusOK(true);
                }
                setResult(response.data.path);
            }
        };
        getImage();
    }, [file]);

    const onUpload = () => {
        fileInputRef.current.click();
    };

    const resetForm = () => {
        setFile("");
        setResult("");
        setStatusOK(false);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(function () {
            toast.success("Copied to clipboard!", {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
        });
    };
    return (
        <div className="h-screen w-full flex items-center justify-center bg-slate-200 ">
            <div className="w-[96%] md:w-[500px] bg-white flex flex-col items-center justify-between px-4 py-6 md:p-10 rounded-xl shadow-md ">
                <h1 className="text-xl md:text-3xl font-bold text-blue-900/80 mb-2">
                    Simple file sharing app
                </h1>
                <p className="text-blue-800/70 text-xs md:text-sm">
                    Upload and share the download link without registration
                </p>
                <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                    }}
                />
                {!statusOK ? (
                    <button
                        onClick={onUpload}
                        className={`bg-blue-900/80 text-white px-4 py-1 rounded-md mt-6 mb-4`}
                    >
                        Upload
                    </button>
                ) : (
                    <ImCloudCheck className="text-green-700 text-5xl mt-6 mb-4" />
                )}
                {/* TODO: Progress bar */}
                {statusOK && (
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-blue-800/70 text-xs md:text-sm mb-2">
                            Your file is ready to share. Access your file from
                            the link below.
                        </p>
                        <div className="flex items-center gap-3 bg-slate-200 p-2 rounded-md text-sm md:text-base">
                            <a
                                href={result}
                                target="_blank"
                                className="text-blue-800/80 underline"
                            >
                                {result}
                            </a>
                            <MdContentCopy
                                onClick={() => {
                                    copyToClipboard(result);
                                }}
                                className="cursor-copy text-blue-900/70"
                            />
                        </div>
                        <button
                            onClick={resetForm}
                            className={`bg-blue-900/80 text-white px-4 py-1 rounded-md  mt-4`}
                        >
                            Upload another file
                        </button>
                    </div>
                )}
                <ToastContainer
                    position="bottom-center"
                    autoClose={1000}
                    limit={1}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition:Slide
                />
            </div>
        </div>
    );
};

export default App;
