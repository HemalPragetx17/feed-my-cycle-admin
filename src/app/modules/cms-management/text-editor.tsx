import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Col, Form, Row } from "react-bootstrap";

const TextEditor = ({
  data,
  onChange,
}: {
  data: string | any;
  onChange: (newData: any) => void;
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  const isInitializedRef = useRef(false);

  // Initialize Quill only once
  useEffect(() => {
    if (editorRef.current && !isInitializedRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["code-block"],
            [{ size: ["small", false, "large", "huge"] }],
            ["clean"],
            [{ script: "sub" }, { script: "super" }],
          ],
        },
      });
      quillRef.current = quill;
      isInitializedRef.current = true;

      quill.on("text-change", () => {
        const newData = quill.root.innerHTML;
        onChange(newData);
      });
    }
  }, []);

  // Update editor content when data changes
  useEffect(() => {
    if (quillRef.current && isInitializedRef.current) {
      // Extract content string from data
      let contentString = "";

      if (typeof data === "string") {
        contentString = data;
      } else if (data && typeof data === "object") {
        // If data is an object/array, try to extract content property
        contentString = data.content || data.text || data.html || "";
        // If it's an array with content, get the first item's content
        if (Array.isArray(data) && data.length > 0) {
          contentString = data[0]?.content || data[0]?.text || data[0]?.html || "";
        }
      }

      // Only update if content is different to avoid unnecessary updates
      const currentContent = quillRef.current.root.innerHTML;
      if (contentString && contentString !== currentContent) {
        try {
          quillRef.current.clipboard.dangerouslyPasteHTML(contentString);
        } catch (error) {
          console.error("Error pasting HTML to Quill:", error);
          // Fallback: try setting as plain text
          if (contentString) {
            quillRef.current.setText(contentString);
          }
        }
      } else if (!contentString && currentContent) {
        // Clear editor if no content
        quillRef.current.setText("");
      }
    }
  }, [data]);

  return (
    <Row>
      <Col lg={12}>
        <div>
          <Form.Group controlId="formBasicEmail">
            <div ref={editorRef} style={{ minHeight: "300px" }} />
          </Form.Group>
        </div>
      </Col>
    </Row>
  );
};

export default TextEditor;
