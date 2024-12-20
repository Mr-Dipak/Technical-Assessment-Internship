# Quyl Dashboard UI Documentation

## Overview
The Quyl Dashboard is a modern, responsive web application built with Next.js 13, utilizing the App Router and TailwindCSS. It provides a comprehensive interface for managing students, courses, and educational content.

## Component Structure

### 1. Layout Components

#### Sidebar (`components/layout/sidebar.tsx`)
- Main navigation component
- Contains links to all major sections
- Includes theme toggle
- Responsive design with mobile support

#### Navbar (`components/layout/navbar.tsx`)
- Top navigation bar
- Search functionality
- Notification system
- User profile access
- Quick action buttons

### 2. Student Management

#### Students Page (`app/(dashboard)/students/page.tsx`)
- Main student listing interface
- Filterable table of students
- Add new student functionality
- Status indicators
- Course assignments

#### Add Student Dialog (`components/students/add-student-dialog.tsx`)
- Modal form for adding new students
- Input validation
- Course selection
- Cohort assignment

### 3. Theme System

#### Theme Provider (`components/theme-provider.tsx`)
- Manages application-wide theming
- Supports light/dark mode
- Persistent theme selection

#### Theme Toggle (`components/theme-toggle.tsx`)
- UI component for switching themes
- Animated icon transition
- Accessibility support

## Usage Guide

### Setting Up

1. The application uses Next.js App Router
2. Components are organized by feature
3. Styles are managed through TailwindCSS

### Adding New Features

1. Create new components in appropriate directories
2. Follow the established pattern for routing
3. Maintain consistency in styling and theming

### Customization

#### Modifying Styles
```tsx
// Example of custom styling
<div className="custom-class">
  {/* Component content */}
</div>
```

#### Adding New Routes
```tsx
// In sidebar.tsx
const routes = [
  {
    label: "New Route",
    icon: IconComponent,
    href: "/new-route",
    color: "text-custom-color",
  },
  // ...existing routes
];
```

## Best Practices

1. Keep components small and focused
2. Use TypeScript for type safety
3. Follow accessibility guidelines
4. Maintain consistent error handling
5. Document complex functionality

## Code Examples

### Adding a New Table Column
```tsx
<TableHeader>
  <TableRow>
    <TableHead>New Column</TableHead>
    {/* Existing columns */}
  </TableRow>
</TableHeader>
```

### Creating a New Dialog
```tsx
export function CustomDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {/* Dialog content */}
      </DialogContent>
    </Dialog>
  );
}
```

## Accessibility

- All interactive elements are keyboard accessible
- ARIA labels are used where necessary
- Color contrast meets WCAG guidelines
- Screen reader support is implemented

## Performance Considerations

- Components are client-side where necessary
- Server components are used by default
- Images are optimized
- Code splitting is implemented through Next.js

## Future Improvements

1. Add more interactive features
2. Implement advanced filtering
3. Add bulk actions for student management
4. Enhance mobile responsiveness
5. Add more detailed analytics