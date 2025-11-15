# CLAUDE.md - AI Assistant Guide for WebAssetGenerator

## Project Overview

**WebAssetGenerator** is a web application that enables developers to generate customizable digital assets (logos, icons, and sound effects) using AI. Users create projects with specific themes, interact with AI through a chat interface, and receive AI-generated assets that can be edited and downloaded.

### Core Features
- **Project-based workflow**: Users create projects and define themes
- **AI-powered generation**: Chat interface for creating logos, icons, and sound effects
- **Asset management**: Gallery view with download capabilities
- **Manual editing**: Minimal image editing interface for fine-tuning logos

---

## Design Philosophy: Brutal Minimalism

**Every visual decision must follow brutal minimalistic principles:**

### Visual Guidelines
- **Color Palette**: Strictly black, white, and red accent
  - Background: White (`#FFFFFF`)
  - Foreground/Text: Black (`#000000`)
  - Accent: Red (`#FF0000`)
- **Typography**:
  - UI: Inter (sans-serif)
  - Code/Technical: Space Mono (monospace)
  - Headings: Space Grotesk (geometric)
- **Borders**: 3px thick black borders everywhere (brutal theme)
- **Shapes**: Geometric, sharp corners, no rounded edges unless absolutely necessary
- **Animations**: Minimal or none - prefer instant state changes
- **Spacing**: Generous whitespace, clear visual hierarchy
- **Contrast**: High contrast for maximum readability

### Anti-patterns to Avoid
- ❌ Gradients or color transitions
- ❌ Shadows or blur effects
- ❌ Rounded corners on main UI elements
- ❌ Decorative icons or flourishes
- ❌ Soft or pastel colors
- ❌ Complex animations or transitions

---

## Tech Stack

### Core Technologies
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.9
- **Language**: JavaScript (ES6+) - **No TypeScript**
- **Routing**: React Router v6.26.2
- **State Management**: React Context API + LocalStorage
- **Styling**: Tailwind CSS 3.4.14
- **UI Components**: shadcn/ui

### API Integrations
1. **Google Gemini AI** (`gemini-1.5-flash`)
   - Logo/icon description generation
   - Chat conversations
   - Image prompt engineering

2. **Nano Banana API**
   - Logo editing (color adjustment, resize, rotate, filters)
   - Image manipulation

3. **ElevenLabs API**
   - Sound effect generation
   - Custom audio creation from text prompts

### Development Dependencies
- **Data Fetching**: @tanstack/react-query v5.56.2
- **Icons**: lucide-react
- **Class Utilities**: clsx, tailwind-merge
- **AI SDK**: @google/generative-ai

---

## Codebase Structure

```
/home/user/WebAssetGenerator/
├── index.html                 # Entry HTML file
├── src/
│   ├── main.jsx              # React DOM entry point
│   ├── App.jsx               # Root component
│   ├── router.jsx            # Route definitions
│   │
│   ├── pages/                # Page components
│   │   ├── HomePage.jsx      # Landing + project list
│   │   ├── WorkspacePage.jsx # Chat workspace
│   │   └── AssetsPage.jsx    # Asset gallery
│   │
│   ├── components/
│   │   ├── ui/               # shadcn UI primitives
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── dialog.jsx
│   │   │   ├── input.jsx
│   │   │   └── textarea.jsx
│   │   │
│   │   ├── chat/             # Chat feature
│   │   │   ├── ChatInterface.jsx
│   │   │   └── ChatMessage.jsx
│   │   │
│   │   ├── project/          # Project management
│   │   │   ├── CreateProject.jsx
│   │   │   └── ProjectList.jsx
│   │   │
│   │   ├── editor/           # Asset editing
│   │   │   └── AssetEditor.jsx
│   │   │
│   │   ├── assets/           # Asset display
│   │   │   └── AssetGallery.jsx
│   │   │
│   │   └── layout/           # Layout wrapper
│   │       └── Layout.jsx
│   │
│   ├── context/              # Global state
│   │   └── ProjectContext.jsx
│   │
│   └── lib/
│       ├── api/              # API integrations
│       │   ├── gemini.js
│       │   ├── elevenlabs.js
│       │   └── nanoBanana.js
│       └── utils.js          # Helper functions
│
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind + brutal theme
├── components.json           # shadcn config
├── package.json              # Dependencies
└── .env.example              # Required API keys
```

---

## Key Conventions and Patterns

### 1. Component Structure
All React components follow this pattern:

```javascript
import React from 'react';
import { useProject } from '@/context/ProjectContext';
import { Button } from '@/components/ui/button';

export function ComponentName({ prop1, prop2 }) {
  // 1. Hooks at the top
  const { currentProject, addAsset } = useProject();

  // 2. Event handlers
  const handleAction = () => {
    // implementation
  };

  // 3. Render
  return (
    <div className="brutal-container">
      {/* JSX */}
    </div>
  );
}
```

