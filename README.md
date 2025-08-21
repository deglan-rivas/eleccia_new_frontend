# ELECCIA Frontend

Modern React frontend application for the ELECCIA system (JNE - Jurado Nacional de Elecciones).

## Overview

This is a React-based frontend application built with:
- **React 19** with TypeScript
- **Vite** as the build tool
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication

## Features

### Pages
- **Home (/)**: Main form for analyzing expedientes
- **Dashboard (/dashboard)**: List of all processed expedientes with filters
- **Expediente Detail (/expediente/:id)**: Detailed analysis view
- **Resolucion List (/resoluciones/:expedienteId)**: List of resolutions for an expediente

### Components
- **Layout Components**: Header, Footer, Navigation, and main Layout wrapper
- **UI Components**: Reusable Button, Input, Select, and Alert components
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Architecture
```
src/
├── components/
│   ├── layout/          # Layout components (Header, Footer, Layout)
│   ├── navigation/      # Navigation component
│   └── ui/             # Reusable UI components
├── pages/              # Page components
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (API, formatters)
├── constants/          # Application constants (options, etc.)
└── App.tsx            # Main application with routing
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended package manager)

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

### Linting

```bash
pnpm lint
```

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5001/api
```

## API Integration

The application is prepared to integrate with the backend API. Update the API base URL in `src/utils/api.ts` or use environment variables.

### API Endpoints Expected:
- `POST /api/analiza_expediente` - Analyze expediente
- `GET /api/expediente/:id` - Get expediente details  
- `GET /api/listado_procesados` - Get expediente list with filters
- `GET /api/resoluciones/:expedienteId` - Get resolutions for expediente
- `GET /api/descargar_resolucion/:expedienteId` - Download resolution file

## Styling

The application uses Tailwind CSS with custom JNE brand colors:
- `jne-red`: #DB252F
- `jne-orange`: #F89E2B  
- `jne-gold`: #A0936A

## Development Notes

- All components are written in TypeScript
- Uses React Hooks and functional components
- Follows React best practices and conventions
- Mobile-responsive design
- Accessible components with proper ARIA labels
- Error handling and loading states

## Next Steps

1. Connect to actual backend API endpoints
2. Add authentication/authorization if needed
3. Implement file upload functionality
4. Add more comprehensive error handling
5. Add unit and integration tests
6. Add internationalization (i18n) if needed
