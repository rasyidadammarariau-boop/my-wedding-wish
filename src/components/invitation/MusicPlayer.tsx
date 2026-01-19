import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Music, Pause, Play, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getActiveMusicTracks } from "@/stores/adminSettingsStore";

interface Song {
  title: string;
  artist: string;
  url: string;
}

interface MusicPlayerProps {
  songs?: Song[];
  autoPlay?: boolean;
  className?: string;
  variant?: "floating" | "embedded" | "minimal";
  accentColor?: string;
}

// Get songs from admin settings, with fallback
const getDefaultSongs = (): Song[] => {
  const tracks = getActiveMusicTracks();
  if (tracks.length > 0) {
    return tracks.map(track => ({
      title: track.title,
      artist: track.artist,
      url: track.url,
    }));
  }
  // Fallback if no tracks configured
  return [
    { title: "Beautiful In White", artist: "Shane Filan", url: "/music/beautiful-in-white.mp3" },
    { title: "Perfect", artist: "Ed Sheeran", url: "/music/perfect.mp3" },
    { title: "A Thousand Years", artist: "Christina Perri", url: "/music/a-thousand-years.mp3" },
    { title: "All of Me", artist: "John Legend", url: "/music/all-of-me.mp3" },
    { title: "Can't Help Falling In Love", artist: "Elvis Presley", url: "/music/cant-help-falling.mp3" },
  ];
};

const MusicPlayer = ({ 
  songs, 
  autoPlay = false, 
  className = "",
  variant = "floating",
  accentColor = "rose"
}: MusicPlayerProps) => {
  // Use provided songs or get from admin settings
  const playerSongs = songs && songs.length > 0 ? songs : getDefaultSongs();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = playerSongs[currentSongIndex];

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked by browser
      });
    }
  }, [autoPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playerSongs.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playerSongs.length) % playerSongs.length);
    setIsPlaying(true);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setShowPlaylist(false);
    setTimeout(() => audioRef.current?.play(), 100);
  };

  const handleEnded = () => {
    nextSong();
  };

  const colorClasses = {
    rose: {
      bg: "bg-rose-500",
      bgHover: "hover:bg-rose-600",
      bgLight: "bg-rose-50",
      border: "border-rose-200",
      text: "text-rose-600",
      progress: "bg-rose-500",
    },
    amber: {
      bg: "bg-amber-600",
      bgHover: "hover:bg-amber-700",
      bgLight: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      progress: "bg-amber-600",
    },
    emerald: {
      bg: "bg-emerald-600",
      bgHover: "hover:bg-emerald-700",
      bgLight: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      progress: "bg-emerald-600",
    },
    slate: {
      bg: "bg-slate-700",
      bgHover: "hover:bg-slate-800",
      bgLight: "bg-slate-100",
      border: "border-slate-300",
      text: "text-slate-700",
      progress: "bg-slate-700",
    },
    pink: {
      bg: "bg-pink-500",
      bgHover: "hover:bg-pink-600",
      bgLight: "bg-pink-50",
      border: "border-pink-200",
      text: "text-pink-600",
      progress: "bg-pink-500",
    },
  };

  const colors = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.rose;

  if (variant === "minimal") {
    return (
      <>
        <audio ref={audioRef} src={currentSong.url} onEnded={handleEnded} />
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={togglePlay}
          className={`shadow-lg bg-white/80 backdrop-blur ${className}`}
        >
          {isPlaying ? <VolumeX className="h-4 w-4" /> : <Music className="h-4 w-4" />}
        </Button>
      </>
    );
  }

  if (variant === "embedded") {
    return (
      <div className={`${colors.bgLight} rounded-2xl p-6 ${colors.border} border ${className}`}>
        <audio ref={audioRef} src={currentSong.url} onEnded={handleEnded} />
        
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center`}>
            <Music className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h4 className={`font-semibold ${colors.text}`}>{currentSong.title}</h4>
            <p className="text-sm text-gray-500">{currentSong.artist}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 rounded-full mb-4 overflow-hidden">
          <div 
            className={`h-full ${colors.progress} transition-all duration-300`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="icon" onClick={prevSong}>
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            onClick={togglePlay}
            className={`${colors.bg} ${colors.bgHover} text-white h-12 w-12 rounded-full`}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextSong}>
            <SkipForward className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
        </div>

        {/* Playlist */}
        {playerSongs.length > 1 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Daftar Lagu ({playerSongs.length})</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {playerSongs.map((song, index) => (
                <button
                  key={index}
                  onClick={() => selectSong(index)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    index === currentSongIndex 
                      ? `${colors.bg} text-white` 
                      : "hover:bg-gray-100"
                  }`}
                >
                  {song.title} - {song.artist}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Floating variant (default)
  return (
    <>
      <audio ref={audioRef} src={currentSong.url} onEnded={handleEnded} />
      
      <div className={`fixed bottom-20 right-4 z-40 ${className}`}>
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className={`absolute bottom-full right-0 mb-2 w-72 ${colors.bgLight} rounded-xl shadow-xl border ${colors.border} overflow-hidden`}
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                    <Music className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-sm truncate ${colors.text}`}>{currentSong.title}</p>
                    <p className="text-xs text-gray-500 truncate">{currentSong.artist}</p>
                  </div>
                </div>

                {/* Progress */}
                <div className="h-1 bg-gray-200 rounded-full mb-3 overflow-hidden">
                  <div 
                    className={`h-full ${colors.progress} transition-all duration-300`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-2">
                  <Button variant="ghost" size="icon" onClick={prevSong} className="h-8 w-8">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    onClick={togglePlay}
                    className={`${colors.bg} ${colors.bgHover} text-white h-10 w-10 rounded-full`}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={nextSong} className="h-8 w-8">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Song list */}
              {playerSongs.length > 1 && (
                <div className="border-t border-gray-200 max-h-40 overflow-y-auto">
                  {playerSongs.map((song, index) => (
                    <button
                      key={index}
                      onClick={() => selectSong(index)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                        index === currentSongIndex 
                          ? `${colors.bgLight} ${colors.text} font-medium` 
                          : "hover:bg-gray-50"
                      }`}
                    >
                      {index === currentSongIndex && isPlaying && (
                        <span className="flex gap-0.5">
                          <span className={`w-0.5 h-3 ${colors.bg} animate-pulse`} style={{ animationDelay: "0ms" }} />
                          <span className={`w-0.5 h-2 ${colors.bg} animate-pulse`} style={{ animationDelay: "150ms" }} />
                          <span className={`w-0.5 h-3 ${colors.bg} animate-pulse`} style={{ animationDelay: "300ms" }} />
                        </span>
                      )}
                      <span className="truncate">{song.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPlaylist(!showPlaylist)}
          className={`${colors.bg} ${colors.bgHover} text-white p-4 rounded-full shadow-lg relative`}
        >
          {isPlaying ? (
            <div className="flex items-center gap-0.5">
              <span className="w-0.5 h-4 bg-white rounded animate-pulse" style={{ animationDelay: "0ms" }} />
              <span className="w-0.5 h-3 bg-white rounded animate-pulse" style={{ animationDelay: "150ms" }} />
              <span className="w-0.5 h-4 bg-white rounded animate-pulse" style={{ animationDelay: "300ms" }} />
              <span className="w-0.5 h-2 bg-white rounded animate-pulse" style={{ animationDelay: "450ms" }} />
            </div>
          ) : (
            <Music className="h-5 w-5" />
          )}
        </motion.button>
      </div>
    </>
  );
};

export default MusicPlayer;
