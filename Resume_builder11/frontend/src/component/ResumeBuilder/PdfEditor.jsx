import React, { useState, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaDownload, FaEdit, FaSave } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { axiosInstance, endPoints } from '../../api/axios';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfEditor = ({ resumeData, onSave }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (resumeData) {
      setEditedContent(resumeData.content || '');
    }
  }, [resumeData]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.1, 2.0));
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.1, 0.5));
  };

  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        endPoints.resume.downloadPdf,
        { content: editedContent },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('PDF downloaded successfully');
    } catch (error) {
      toast.error('Error downloading PDF');
      console.error('Download error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDOC = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        endPoints.resume.downloadDoc,
        { content: editedContent },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'resume.doc');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success('DOC downloaded successfully');
    } catch (error) {
      toast.error('Error downloading DOC');
      console.error('Download error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await onSave(editedContent);
      setIsEditing(false);
      toast.success('Changes saved successfully');
    } catch (error) {
      toast.error('Error saving changes');
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleZoomOut}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Zoom Out
          </button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <button
            onClick={handleZoomIn}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Zoom In
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
            disabled={loading}
          >
            <FaEdit className="mr-2" />
            {isEditing ? 'View PDF' : 'Edit Content'}
          </button>
          {isEditing && (
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
              disabled={loading}
            >
              <FaSave className="mr-2" />
              Save
            </button>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              disabled={loading}
            >
              <FaDownload className="mr-2" />
              PDF
            </button>
            <button
              onClick={handleDownloadDOC}
              className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              disabled={loading}
            >
              <FaDownload className="mr-2" />
              DOC
            </button>
          </div>
        </div>
      </div>

      {/* Editor/Viewer */}
      <div className="flex-1 p-4 overflow-auto">
        {isEditing ? (
          <div className="h-full">
            <textarea
              ref={editorRef}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-full p-4 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Edit your resume content here..."
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <Document
              file={resumeData?.pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div>Loading PDF...</div>}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        )}
      </div>

      {/* Page Navigation */}
      {!isEditing && numPages > 1 && (
        <div className="flex items-center justify-center p-4 border-t">
          <button
            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
            disabled={pageNumber <= 1}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="mx-4 text-sm">
            Page {pageNumber} of {numPages}
          </span>
          <button
            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
            disabled={pageNumber >= numPages}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PdfEditor; 