### 2. File Naming
- **Components**: PascalCase (e.g., `ChatInterface.jsx`)
- **Utilities**: camelCase (e.g., `utils.js`)
- **Pages**: PascalCase with "Page" suffix (e.g., `HomePage.jsx`)
- **All files use `.jsx` extension** for React components

### 3. Import Aliases
Use the `@/` alias for imports from `src/`:
```javascript
import { Button } from '@/components/ui/button';
import { useProject } from '@/context/ProjectContext';
import { generateLogo } from '@/lib/api/gemini';
```

### 4. Styling Conventions
- **Use Tailwind utility classes** exclusively
- **Brutal theme classes**: Apply `brutal-` prefixed classes for themed elements
- **Common patterns**:
  ```javascript
  // Buttons
  <button className="brutal-button bg-black text-white border-3 border-black">

  // Cards
  <div className="brutal-card bg-white border-3 border-black p-6">

  // Inputs
  <input className="brutal-input border-3 border-black px-4 py-2">
  ```

### 5. State Management Pattern
- **Global state**: ProjectContext for projects, assets, chat history
- **Local state**: useState for component-specific UI state
- **Persistence**: All projects saved to LocalStorage automatically

```javascript
const {
  projects,           // All projects
  currentProject,     // Active project
  createProject,      // Create new project
  addAsset,          // Add asset to current project
  addChatMessage     // Add message to chat
} = useProject();
```

---

## API Integration Guidelines

### Gemini AI (Logo/Icon Generation)

**Location**: `src/lib/api/gemini.js`

**Usage**:
```javascript
import { generateLogo, generateIcon, chatWithAI } from '@/lib/api/gemini';

// Generate logo description
const logoData = await generateLogo(prompt, theme);
// Returns: { description, prompt, imageUrl }

// Generate icon description
const iconData = await generateIcon(prompt, theme);
// Returns: { description, prompt, imageUrl }

// Chat conversation
const response = await chatWithAI(message, theme);
// Returns: { response: string }
```

**Environment Variable**: `VITE_GEMINI_API_KEY`

**Model**: `gemini-1.5-flash`

### ElevenLabs (Sound Effects)

**Location**: `src/lib/api/elevenlabs.js`

**Usage**:
```javascript
import { generateSoundEffect, generateUISound } from '@/lib/api/elevenlabs';

// Custom sound effect
const audioUrl = await generateSoundEffect(prompt);
// Returns: string (audio URL)

// Predefined UI sound
const uiSound = await generateUISound('click'); // click, hover, success, error, notification
// Returns: string (audio URL)
```

**Environment Variable**: `VITE_ELEVENLABS_API_KEY`

**Endpoint**: `https://api.elevenlabs.io/v1/sound-generation`

### Nano Banana (Logo Editing)

**Location**: `src/lib/api/nanoBanana.js`

**Usage**:
```javascript
import { editLogo, adjustColor, resizeImage, rotateImage } from '@/lib/api/nanoBanana';

// Edit logo with instructions
const editedUrl = await editLogo(imageUrl, instructions);

// Specific edits
const colorAdjusted = await adjustColor(imageUrl, { hue, saturation, brightness });
const resized = await resizeImage(imageUrl, { width, height });
const rotated = await rotateImage(imageUrl, degrees);
```

**Environment Variable**: `VITE_NANO_BANANA_API_KEY`

**Note**: Includes mock functionality for development

---

## Data Models

### Project Structure
```javascript
{
  id: string,              // Unique ID (timestamp + random)
  name: string,            // Project name
  theme: string,           // Project theme description
  createdAt: timestamp,    // Creation timestamp
  assets: [                // Generated assets
    {
      id: string,
      type: 'logo' | 'icon' | 'sound',
      url: string,
      prompt: string,
      createdAt: timestamp
    }
  ],
  chatHistory: [           // Chat messages
    {
      id: string,
      role: 'user' | 'assistant',
      content: string,
      timestamp: timestamp
    }
  ]
}
```

### Asset Types
- **Logo**: Image asset generated via Gemini
- **Icon**: Image asset generated via Gemini
- **Sound**: Audio asset generated via ElevenLabs

---

## Common Development Tasks

### Adding a New UI Component

1. **If it's a shadcn component**:
   ```bash
   npx shadcn-ui@latest add [component-name]
   ```

2. **If it's a custom component**:
   - Create in appropriate directory (`components/[feature]/`)
   - Use PascalCase naming
   - Follow brutal minimalism design
   - Export as named export

### Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `src/router.jsx`:
   ```javascript
   {
     path: '/new-page',
     element: <NewPage />
   }
   ```
3. Add navigation link in Layout.jsx if needed

### Adding a New API Integration

1. Create API file in `src/lib/api/`
2. Add API key to `.env.example`
3. Export async functions that return data
4. Handle errors gracefully with try/catch
5. Update this CLAUDE.md file with usage instructions

### Modifying Project Context

1. Edit `src/context/ProjectContext.jsx`
2. Add new state or methods to ProjectContext
3. Update ProjectProvider export
4. Ensure LocalStorage sync if needed

---

## Development Workflow

### Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev
```

### Building
```bash
# Production build
npm run build

