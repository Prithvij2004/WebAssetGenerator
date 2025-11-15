import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Volume2 } from 'lucide-react';
import { downloadFile, downloadImage } from '@/lib/utils';

export function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  const handleDownloadAsset = () => {
    if (!message.asset) return;

    const timestamp = new Date().getTime();

    if (message.asset.type === 'sound') {
      const blob = message.asset.audioBlob;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `sound-effect-${timestamp}.mp3`;
      link.click();
      URL.revokeObjectURL(url);
    } else {
      // For logo/icon descriptions, download as text
      const content = `${message.asset.type.toUpperCase()} DESCRIPTION\n\n${message.asset.description}\n\nPROMPT\n${message.asset.prompt}`;
      downloadFile(content, `${message.asset.type}-${timestamp}.txt`, 'text/plain');
    }
  };

  const playAudio = () => {
    if (message.asset?.type === 'sound' && message.asset.audioUrl) {
      const audio = new Audio(message.asset.audioUrl);
      audio.play();
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${isUser ? 'ml-auto' : 'mr-auto'}`}>
        <Card className={isUser ? 'bg-brutal-fg text-brutal-bg' : ''}>
          <div className="whitespace-pre-wrap font-mono text-sm">{message.content}</div>

          {message.asset && (
            <div className="mt-4 pt-4 border-t border-current/20">
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase text-xs">
                  {message.asset.type}
                </span>

                {message.asset.type === 'sound' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={playAudio}
                    className={isUser ? 'text-brutal-bg border-brutal-bg' : ''}
                  >
                    <Volume2 className="h-3 w-3 mr-1" />
                    Play
                  </Button>
                )}

                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDownloadAsset}
                  className={isUser ? 'text-brutal-bg border-brutal-bg' : ''}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-1 px-2">
          <span className="font-mono text-xs text-gray-500">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
