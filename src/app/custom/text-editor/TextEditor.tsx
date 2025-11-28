import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface TextEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  className?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ value = '', onChange, placeholder = 'Enter text...', className = '' }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image'],
            ['clean']
          ]
        }
      });

      if (value) {
        quillRef.current.root.innerHTML = value;
      }

      quillRef.current.on('text-change', () => {
        if (onChange && quillRef.current) {
          const content = quillRef.current.root.innerHTML;
          onChange(content);
        }
      });
    }

    return () => {
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      const currentContent = quillRef.current.root.innerHTML;
      if (value !== currentContent) {
        quillRef.current.root.innerHTML = value;
      }
    }
  }, [value]);

  return (
    <div className={className}>
      <div ref={editorRef} style={{ minHeight: '200px' }} />
    </div>
  );
};

export default TextEditor;

