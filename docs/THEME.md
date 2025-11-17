# KUSMS Theme & Design System

## Overview
Modern dark theme with tech-inspired colors for the KU Smart Management System frontend.

## Color Palette

### Primary Colors
- **Primary (Indigo)**: #6366f1 - Main brand color
- **Secondary (Purple)**: #8b5cf6 - Accent color
- **Success (Emerald)**: #10b981 - Success states
- **Error (Red)**: #ef4444 - Error states
- **Warning (Amber)**: #f59e0b - Warning states
- **Info (Blue)**: #3b82f6 - Informational states

### Background Colors
- **Default**: #0f172a (Slate 900) - Main background
- **Paper**: #1e293b (Slate 800) - Card/Paper background

### Text Colors
- **Primary**: #f1f5f9 (Slate 100) - Main text
- **Secondary**: #cbd5e1 (Slate 300) - Secondary text
- **Disabled**: #64748b (Slate 500) - Disabled text

### Border/Divider
- **Divider**: #334155 (Slate 700)

## Typography

### Font Family
- Primary: Inter (Google Fonts)
- Fallback: Roboto, Helvetica, Arial, sans-serif

### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semi-bold: 600
- Bold: 700

### Headings
- **H1**: 2.5rem, weight 700
- **H2**: 2rem, weight 700
- **H3**: 1.75rem, weight 600
- **H4**: 1.5rem, weight 600
- **H5**: 1.25rem, weight 600
- **H6**: 1rem, weight 600

## Components

### Cards
- Border radius: 16px
- Border: 1px solid #334155
- Hover effect: Slight elevation and transform
- Top accent bar: 4px gradient for category identification

### Buttons
- Border radius: 8px
- Gradient background for primary buttons
- No box-shadow by default, adds on hover
- Text transform: none (sentence case)

### Inputs/TextFields
- Border radius: 8px
- Background: #0f172a (darker than paper)
- Border color: #334155
- Focus color: Primary (#6366f1)

### Tables
- Header background: #0f172a
- Header text: Uppercase, 0.75rem, gray
- Cell border: 1px solid #334155

### Chips
- Border radius: 8px
- Font weight: 500

## Layout Components

### Sidebar
- Width: 260px
- Background: #1e293b
- Header: Gradient (Primary to Secondary)
- Active item: Left border + background highlight
- User info card: Embedded in sidebar

### AppBar/Header
- Background: #1e293b
- Border bottom: 1px solid #334155
- Elevation: Minimal shadow

### Main Content
- Background: #0f172a
- Padding: 24px
- Min height: 100vh

## Dashboard Components

### StatCard
- Gradient top border (4px)
- Icon in colored circle
- Large value text (h4)
- Optional trend indicator
- Hover animation

### Quick Action Cards
- Icon with colored background
- Arrow forward icon
- Click interaction
- Smooth hover effects

### Activity Feed
- Dark nested cards (#0f172a)
- Icon indicators
- Status chips
- Timestamp information

## Login Page

### Design Elements
- Full-screen gradient background
- Animated gradient orbs (decorative)
- Centered card with gradient header
- Icon-based branding
- Demo accounts in styled paper

## Best Practices

### Spacing
- Use 8px grid system
- Standard gaps: 2, 3, 4 units (16px, 24px, 32px)

### Shadows
- Minimal use of shadows
- Elevation 1-2 for most cards
- Increased on hover for interaction feedback

### Transitions
- Standard: 0.2s ease-in-out
- Use for: transform, box-shadow, background

### Accessibility
- High contrast ratios maintained
- Focus indicators visible
- Semantic HTML structure
- ARIA labels where needed

## File Structure

```
frontend/src/
├── theme/
│   └── index.ts              # Theme configuration
├── components/
│   ├── common/
│   │   ├── Layout.tsx         # Main layout with sidebar
│   │   ├── StatCard.tsx       # Reusable stat card
│   │   ├── Button.tsx         # Custom button
│   │   ├── Input.tsx          # Custom input
│   │   └── Modal.tsx          # Custom modal
│   └── dashboard/
│       ├── StudentDashboard.tsx
│       ├── FacultyDashboard.tsx
│       ├── AdminDashboard.tsx
│       └── MaintenanceDashboard.tsx
└── pages/
    ├── Login.tsx
    └── Dashboard.tsx
```

## Usage

### Import Theme
```typescript
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Use StatCard
```typescript
import StatCard from '../components/common/StatCard';

<StatCard
  title="Active Bookings"
  value="42"
  icon={<BookIcon sx={{ fontSize: 28 }} />}
  color="primary"
  subtitle="This week"
  trend={{ value: 12, isPositive: true }}
/>
```

### Custom Gradients
```typescript
// Primary gradient
background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'

// Icon backgrounds
bgcolor: 'rgba(99, 102, 241, 0.1)'
color: '#6366f1'
```

## Future Enhancements

- [ ] Add light mode toggle
- [ ] Implement custom chart components
- [ ] Add skeleton loaders
- [ ] Create notification system
- [ ] Add animation library (Framer Motion)
- [ ] Implement data visualization
- [ ] Add more interactive elements
- [ ] Create design token system

## Resources

- [Material-UI Documentation](https://mui.com/)
- [Inter Font](https://fonts.google.com/specimen/Inter)
- [Tailwind Colors Reference](https://tailwindcss.com/docs/customizing-colors)
