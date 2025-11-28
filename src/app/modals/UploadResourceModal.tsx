import React, { useEffect, useState } from "react";
import { Modal, FormLabel } from "react-bootstrap";
import { CustomSelectWhite } from "../custom/select/CustomSelectWhite";

export type UploadResourcePayload = {
  title: string;
  description?: string;
  category: string;
  type: "Drill" | "Video" | "PDF";
  visibility: "Public" | "Coaches Only";
  tags: string[];
  file?: File | null;
};

type Props = {
  show: boolean;
  onHide: () => void;
  onSave: (payload: UploadResourcePayload) => void;
  categories: { label: string; value: string }[];
  typeOptions: { label: string; value: "Drill" | "Video" | "PDF" }[];
  visibilityOptions: { label: string; value: "Public" | "Coaches Only" }[];
};

function UploadResourceModal({ show, onHide, onSave, categories, typeOptions, visibilityOptions }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState<any>(null);
  const [type, setType] = useState<any>(null);
  const [visibility, setVisibility] = useState<any>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prev || "";
    }
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [show]);

  const handleClose = () => {
    onHide();
  };

  const handleSave = () => {
    if (!title || !category?.value || !type?.value || !visibility?.value) return;
    onSave({
      title,
      description: desc,
      category: category.value,
      type: type.value,
      visibility: visibility.value,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      file,
    });
    setTitle("");
    setDesc("");
    setCategory(null);
    setType(null);
    setVisibility(null);
    setTagsInput("");
    setFile(null);
  };

  return (
    <Modal show={show} onHide={handleClose} centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Upload Resource</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <FormLabel>Title</FormLabel>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <FormLabel>Description</FormLabel>
          <textarea className="form-control" rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className="mb-3">
          <FormLabel>Category</FormLabel>
          <CustomSelectWhite placeholder="Select Category" isSearchable={false} onChange={setCategory} options={categories} isClearable={false} />
        </div>
        <div className="mb-3">
          <FormLabel>Type</FormLabel>
          <CustomSelectWhite placeholder="Select Type" isSearchable={false} onChange={setType} options={typeOptions} isClearable={false} />
        </div>
        <div className="mb-3">
          <FormLabel>Visibility</FormLabel>
          <CustomSelectWhite placeholder="Select Visibility" isSearchable={false} onChange={setVisibility} options={visibilityOptions} isClearable={false} />
        </div>
        <div className="mb-3">
          <FormLabel>Tags (comma separated)</FormLabel>
          <input className="form-control" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
        </div>
        <div className="mb-3">
          <FormLabel>File</FormLabel>
          <input type="file" className="form-control" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-light" onClick={handleClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save</button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadResourceModal;
