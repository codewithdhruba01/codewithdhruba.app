import { useState, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { DownloadIcon } from '../components/icons/SocialIcons';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Resume = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pageMounted, setPageMounted] = useState(false);

  const pdfUrl = '/assets/Dhrubaraj-Resume.pdf';

  const googleDriveEmbedUrl =
    'https://drive.google.com/file/d/1cG4JpomPxjYArI2Q-WyYb15h6y95Nlu0/preview';

  const pdfDownloadUrl =
    'https://drive.google.com/uc?export=download&id=1cG4JpomPxjYArI2Q-WyYb15h6y95Nlu0';

  useEffect(() => {
    setPageMounted(true);
  }, []);

  const onDocumentLoadSuccess = useCallback(() => {
    // Gradually remove blur after a short delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  const onDocumentLoadError = useCallback(() => {
    setShowFallback(true);
    setIsLoaded(true);
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
    <div
      className={`min-h-screen bg-neutral-950 flex flex-col items-center px-4 py-8 transition-all duration-700 ease-out ${pageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      {/* Header */}
      <div
        className={`text-center mb-8 mt-12 sm:mb-12 sm:mt-20 transition-all duration-700 delay-100 ease-out ${pageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold font-excon mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
          Resume
        </h1>
        <p className="text-[#9C9C9C] max-w-md mx-auto font-poppins">
          My professional resume and experience overview.
        </p>
        <div className="border-t border-gray-700 max-w-3xl mx-auto mb-12"></div>
      </div>

      {/* Resume Viewer */}
      <div className="w-full flex justify-center">
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden w-[95vw] sm:w-auto">
          {showFallback ? (
            <iframe
              src={googleDriveEmbedUrl}
              className="w-full sm:w-[900px] h-[65vh] sm:h-[90vh] border-0"
              title="Resume Viewer"
              allowFullScreen
            />
          ) : (
            <>
              <div
                className={`absolute inset-0 z-10 bg-white/80 backdrop-blur-md transition-all duration-1000 ease-out ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
              >
                <div className="flex items-center justify-center h-full w-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading resume...</p>
                  </div>
                </div>
              </div>
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
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
                  className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              </Document>
            </>
          )}
        </div>
      </div>

      {/* Download Button */}
      <div
        className={`text-center mt-8 sm:mt-12 transition-all duration-700 delay-200 ease-out ${pageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <button
          onClick={handleDownload}
          className="inline-flex items-center justify-center font-bold font-outfit px-8 py-3 bg-[#00DC82] text-black rounded-lg hover:bg-[#00b368] hover:text-black transition-all duration-500 ease-in-out gap-2"
        >
          <DownloadIcon size="18" className="!fill-black" />
          Download
        </button>
      </div>

      {/* Footer */}
      <div
        className={`text-center mt-6 sm:mt-8 transition-all duration-700 delay-300 ease-out ${pageMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
      >
        <p className="text-sm text-gray-400 font-satoshi">
          Resume last updated: January 2026
        </p>
      </div>
    </div>
  );
};

export default Resume;
