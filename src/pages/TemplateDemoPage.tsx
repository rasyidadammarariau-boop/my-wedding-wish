import { useParams } from "react-router-dom";
import ElegantRoseDemo from "@/components/demo/ElegantRoseDemo";
import MinimalistWhiteDemo from "@/components/demo/MinimalistWhiteDemo";
import ModernDarkDemo from "@/components/demo/ModernDarkDemo";
import RusticGardenDemo from "@/components/demo/RusticGardenDemo";
import FloralDreamDemo from "@/components/demo/FloralDreamDemo";
import ClassicGoldDemo from "@/components/demo/ClassicGoldDemo";
import BatikJawaDemo from "@/components/demo/BatikJawaDemo";
import BaliHinduDemo from "@/components/demo/BaliHinduDemo";
import MinangkabauDemo from "@/components/demo/MinangkabauDemo";
import BugisMakassarDemo from "@/components/demo/BugisMakassarDemo";

const TemplateDemoPage = () => {
  const { templateId } = useParams();

  switch (templateId) {
    case "elegant-rose":
      return <ElegantRoseDemo />;
    case "minimalist-white":
      return <MinimalistWhiteDemo />;
    case "modern-dark":
      return <ModernDarkDemo />;
    case "rustic-garden":
      return <RusticGardenDemo />;
    case "floral-dream":
      return <FloralDreamDemo />;
    case "classic-gold":
      return <ClassicGoldDemo />;
    case "batik-jawa":
      return <BatikJawaDemo />;
    case "bali-hindu":
      return <BaliHinduDemo />;
    case "minangkabau":
      return <MinangkabauDemo />;
    case "bugis-makassar":
      return <BugisMakassarDemo />;
    default:
      return <ElegantRoseDemo />;
  }
};

export default TemplateDemoPage;
