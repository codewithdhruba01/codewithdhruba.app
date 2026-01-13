import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download } from 'lucide-react';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Resume = () => {
  const [showFallback, setShowFallback] = useState(false);

  const pdfUrl = '/assets/Dhrubaraj_Resume.pdf';

  const googleDriveEmbedUrl =
    'https://drive.google.com/file/d/1oHW2CrfLdRfuC4oiN4eDOxZZ-9tGXmRk/preview';

  const pdfDownloadUrl =
    'https://drive.google.com/uc?export=download&id=1oHW2CrfLdRfuC4oiN4eDOxZZ-9tGXmRk';

  const onDocumentLoadError = useCallback(() => {
    setShowFallback(true);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfDownloadUrl;
    link.download = 'Dhrubaraj_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isMobile = window.innerWidth < 640;

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8 mt-10 sm:mb-12 sm:mt-16">
        <h1 className="text-4xl md:text-6xl font-bold font-excon text-white mb-4">
          Resume
        </h1>
        <p className="text-gray-300 max-w-md mx-auto">
          My professional resume and experience overview.
        </p>
      </div>

      {/* Resume Viewer */}
      <div className="w-full flex justify-center">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden w-[95vw] sm:w-auto">
          {showFallback ? (
            <iframe
              src={googleDriveEmbedUrl}
              className="w-full sm:w-[900px] h-[65vh] sm:h-[90vh] border-0"
              title="Resume Viewer"
              allowFullScreen
            />
          ) : (
            <Document
              file={pdfUrl}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="flex items-center justify-center h-[65vh] sm:h-[90vh] w-full sm:w-[900px]">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading resume...</p>
                  </div>
                </div>
              }
              className="flex justify-center"
            >
              <Page
                pageNumber={1}
                scale={isMobile ? 0.75 : 1.15}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          )}
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-8 sm:mt-12">
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full transition-all duration-300 hover:scale-105"
        >
          <Download size={18} />
          Download PDF
        </button>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 sm:mt-8">
        <p className="text-sm text-gray-400">
          Resume last updated: December 2024
        </p>
      </div>
    </div>
  );
};

export default Resume;
