# Web Asset Generator

AI-powered web application for generating and customizing web assets including logos, icons, and sound effects with brutal minimalistic design.

## Features

- **Project Management**: Create and manage multiple asset generation projects
- **AI-Powered Generation**: Use Gemini AI to generate logos and icons
- **Sound Effects**: Generate audio assets with ElevenLabs API
- **Chat Interface**: Conversational UI for asset creation
- **Asset Editing**: Minimal editing capabilities with Nano Banana API
- **Brutal Minimalistic Design**: Clean, stark interface following brutal design principles

## Tech Stack

- **Frontend**: React 18 + Vite
- **Routing**: React Router v6
- **UI Components**: Custom shadcn/ui components
- **Styling**: Tailwind CSS
- **Fonts**: Inter (UI), Space Mono (code), Space Grotesk (headings)
- **APIs**:
  - Google Gemini AI (logo/icon generation)
  - Nano Banana (image editing)
  - ElevenLabs (audio generation)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- API keys for:
  - Google Gemini AI
  - Nano Banana (optional for editing)
  - ElevenLabs (optional for audio)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WebAssetGenerator
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your API keys to `.env`:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_NANO_BANANA_API_KEY=your_nano_banana_api_key
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Usage

1. **Create a Project**: Click "Create New Project" and provide a name and theme description
2. **Open Workspace**: Navigate to the workspace to chat with AI
3. **Generate Assets**: Use natural language to request assets:
   - "Create a logo for a coffee shop"
   - "Generate an icon for settings"
   - "Make a click sound effect"
4. **View Assets**: Check the Assets page to view all generated assets
5. **Edit & Download**: Edit logos (minimal edits) and download your assets

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn UI components
│   ├── chat/            # Chat interface components
│   ├── editor/          # Asset editor components
│   ├── project/         # Project management components
│   ├── assets/          # Asset gallery components
│   └── layout/          # Layout components
├── lib/
│   ├── api/             # API integration modules
│   │   ├── gemini.js
│   │   ├── nanoBanana.js
│   │   └── elevenlabs.js
│   └── utils.js         # Utility functions
├── context/
│   └── ProjectContext.jsx  # Project state management
├── pages/
│   ├── HomePage.jsx
│   ├── WorkspacePage.jsx
│   └── AssetsPage.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Design Philosophy

This project follows **Brutal Minimalism**:

- Clean, stark interfaces
- High contrast (black/white/red)
- Monospace and geometric fonts
- No unnecessary decorative elements
- Sharp edges and geometric shapes
- Minimal animations
- Direct, functional aesthetic

## API Configuration

### Gemini AI

Used for generating logo and icon descriptions. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### Nano Banana

Used for minimal image editing. The implementation includes a mock interface for development.

### ElevenLabs

Used for generating sound effects. Get your API key from [ElevenLabs](https://elevenlabs.io/).

## Contributing

Contributions are welcome! Please ensure:

1. Code follows the brutal minimalistic design principles
2. All features are tested
3. Documentation is updated

## License

MIT

## Acknowledgments

- Built with React and Vite
- UI components inspired by shadcn/ui
- AI powered by Google Gemini
- Audio generation by ElevenLabs
