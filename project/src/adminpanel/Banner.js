import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { baseurl } from "../Config/config";
import "./adminstyle.css";

const Banner = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please select an image.");
      return;
    }
    
    const data = new FormData();
    data.append("image", image);

    try {
      const res = await axios.post(`${baseurl}/post/banner`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });
      console.log(res.data);
      toast.success("Banner added successfully");
      navigate("/AdminPanel/Bannerlist");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image.");
    }
  };

  return (
    <div className="banner-container">
      <h1>Add Banner</h1>
      <form onSubmit={submit} className="upload-box">
        <div className="drop-area">
          {preview ? (
            <img src={preview} alt="Preview" className="preview-image" />
          ) : (
            <p>Drop your image here, or <span className="browse">browse</span></p>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        {uploadProgress > 0 && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
        <button type="submit" className="btn btn-success mt-2">Upload Banner</button>
      </form>
    </div>
  );
};

export default Banner;
