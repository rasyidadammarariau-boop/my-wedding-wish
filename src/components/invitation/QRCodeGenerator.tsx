import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QRCodeGeneratorProps {
  url: string;
  size?: number;
  className?: string;
}

const QRCodeGenerator = ({ url, size = 150, className = "" }: QRCodeGeneratorProps) => {
  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = size * 2;
      canvas.height = size * 2;
      ctx?.drawImage(img, 0, 0, size * 2, size * 2);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-undangan.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <QRCodeSVG
          id="qr-code-svg"
          value={url}
          size={size}
          level="H"
          includeMargin
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
      <p className="text-sm text-muted-foreground text-center max-w-[200px]">
        Scan QR Code untuk membuka undangan
      </p>
      <Button variant="outline" size="sm" onClick={downloadQRCode}>
        <Download className="h-4 w-4 mr-2" />
        Download QR
      </Button>
    </div>
  );
};

export default QRCodeGenerator;
