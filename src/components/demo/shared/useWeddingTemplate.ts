import { useState, useEffect } from "react";
import { dummyComments } from "./WeddingData";

export const useWeddingTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeGallery, setActiveGallery] = useState(0);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [comments, setComments] = useState(dummyComments);
  const [newComment, setNewComment] = useState({ name: "", message: "", presence: "hadir" });

  useEffect(() => {
    const weddingDate = new Date("2026-02-15T08:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
  };
};
