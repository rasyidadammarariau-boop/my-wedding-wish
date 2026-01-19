import { useState, useEffect } from "react";
import { dummyComments, getWeddingData } from "./WeddingData";
import { getDefaultContent, getActiveMusicTracks, getTemplates, TemplateSettings, MusicTrack } from "@/stores/adminSettingsStore";

export const useWeddingTemplate = (templateId?: string) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [comments, setComments] = useState(dummyComments);
  const [newComment, setNewComment] = useState({ name: "", message: "", presence: "hadir" });
  
  // Dynamic content from admin settings
  const [weddingData, setWeddingData] = useState(getWeddingData());
  const [musicTracks, setMusicTracks] = useState<MusicTrack[]>([]);
  const [templateSettings, setTemplateSettings] = useState<TemplateSettings | null>(null);

  // Load admin settings
  useEffect(() => {
    const loadSettings = () => {
      setWeddingData(getWeddingData());
      setMusicTracks(getActiveMusicTracks());
      
      if (templateId) {
        const templates = getTemplates();
        const template = templates.find(t => t.id === templateId);
        if (template) {
          setTemplateSettings(template);
        }
      }
    };

    loadSettings();

    // Listen for storage changes (cross-tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "weddingku_admin_settings") {
        loadSettings();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [templateId]);

  // Parse date from admin settings for countdown
  useEffect(() => {
    // Parse Indonesian date format "Sabtu, 15 Februari 2026"
    const parseDateFromString = (dateStr: string): Date => {
      const months: Record<string, number> = {
        'Januari': 0, 'Februari': 1, 'Maret': 2, 'April': 3,
        'Mei': 4, 'Juni': 5, 'Juli': 6, 'Agustus': 7,
        'September': 8, 'Oktober': 9, 'November': 10, 'Desember': 11
      };
      
      const match = dateStr.match(/(\d+)\s+(\w+)\s+(\d{4})/);
      if (match) {
        const day = parseInt(match[1]);
        const month = months[match[2]] ?? 1;
        const year = parseInt(match[3]);
        return new Date(year, month, day, 8, 0, 0);
      }
      return new Date("2026-02-15T08:00:00");
    };

    const weddingDate = parseDateFromString(weddingData.date).getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      setCountdown({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingData.date]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.name && newComment.message) {
      setComments([
        { id: Date.now(), ...newComment, time: "Baru saja" },
        ...comments,
      ]);
      setNewComment({ name: "", message: "", presence: "hadir" });
    }
  };

  // Convert music tracks to song format
  const songs = musicTracks.map(track => ({
    title: track.title,
    artist: track.artist,
    url: track.url,
  }));

  // Check if a feature is enabled
  const hasFeature = (feature: string): boolean => {
    if (!templateSettings) return true;
    return templateSettings.features.includes(feature);
  };

  // Refresh data manually (for same-tab updates)
  const refreshData = () => {
    setWeddingData(getWeddingData());
    setMusicTracks(getActiveMusicTracks());
    if (templateId) {
      const templates = getTemplates();
      const template = templates.find(t => t.id === templateId);
      if (template) {
        setTemplateSettings(template);
      }
    }
  };

  return {
    isOpen,
    setIsOpen,
    isMuted,
    setIsMuted,
    copied,
    activeGallery,
    setActiveGallery,
    countdown,
    comments,
    newComment,
    setNewComment,
    copyToClipboard,
    handleSubmitComment,
    // New dynamic data
    weddingData,
    songs,
    templateSettings,
    hasFeature,
    refreshData,
  };
};
