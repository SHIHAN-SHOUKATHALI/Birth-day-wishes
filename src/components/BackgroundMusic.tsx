import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // Default volume at 20% for a soft, calm feel
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [musicSrc, setMusicSrc] = useState("/viacheslavstarostin-piano-background-music-soft-344547.mp3");
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Ensure audio is always unmuted (speaker mode) on load
    audio.muted = false;
    setIsMuted(false);
    audio.volume = 0; // Start at 0 for fade-in
    audio.loop = true;
    audio.crossOrigin = "anonymous";

    // Fade-in effect for a soft, gentle start
    const fadeIn = () => {
      // Always use volume (not muted) for speaker mode
      const targetVolume = volume;
      const fadeInterval = setInterval(() => {
        if (audio.volume < targetVolume) {
          audio.volume = Math.min(audio.volume + 0.05, targetVolume);
        } else {
          clearInterval(fadeInterval);
        }
      }, 100);
    };

    // Fallback handler for user interaction if autoplay fails
    const handleUserInteraction = () => {
      if (audio.paused) {
        // Ensure unmuted before playing
        audio.muted = false;
        setIsMuted(false);
        audio.play()
          .then(() => {
            setIsPlaying(true);
            fadeIn();
          })
          .catch(() => {
            // Still failed, user will need to click play button
          });
      }
    };

    // Try to auto-play immediately when component loads
    const attemptAutoplay = async () => {
      try {
        // Ensure unmuted before playing
        audio.muted = false;
        setIsMuted(false);
        await audio.play();
        setIsPlaying(true);
        fadeIn(); // Gentle fade-in when music starts
      } catch (error) {
        // Autoplay was prevented by browser policy
        // Fall back to playing on user interaction
        window.addEventListener("click", handleUserInteraction, { once: true });
        window.addEventListener("touchstart", handleUserInteraction, { once: true });
      }
    };

    // Small delay to ensure audio is ready, then attempt autoplay
    const timer = setTimeout(() => {
      attemptAutoplay();
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Ensure audio is always unmuted (speaker mode)
    audio.muted = isMuted;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // Fade-out effect for a soft stop
      const fadeOut = setInterval(() => {
        if (audio.volume > 0) {
          audio.volume = Math.max(audio.volume - 0.1, 0);
        } else {
          clearInterval(fadeOut);
          audio.pause();
          setIsPlaying(false);
        }
      }, 50);
    } else {
      audio.volume = 0; // Start at 0
      audio.play()
        .then(() => {
          setIsPlaying(true);
          // Gentle fade-in
          const fadeIn = setInterval(() => {
            const targetVolume = isMuted ? 0 : volume;
            if (audio.volume < targetVolume) {
              audio.volume = Math.min(audio.volume + 0.05, targetVolume);
            } else {
              clearInterval(fadeIn);
            }
          }, 100);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
        });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={musicSrc}
        preload="auto"
        autoPlay
        muted={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => {
          // Fallback to a free calm, soft, feel-good music URL if local file doesn't exist
          // Using a gentle, peaceful track perfect for emotional moments
          if (musicSrc === "/viacheslavstarostin-piano-background-music-soft-344547.mp3") {
            // Fallback music if the file can't be loaded
            setMusicSrc("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
          }
        }}
      />
      
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-4 border"
              style={{ borderColor: "hsl(var(--gold-light) / 0.3)" }}
            >
              <div className="flex items-center gap-3">
                {/* Music Icon */}
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
                  <span className="text-sm font-medium hidden sm:inline" style={{ color: "hsl(var(--foreground))" }}>
                    Music
                  </span>
                </div>

                {/* Play/Pause Button */}
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  style={{ color: "hsl(var(--primary))" }}
                >
                  {isPlaying ? (
                    <Volume2 className="w-5 h-5" />
                  ) : (
                    <VolumeX className="w-5 h-5" />
                  )}
                </Button>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 min-w-[100px]">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(isMuted ? 0 : volume) * 100}%, hsl(var(--muted)) ${(isMuted ? 0 : volume) * 100}%, hsl(var(--muted)) 100%)`,
                    }}
                  />
                </div>

                {/* Mute Button */}
                <Button
                  onClick={toggleMute}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </Button>

                {/* Hide Controls Button */}
                <Button
                  onClick={() => setShowControls(false)}
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-xs"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                >
                  ×
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show Controls Button (when hidden) */}
      {!showControls && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            onClick={() => setShowControls(true)}
            variant="ghost"
            size="sm"
            className="rounded-full bg-white/95 backdrop-blur-sm shadow-lg border"
            style={{ borderColor: "hsl(var(--gold-light) / 0.3)" }}
          >
            <Music className="w-5 h-5" style={{ color: "hsl(var(--primary))" }} />
          </Button>
        </motion.div>
      )}
    </>
  );
};
