import { useParams } from "react-router-dom";
import ElegantRoseDemo from "@/components/demo/ElegantRoseDemo";
import MinimalistWhiteDemo from "@/components/demo/MinimalistWhiteDemo";
import ModernDarkDemo from "@/components/demo/ModernDarkDemo";
import RusticGardenDemo from "@/components/demo/RusticGardenDemo";
import FloralDreamDemo from "@/components/demo/FloralDreamDemo";
import ClassicGoldDemo from "@/components/demo/ClassicGoldDemo";

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
    default:
      return <ElegantRoseDemo />;
  }
};

export default TemplateDemoPage;
