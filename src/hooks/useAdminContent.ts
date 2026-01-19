import { useState, useEffect } from "react";
import { 
  getDefaultContent, 
  getActiveMusicTracks, 
  getTemplates,
  DefaultContent,
  MusicTrack,
  TemplateSettings 
} from "@/stores/adminSettingsStore";

export interface WeddingContent extends DefaultContent {
  story: {
    title: string;
    date: string;
    content: string;
  }[];
}

export const useAdminContent = () => {
  const [content, setContent] = useState<WeddingContent | null>(null);
  const [musicTracks, setMusicTracks] = useState<MusicTrack[]>([]);
  const [templates, setTemplates] = useState<TemplateSettings[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSettings = () => {
      try {
        const defaultContent = getDefaultContent();
        const tracks = getActiveMusicTracks();
        const templateList = getTemplates();

        // Map loveStory to story for compatibility with existing components
        const weddingContent: WeddingContent = {
          ...defaultContent,
          story: defaultContent.loveStory,
        };

        setContent(weddingContent);
        setMusicTracks(tracks);
        setTemplates(templateList);
      } catch (error) {
        console.error("Error loading admin settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();

    // Listen for storage changes to update in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "weddingku_admin_settings") {
        loadSettings();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Manual refresh function for same-tab updates
  const refreshContent = () => {
    const defaultContent = getDefaultContent();
    const tracks = getActiveMusicTracks();
    const templateList = getTemplates();

    const weddingContent: WeddingContent = {
      ...defaultContent,
      story: defaultContent.loveStory,
    };

    setContent(weddingContent);
    setMusicTracks(tracks);
    setTemplates(templateList);
  };

  // Convert music tracks to song format for MusicPlayer
  const songs = musicTracks.map(track => ({
    title: track.title,
    artist: track.artist,
    url: track.url,
  }));

  // Get template settings by ID
  const getTemplateById = (id: string): TemplateSettings | undefined => {
    return templates.find(t => t.id === id);
  };

  // Check if a feature is enabled for a template
  const hasFeature = (templateId: string, feature: string): boolean => {
    const template = getTemplateById(templateId);
    return template?.features.includes(feature) ?? true;
  };

  return {
    content,
    musicTracks,
    songs,
    templates,
    isLoading,
    refreshContent,
    getTemplateById,
    hasFeature,
  };
};

export default useAdminContent;
