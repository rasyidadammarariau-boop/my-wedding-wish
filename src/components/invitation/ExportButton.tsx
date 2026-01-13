import { useState, RefObject } from "react";
import html2canvas from "html2canvas";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ExportButtonProps {
  targetRef: RefObject<HTMLDivElement | null>;
  fileName?: string;
  className?: string;
}

const ExportButton = ({ targetRef, fileName = "undangan", className = "" }: ExportButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsImage = async () => {
    if (!targetRef.current) {
      toast.error("Element tidak ditemukan");
      return;
    }

    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      toast.success("Undangan berhasil diexport!");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Gagal mengexport undangan");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      onClick={exportAsImage} 
      disabled={isExporting}
      className={className}
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Mengexport...
        </>
      ) : (
        <>
          <Download className="h-4 w-4 mr-2" />
          Export Gambar
        </>
      )}
    </Button>
  );
};

export default ExportButton;
