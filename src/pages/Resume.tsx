import { useState, useCallback, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Download } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Resume = () => {
  const [showFallback, setShowFallback] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      updateWidth();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const pdfUrl = '/assets/Dhrubaraj-Resume.pdf';

  const googleDriveEmbedUrl =
    'https://drive.google.com/file/d/1TgvTdHcIS5NU6A7DsnAnLPkUeR1rB693/preview';

  const pdfDownloadUrl =
    'https://drive.google.com/uc?export=download&id=1TgvTdHcIS5NU6A7DsnAnLPkUeR1rB693';

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

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20 md:pt-28 pb-16">
      <div className="max-w-3xl mx-auto w-full px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-12">
            <h4 className="text-3xl md:text-5xl font-bold font-excon mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
              Resume
            </h4>
            <p className="text-[#909092] max-w-md mx-auto font-poppins pb-4 border-b border-neutral-800/60">
              My professional resume and experience overview.
            </p>
          </div>
        </ScrollReveal>

        {/* Resume Viewer */}
        <ScrollReveal delay={0.1}>
          <div className="w-full flex justify-center">
            <div ref={containerRef} className="relative bg-white rounded-lg shadow-2xl overflow-hidden w-full">
              {showFallback ? (
                <iframe
                  src={googleDriveEmbedUrl}
                  className="w-full h-[65vh] sm:h-[90vh] border-0"
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
                        <p className="text-[#909092] font-medium">Loading resume...</p>
                      </div>
                    </div>
                  </div>
                  <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={
                      <div className="flex items-center justify-center h-[65vh] sm:h-[90vh] w-full">
                        <div className="text-center">
                          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800 mx-auto mb-4"></div>
                          <p className="text-[#909092]">Loading resume...</p>
                        </div>
                      </div>
                    }
                    className="flex justify-center"
                  >
                    {containerWidth > 0 && (
                      <Page
                        pageNumber={1}
                        width={containerWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className={`transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'
                          }`}
                      />
                    )}
                  </Document>
                </>
              )}
            </div>
          </div>
        </ScrollReveal>

        {/* Download Button */}
        <ScrollReveal delay={0.15}>
          <div className="text-center mt-8 sm:mt-12">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] border border-neutral-800 rounded-xl text-neutral-300 hover:border-neutral-700 hover:bg-[#1a1a1a] transition-all duration-300 group shadow-lg shadow-black/20 text-xs font-semibold font-outfit"
            >
              <span>Download Resume</span>
              <Download className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white transition-colors" />
            </button>
          </div>
        </ScrollReveal>

        {/* Footer */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-sm text-[#909092] font-satoshi">
              Resume last updated: January 2026
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Resume;
