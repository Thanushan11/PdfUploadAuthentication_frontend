import { useEffect, useState } from 'react'
import React from 'react'
import axios from 'axios';
import "./pdf.css"



export const Pdf = () => {
    const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allPdf, setAllPdf] = useState([]);
  

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    try {
      // const token = localStorage.getItem("token");
      const result = await axios.get("http://localhost:8080/api/pdf/get-files");
      setAllPdf(result.data.data);
    } catch (error) {
      console.error("Error fetching PDF files", error);
    }
  };

  const submitFile = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const result = await axios.post(
        "http://localhost:8080/api/pdf/upload-files",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
        getPdf();
      }
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const showPdf = (pdf) => {
    window.open(`http://localhost:8080/api/files/${pdf}`, "_blank", "noreferrer");
  
  };

  
  return (
    <div className='pdf'>
      <div className="right"><form onSubmit={submitFile}>
        <h3>Upload PDF</h3>
        <input
          type="text"
          className='pdf-name'
          placeholder='PDF Title'
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          className='pdf-pdf'
          accept='application/pdf'
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="pdf-button" type='submit'>Submit</button>
      </form></div>

      <div className="left">
         <div className="uploadedFile">
        <h4>Uploaded PDFs</h4>
        {allPdf.length === 0 ? (
          <p>No PDFs uploaded yet.</p>
        ) : (
          allPdf.map((data) => (
            <div className="inner-div">
              <h6>Title: {data.title}</h6>
              <button
                className="button"
                onClick={() => showPdf(data.pdf)}
              >
                Show PDF
              </button>
            </div>
          ))
        )}
      </div>
      </div>
      
     

    </div>
  );
};