import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProject } from '@/context/ProjectContext';
import { chatWithAI, generateLogo, generateIcon } from '@/lib/api/gemini';
import { generateSoundEffect } from '@/lib/api/elevenlabs';
import { Send, Loader2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';

export function ChatInterface() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentProject, addChatMessage, addAsset } = useProject();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentProject?.chatHistory]);

  const handleSend = async () => {
    if (!message.trim() || !currentProject || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    // Add user message to chat
    addChatMessage({
      role: 'user',
      content: userMessage,
    });

    try {
      // Determine intent from message
      const lowerMessage = userMessage.toLowerCase();
      const context = `You are helping with a project themed: "${currentProject.theme}".
      Respond concisely and professionally. If the user wants to generate assets, acknowledge it and explain what you'll create.`;

      let aiResponse = '';
      let generatedAsset = null;

      // Check if user wants to generate assets
      if (lowerMessage.includes('logo')) {
        const result = await generateLogo(userMessage, currentProject.theme);
        aiResponse = `I've generated a logo concept for you:\n\n${result.description}`;
        generatedAsset = {
          type: 'logo',
          description: result.description,
          prompt: result.prompt,
        };
      } else if (lowerMessage.includes('icon')) {
        const result = await generateIcon(userMessage, currentProject.theme);
        aiResponse = `I've generated an icon concept for you:\n\n${result.description}`;
        generatedAsset = {
          type: 'icon',
          description: result.description,
          prompt: result.prompt,
        };
      } else if (lowerMessage.includes('sound') || lowerMessage.includes('audio')) {
        try {
          const result = await generateSoundEffect(userMessage, currentProject.theme);
          aiResponse = `I've generated a sound effect for you. Click below to listen.`;
          generatedAsset = {
            type: 'sound',
            audioUrl: result.audioUrl,
            audioBlob: result.audioBlob,
            description: result.description,
          };
        } catch (error) {
          aiResponse = 'Sound generation requires ElevenLabs API key. Please configure it in your .env file.';
        }
      } else {
        // Regular chat
        aiResponse = await chatWithAI(userMessage, context);
      }

      // Add AI response to chat
      addChatMessage({
        role: 'assistant',
        content: aiResponse,
        asset: generatedAsset,
      });

      // Save asset to project if generated
      if (generatedAsset) {
        addAsset(generatedAsset);
      }
    } catch (error) {
      console.error('Error in chat:', error);
      addChatMessage({
        role: 'assistant',
        content: `Error: ${error.message}. Please make sure your API keys are configured correctly.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="font-mono text-gray-600">Select or create a project to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b-brutal border-brutal-border p-4">
        <h2 className="font-display text-xl font-bold uppercase">{currentProject.name}</h2>
        <p className="font-mono text-sm text-gray-600">Theme: {currentProject.theme}</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentProject.chatHistory?.length === 0 && (
          <div className="text-center py-12">
            <p className="font-mono text-gray-600 mb-4">
              Start a conversation to generate assets
            </p>
            <div className="space-y-2 text-sm font-mono text-gray-500">
              <p>Try: "Create a logo for a coffee shop"</p>
              <p>Try: "Generate an icon for settings"</p>
              <p>Try: "Make a click sound effect"</p>
            </div>
          </div>
        )}

        {currentProject.chatHistory?.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="font-mono text-sm">Generating...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t-brutal border-brutal-border p-4">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me to generate assets..."
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !message.trim()} size="icon">
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
