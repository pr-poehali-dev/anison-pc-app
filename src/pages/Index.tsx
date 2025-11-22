import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  cover: string;
}

const tracks: Track[] = [
  {
    id: 1,
    title: "Night Lights",
    artist: "Electronic Dreams",
    duration: 234,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Midnight City",
    artist: "Neon Waves",
    duration: 198,
    cover: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Summer Breeze",
    artist: "Chill Vibes",
    duration: 267,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Lost in Tokyo",
    artist: "Urban Sounds",
    duration: 189,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Ocean Waves",
    artist: "Ambient Flow",
    duration: 312,
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop"
  }
];

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([75]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1;
    setCurrentTrack(tracks[prevIndex]);
    setCurrentTime(0);
  };

  const handleTrackSelect = (track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <Card className="p-8 backdrop-blur-xl bg-card/50 border-border/50 animate-fade-in">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl group">
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="text-center space-y-2 w-full">
              <h1 className="text-3xl font-bold text-foreground">{currentTrack.title}</h1>
              <p className="text-lg text-muted-foreground">{currentTrack.artist}</p>
            </div>

            <div className="w-full space-y-2">
              <Slider 
                value={[currentTime]} 
                max={currentTrack.duration}
                step={1}
                onValueChange={handleSeek}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentTrack.duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handlePrevious}
                className="hover:bg-secondary/80 transition-all hover:scale-110"
              >
                <Icon name="SkipBack" size={24} />
              </Button>

              <Button 
                size="icon"
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
              >
                {isPlaying ? (
                  <Icon name="Pause" size={28} />
                ) : (
                  <Icon name="Play" size={28} className="ml-1" />
                )}
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleNext}
                className="hover:bg-secondary/80 transition-all hover:scale-110"
              >
                <Icon name="SkipForward" size={24} />
              </Button>
            </div>

            <div className="flex items-center gap-3 w-full max-w-xs">
              <Icon name="Volume2" size={20} className="text-muted-foreground" />
              <Slider 
                value={volume} 
                max={100}
                step={1}
                onValueChange={setVolume}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-10 text-right">{volume[0]}%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-xl bg-card/50 border-border/50 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-foreground">Playlist</h2>
            <Icon name="ListMusic" size={24} className="text-muted-foreground" />
          </div>
          
          <div className="space-y-2 overflow-y-auto max-h-[600px] pr-2">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => handleTrackSelect(track)}
                className={`
                  flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200
                  hover:bg-secondary/60 group
                  ${currentTrack.id === track.id ? 'bg-secondary/80' : 'bg-muted/20'}
                `}
              >
                <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={track.cover} 
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                  {currentTrack.id === track.id && isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <div className="w-1 h-3 bg-primary animate-pulse-slow" style={{ animationDelay: '0ms' }} />
                        <div className="w-1 h-4 bg-primary animate-pulse-slow" style={{ animationDelay: '150ms' }} />
                        <div className="w-1 h-3 bg-primary animate-pulse-slow" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${currentTrack.id === track.id ? 'text-primary' : 'text-foreground'}`}>
                    {track.title}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
                </div>

                <span className="text-sm text-muted-foreground">{formatTime(track.duration)}</span>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Index;