# Preview production build
npm run preview
```

### Testing Changes
1. Start dev server (`npm run dev`)
2. Test in browser at `http://localhost:5173`
3. Verify brutal minimalism design adherence
4. Check console for errors
5. Test across different viewport sizes

---

## Important Implementation Details

### 1. Asset Generation Flow
```
User types in chat → ChatInterface component
  ↓
Detect intent (logo/icon/sound)
  ↓
Call appropriate API (Gemini/ElevenLabs)
  ↓
Add asset to currentProject via context
  ↓
Display in chat + add to gallery
  ↓
Save to LocalStorage automatically
```

### 2. LocalStorage Persistence
- Projects saved automatically on every change
- No backend required - fully client-side
- Keys: `projects`, `currentProjectId`
- Use `saveToLocalStorage()` and `getFromLocalStorage()` helpers

### 3. Image Editing Workflow
```
User clicks "Edit" on logo asset
  ↓
AssetEditor modal opens
  ↓
User makes edits (color, size, rotation, filter)
  ↓
Call Nano Banana API with edit instructions
  ↓
Update asset URL in project
  ↓
Save to LocalStorage
```

### 4. Chat Message Handling
- All messages stored in `project.chatHistory`
- User messages trigger AI responses
- Asset generation creates special message types
- Messages persist across sessions

---

## Code Quality Standards

### JavaScript Conventions
- **Use ES6+ features**: arrow functions, destructuring, template literals
- **Use async/await** over promises
- **No TypeScript** - pure JavaScript only
- **Use JSX** for all React components
- **Prefer functional components** with hooks
- **No class components**

### Error Handling
```javascript
try {
  const result = await apiCall();
  return result;
} catch (error) {
  console.error('Error description:', error);
  // Show user-friendly error message
  return null; // or throw with context
}
```

### Component Best Practices
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over prop drilling
- Prefer controlled components for forms
- Memoize expensive computations with useMemo

---

## Environment Variables

Required in `.env`:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_NANO_BANANA_API_KEY=your_nano_banana_key_here
VITE_ELEVENLABS_API_KEY=your_elevenlabs_key_here
```

Access in code:
```javascript
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
```

---

## Troubleshooting Guide

### API Errors
- **Check**: Environment variables are set correctly
- **Check**: API keys are valid and have proper permissions
- **Check**: Network requests in browser DevTools
- **Fallback**: Nano Banana has mock mode for development

### Build Errors
- **Run**: `npm install` to ensure dependencies are installed
- **Check**: Node version compatibility (v18+ recommended)
- **Clear**: Delete `node_modules` and reinstall if needed

### Styling Issues
- **Verify**: Tailwind classes are spelled correctly
- **Check**: Custom brutal theme classes in `tailwind.config.js`
- **Inspect**: Element in browser DevTools for applied classes
- **Rebuild**: Restart dev server if Tailwind changes don't apply

---

## Project-Specific AI Assistant Guidelines

When working on this codebase:

1. **Always maintain brutal minimalism** in visual changes
2. **Use JavaScript only** - never suggest TypeScript
3. **Follow existing patterns** in similar components
4. **Test API integrations** with proper error handling
5. **Update LocalStorage** when modifying project data
6. **Keep components simple** - extract complexity into hooks/utils
7. **Use shadcn components** for new UI elements when possible
8. **Document new features** by updating this CLAUDE.md
9. **Preserve the chat-based workflow** as the primary UX
10. **Maintain the project-centric architecture** - all assets belong to projects

---

## Quick Reference: File Paths

### Most Frequently Modified Files
- Chat logic: `/home/user/WebAssetGenerator/src/components/chat/ChatInterface.jsx`
- Project state: `/home/user/WebAssetGenerator/src/context/ProjectContext.jsx`
- Routing: `/home/user/WebAssetGenerator/src/router.jsx`
- Gemini API: `/home/user/WebAssetGenerator/src/lib/api/gemini.js`
- ElevenLabs API: `/home/user/WebAssetGenerator/src/lib/api/elevenlabs.js`
- Nano Banana API: `/home/user/WebAssetGenerator/src/lib/api/nanoBanana.js`

### Configuration Files
- Tailwind: `/home/user/WebAssetGenerator/tailwind.config.js`
- Vite: `/home/user/WebAssetGenerator/vite.config.js`
- shadcn: `/home/user/WebAssetGenerator/components.json`
- Dependencies: `/home/user/WebAssetGenerator/package.json`

---

## Version Information

- **React**: 18.3.1
- **Vite**: 5.4.9
- **Tailwind CSS**: 3.4.14
- **React Router**: 6.26.2
- **React Query**: 5.56.2

---

## Additional Resources

- **shadcn/ui docs**: https://ui.shadcn.com/
- **Tailwind CSS docs**: https://tailwindcss.com/docs
- **Gemini API docs**: https://ai.google.dev/docs
- **ElevenLabs API docs**: https://elevenlabs.io/docs
- **React Router docs**: https://reactrouter.com/

---

*Last Updated: 2025-11-15*
