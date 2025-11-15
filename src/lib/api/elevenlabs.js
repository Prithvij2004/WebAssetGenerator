const API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const API_URL = 'https://api.elevenlabs.io/v1';

export async function generateSoundEffect(description, theme) {
  if (!API_KEY) {
    console.warn('ElevenLabs API key not found. Please set VITE_ELEVENLABS_API_KEY in .env file.');
    throw new Error('ElevenLabs API not configured');
  }

  const enhancedDescription = `${description} with ${theme} characteristics.
  The sound should be clean, sharp, and minimal - following brutal minimalistic principles.`;

  try {
    // ElevenLabs Sound Effects API endpoint
    const response = await fetch(`${API_URL}/sound-generation`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: enhancedDescription,
        duration_seconds: 2.0,
        prompt_influence: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return {
      audioUrl,
      audioBlob,
      description: enhancedDescription,
      timestamp: Date.now(),
      type: 'sound-effect'
    };
  } catch (error) {
    console.error('Error generating sound effect with ElevenLabs:', error);
    throw error;
  }
}

export async function generateUISound(type, theme) {
  const soundDescriptions = {
    click: 'short sharp click sound',
    hover: 'subtle hover sound effect',
    success: 'positive success notification',
    error: 'alert error sound',
    notification: 'gentle notification tone',
  };

  const description = soundDescriptions[type] || type;
  return generateSoundEffect(description, theme);
}

export async function generateCustomAudio(prompt) {
  if (!API_KEY) {
    console.warn('ElevenLabs API key not found. Please set VITE_ELEVENLABS_API_KEY in .env file.');
    throw new Error('ElevenLabs API not configured');
  }

  try {
    const response = await fetch(`${API_URL}/sound-generation`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: prompt,
        duration_seconds: 3.0,
        prompt_influence: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.statusText}`);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return {
      audioUrl,
      audioBlob,
      description: prompt,
      timestamp: Date.now(),
      type: 'custom-audio'
    };
  } catch (error) {
    console.error('Error generating custom audio with ElevenLabs:', error);
    throw error;
  }
}
