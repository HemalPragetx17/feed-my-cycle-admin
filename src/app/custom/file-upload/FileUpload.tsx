import { useState, useRef, DragEvent, ChangeEvent, useEffect } from "react";
import { fileValidation } from "../../../Global/fileValidation";

type FileUploadProps = {
  accept?: string;
  fileType: "image" | "pdf" | "excel";
  value?: File | string | null;
  onChange: (file: File | null) => void;
  onRemove?: () => void;
  label?: string;
  required?: boolean;
  error?: string;
  className?: string; 
};

const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  fileType,
  value,
  onChange,
  onRemove,
  label,
  required = false,
  error,
  className
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize preview from value
  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        setPreview(value);
      } else if (value instanceof File) {
        if (fileType === "image") {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(value);
        } else if (fileType === "pdf") {
          setPreview(URL.createObjectURL(value));
        } else {
          // For Excel and other file types, set placeholder preview
          setPreview("excel-file");
        }
      }
    } else {
      setPreview(null);
    }
  }, [value, fileType]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (fileType === "image") {
      if (fileValidation(file)) {
        onChange(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    } else if (fileType === "pdf") {
      if (file.type === "application/pdf") {
        onChange(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      } else {
        alert("Please upload a PDF file only.");
      }
    } else if (fileType === "excel") {
      if (file.name.endsWith(".xls")) {
        onChange(file);
        // Set a placeholder preview for Excel files
        setPreview("excel-file");
      } else {
        alert("Please upload an Excel file only.");
      }
    }
  };

  const handleRemove = () => {
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onRemove) {
      onRemove();
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const getAcceptType = () => {
    if (accept) return accept;
    return fileType === "image" ? "image/*" : fileType === "pdf" ? "application/pdf" : ".xls";
  };

  const getFileTypeText = () => {
    return fileType === "image" ? "image file" : fileType === "pdf" ? "PDF file" : "Excel file";
  };

  return (
    <div className="w-100">
      {label && (
        <label className="fs-6 fw-bold mb-2 d-block">
          {label} {required && ''}
        </label>
      )}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragging ? "#0d6efd" : "#dee2e6"}`,
          borderRadius: "8px",
          padding: "40px 20px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: isDragging ? "#f8f9fa" : "#fff",
          transition: "all 0.3s ease",
        }}
        className={className}
      >
        {!preview ? (
          <>
            <div style={{ marginBottom: "12px" }}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "#6c757d" }}
              >
                <path
                  d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 2V8H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18V12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 15H15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={{ color: "#0d6efd", fontWeight: 500, marginBottom: "8px" }}>
              Drop file here or click to upload
            </div>
            <div style={{ color: "#6c757d", fontSize: "14px" }}>
              You can upload {getFileTypeText()}
            </div>
          </>
        ) : (
          <div style={{ position: "relative", display: "inline-block" }}>
            {fileType === "image" ? (
              <img
                src={preview}
                alt="Preview"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  borderRadius: "8px",
                  border: "1px solid #dee2e6",
                }}
              />
            ) : (
              <div
                style={{
                  padding: "20px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  border: "1px solid #dee2e6",
                  minWidth: "200px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px"
                }}
              >
                <div>
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: fileType === "pdf" ? "#dc3545" : "#217346" }}
                  >
                    <path
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V8H20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {fileType === "excel" && (
                      <>
                        <path
                          d="M10 9L14 15M14 9L10 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </>
                    )}
                  </svg>
                </div>
                <div style={{ 
                  color: "#212529", 
                  fontWeight: 500, 
                  fontSize: "14px",
                  textAlign: "center",
                  wordBreak: "break-word",
                  maxWidth: "180px"
                }}>
                  {value instanceof File ? value.name : fileType === "pdf" ? "PDF File" : "Excel File"}
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              }}
              title="Remove file"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={getAcceptType()}
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>
      {error && <div className="text-danger mt-1" style={{ fontSize: "14px" }}>{error}</div>}
    </div>
  );
};

export default FileUpload;

