import React, { useState, useCallback } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Link, Redirect } from "react-router-dom";
import { uploadProfilePic } from "../Helper/userHelper";

export default function App() {
  const [upImg, setUpImg] = useState();
  const [imgRef, setImgRef] = useState(null);
  const [crop, setCrop] = useState({ unit: "px", aspect: 1 / 1 });
  const [previewUrl, setPreviewUrl] = useState();
  const [image, setImage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setloading] = useState(false);
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    setImgRef(img);
  }, []);

  const onUpload = () => {
    setloading(true);
    let formData = "";
    formData = new FormData();

    formData.set("picture", image);

    uploadProfilePic(formData)
      .then((res) => {
        setloading(false);
        setRedirect(true);
      })
      .catch((err) => {
        setloading(false);
        setRedirect(true);
      });
  };

  const makeClientCrop = async (crop) => {
    if (imgRef && crop.width && crop.height) {
      createCropPreview(imgRef, crop, "newFile.jpeg");
    }
  };

  const createCropPreview = async (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = fileName;
        console.log(blob);
        setImage(blob);
        window.URL.revokeObjectURL(previewUrl);
        setPreviewUrl(window.URL.createObjectURL(blob));
      }, "image/jpeg");
    });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-4">
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            className=" form-control my-1"
          />
        </div>
      </div>

      <div className="row justify-content-center align-items-center">
        <div className="col-lg-7">
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={makeClientCrop}
          />
        </div>
        <div className="col-lg-5">
          {previewUrl && <img alt="Crop preview" src={previewUrl} />}
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-2">
          <button
            onClick={onUpload}
            disabled={previewUrl ? false : true}
            className="btn btn-block btn-primary my-1"
          >
            {!loading ? "Upload" : "Uploading..."}
          </button>
        </div>
        <div className="col-lg-2">
          <Link to={`/me`} className="btn btn-block btn-danger my-1">
            Cancel
          </Link>
        </div>
        {redirect && <Redirect to="/me" />}
      </div>
    </div>
  );
}
