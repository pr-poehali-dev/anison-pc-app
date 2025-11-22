import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  anime: string;
  artist: string;
  duration: string;
  cover: string;
  orderedBy?: string;
}

interface User {
  name: string;
  avatar: string;
  level: number;
  points: number;
  orders: number;
}

const currentTrack: Track = {
  id: 1,
  title: "Gurenge",
  anime: "Kimetsu no Yaiba",
  artist: "LiSA",
  duration: "4:08",
  cover: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop"
};

const recentTracks: Track[] = [
  {
    id: 2,
    title: "Unravel",
    anime: "Tokyo Ghoul",
    artist: "TK from Ling tosite sigure",
    duration: "3:56",
    cover: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&h=400&fit=crop",
    orderedBy: "Sakura_chan"
  },
  {
    id: 3,
    title: "Tank!",
    anime: "Cowboy Bebop",
    artist: "The Seatbelts",
    duration: "3:28",
    cover: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&h=400&fit=crop",
    orderedBy: "NeonSamurai"
  },
  {
    id: 4,
    title: "Cruel Angel's Thesis",
    anime: "Neon Genesis Evangelion",
    artist: "Yoko Takahashi",
    duration: "4:06",
    cover: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop"
  },
  {
    id: 5,
    title: "My War",
    anime: "Shingeki no Kyojin",
    artist: "Shinsei Kamattechan",
    duration: "3:38",
    cover: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=400&fit=crop",
    orderedBy: "TitanSlayer"
  }
];

const user: User = {
  name: "Anime_Fan_777",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
  level: 12,
  points: 2450,
  orders: 156
};

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(75);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col h-screen">
        
        <header className="border-b border-border bg-card/50 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold text-white text-xl">
                A
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ANISON.FM</h1>
                <p className="text-xs text-muted-foreground">Аниме радио #1</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Icon name="Radio" size={18} className="mr-2" />
                Live
                <span className="ml-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </Button>
              
              <div className="flex items-center gap-3 px-3 py-2 bg-muted/50 rounded-lg">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>AF</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">Lvl {user.level}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <div className="container mx-auto px-4 py-6 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              
              <div className="lg:col-span-2 space-y-6">
                
                <Card className="p-6 bg-gradient-to-br from-card via-card to-card/50 border-border/50 animate-fade-in">
                  <div className="flex gap-6">
                    <div className="relative w-48 h-48 flex-shrink-0">
                      <img 
                        src={currentTrack.cover} 
                        alt={currentTrack.title}
                        className="w-full h-full object-cover rounded-xl shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
                      <Badge className="absolute top-2 right-2 bg-primary text-white">
                        <Icon name="Radio" size={12} className="mr-1" />
                        Live
                      </Badge>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {currentTrack.anime}
                        </Badge>
                        <h2 className="text-3xl font-bold text-foreground mb-2">{currentTrack.title}</h2>
                        <p className="text-lg text-muted-foreground mb-4">{currentTrack.artist}</p>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Clock" size={16} />
                          <span>{currentTrack.duration}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Button 
                          size="lg"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          {isPlaying ? (
                            <>
                              <Icon name="Pause" size={20} className="mr-2" />
                              Пауза
                            </>
                          ) : (
                            <>
                              <Icon name="Play" size={20} className="mr-2" />
                              Слушать
                            </>
                          )}
                        </Button>

                        <Button variant="outline" size="icon">
                          <Icon name="Heart" size={20} />
                        </Button>

                        <Button variant="outline" size="icon">
                          <Icon name="Share2" size={20} />
                        </Button>

                        <div className="flex-1" />

                        <div className="flex items-center gap-2">
                          <Icon name="Volume2" size={20} className="text-muted-foreground" />
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-24"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 flex-1 overflow-hidden">
                  <Tabs defaultValue="history" className="h-full flex flex-col">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="history">
                        <Icon name="History" size={16} className="mr-2" />
                        История эфира
                      </TabsTrigger>
                      <TabsTrigger value="order">
                        <Icon name="ListMusic" size={16} className="mr-2" />
                        Заказать трек
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="history" className="flex-1 overflow-y-auto">
                      <div className="space-y-3">
                        {recentTracks.map((track) => (
                          <div 
                            key={track.id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group"
                          >
                            <img 
                              src={track.cover} 
                              alt={track.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                                {track.title}
                              </p>
                              <p className="text-sm text-muted-foreground truncate">{track.anime}</p>
                              {track.orderedBy && (
                                <p className="text-xs text-primary flex items-center gap-1 mt-1">
                                  <Icon name="User" size={12} />
                                  {track.orderedBy}
                                </p>
                              )}
                            </div>
                            <span className="text-sm text-muted-foreground">{track.duration}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="order" className="flex-1">
                      <div className="space-y-4">
                        <div className="relative">
                          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                          <Input 
                            placeholder="Поиск по названию или аниме..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                          />
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Icon name="Info" size={16} />
                            <span>Стоимость заказа: 50 поинтов</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            У вас {user.points} поинтов • Осталось {Math.floor(user.points / 50)} заказов
                          </p>
                        </div>

                        <p className="text-center text-muted-foreground text-sm py-8">
                          Введите название трека для поиска
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>

              <div className="space-y-6">
                
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>AF</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{user.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        Уровень {user.level}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Поинты</span>
                      <span className="font-bold text-primary">{user.points}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Заказов</span>
                      <span className="font-bold text-foreground">{user.orders}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90">
                    <Icon name="Trophy" size={16} className="mr-2" />
                    Рейтинг
                  </Button>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="MessageCircle" size={18} />
                    Чат слушателей
                  </h3>
                  
                  <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                    <div className="text-sm">
                      <p className="font-medium text-primary">Sakura_chan</p>
                      <p className="text-muted-foreground">Отличный трек! 🎵</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-secondary">NeonSamurai</p>
                      <p className="text-muted-foreground">Cowboy Bebop forever!</p>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-accent">TitanSlayer</p>
                      <p className="text-muted-foreground">Кто-нибудь смотрит новый сезон?</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Input placeholder="Написать сообщение..." />
                    <Button size="icon">
                      <Icon name="Send" size={18} />
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Sparkles" size={18} className="text-primary" />
                    <h3 className="font-bold text-foreground">Топ недели</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Самый заказываемый трек</p>
                  <p className="font-medium text-foreground">"Unravel" - Tokyo Ghoul</p>
                  <p className="text-xs text-muted-foreground mt-1">234 заказа</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
