import { useState } from "react";

const UploadState = {
  IDLE: 1,
  UPLOADING: 2,
  UPLOADED: 3,
};

Object.freeze(UploadState);

export default function Home() {
  const [uploadState, setUploadState] = useState(UploadState.IDLE);
  const [imgUrl, setImgUrl] = useState("");

  async function handleFormData(e) {
    setUploadState(UploadState.UPLOADING);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setImgUrl(data.secure_url);
    setUploadState(UploadState.UPLOADED);
    alert("Your Image has been uploaded to Cloudinary");
  }

  return (
    <div className="flex justify-center h-screen items-center">
      {uploadState !== UploadState.UPLOADED ? (
        <div className="w-32">
          <label
            htmlFor="image"
            className="block bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
          >
            {uploadState === UploadState.UPLOADING ? (
              <span>Uploading...</span>
            ) : (
              <span>Upload</span>
            )}
            <input
              type="file"
              name="file"
              id="image"
              className="hidden"
              onChange={handleFormData}
            />
          </label>
        </div>
      ) : (
        <div className="w-96">
          <img className="w-full" src={imgUrl} alt="Uploaded image" />
        </div>
      )}
    </div>
  );
}
