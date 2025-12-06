import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const [isListening, setIsListening] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState([50]);
  const [brightness, setBrightness] = useState([70]);
  const [commandHistory, setCommandHistory] = useState([
    { id: 1, text: 'Открыть браузер', time: '14:32', status: 'success' },
    { id: 2, text: 'Найти документы', time: '14:28', status: 'success' },
    { id: 3, text: 'Закрыть приложение', time: '14:15', status: 'success' },
  ]);

  const searchResults = [
    { name: 'Отчет_2024.docx', path: 'C:/Документы/', type: 'document', size: '2.4 MB' },
    { name: 'Проект_презентация.pptx', path: 'C:/Документы/Работа/', type: 'presentation', size: '8.1 MB' },
    { name: 'Бюджет.xlsx', path: 'C:/Документы/', type: 'spreadsheet', size: '1.2 MB' },
  ];

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Слушаю...",
        description: "Говорите команду",
      });
    }
  };

  const handleSystemCommand = (command: string) => {
    const newCommand = {
      id: commandHistory.length + 1,
      text: command,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      status: 'success' as const,
    };
    setCommandHistory([newCommand, ...commandHistory]);
    toast({
      title: "Команда выполнена",
      description: command,
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Garich Intelligence</h1>
              <p className="text-sm text-muted-foreground">Голосовой помощник для управления ПК</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{new Date().toLocaleDateString('ru-RU')}</p>
              <p className="text-xs text-muted-foreground">{new Date().toLocaleTimeString('ru-RU')}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 bg-card border-border">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <button
                    onClick={handleVoiceToggle}
                    className={`relative w-32 h-32 rounded-full transition-all duration-300 ${
                      isListening
                        ? 'bg-primary animate-pulse-glow'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <Icon
                      name={isListening ? 'Mic' : 'MicOff'}
                      size={48}
                      className="text-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </button>
                </div>

                {isListening && (
                  <div className="flex justify-center items-end gap-1 h-16">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-primary rounded-full animate-wave"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          height: '20px',
                        }}
                      />
                    ))}
                  </div>
                )}

                <div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    {isListening ? 'Слушаю вас...' : 'Нажмите, чтобы говорить'}
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Скажите команду для управления компьютером
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Search" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Быстрый поиск файлов</h3>
              </div>
              <Input
                placeholder="Введите название файла или папки..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 bg-muted border-border text-foreground"
              />
              <div className="space-y-2">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon
                          name={
                            result.type === 'document'
                              ? 'FileText'
                              : result.type === 'presentation'
                              ? 'Presentation'
                              : 'FileSpreadsheet'
                          }
                          size={20}
                          className="text-primary"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{result.name}</p>
                        <p className="text-xs text-muted-foreground">{result.path}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{result.size}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Settings" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Управление системой</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon name="Volume2" size={18} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Громкость</span>
                    </div>
                    <span className="text-sm text-primary font-semibold">{volume[0]}%</span>
                  </div>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon name="Sun" size={18} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Яркость</span>
                    </div>
                    <span className="text-sm text-primary font-semibold">{brightness[0]}%</span>
                  </div>
                  <Slider
                    value={brightness}
                    onValueChange={setBrightness}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="w-full bg-muted border-border hover:bg-muted/80"
                    onClick={() => handleSystemCommand('Перезагрузить систему')}
                  >
                    <Icon name="RotateCw" size={18} />
                    <span className="ml-2">Перезагрузка</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full bg-muted border-border hover:bg-muted/80"
                    onClick={() => handleSystemCommand('Выключить ПК')}
                  >
                    <Icon name="Power" size={18} />
                    <span className="ml-2">Выключить</span>
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="History" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">История команд</h3>
              </div>
              <div className="space-y-2">
                {commandHistory.map((cmd) => (
                  <div
                    key={cmd.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={14} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{cmd.text}</p>
                        <p className="text-xs text-muted-foreground">{cmd.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
