# PulseWatch Design System

## Color Palette

### Primary Colors (CSS Variables)
```
--bg-primary:      #0a0a0a  (Main background)
--bg-secondary:    #111111  (Cards, secondary elements)
--bg-tertiary:     #1a1a1a  (Elevated backgrounds)

--text-primary:    #ffffff  (Main text)
--text-secondary:  #a0a0a0  (Secondary text)
--text-muted:      #666666  (Muted/disabled text)

--border-color:    #333333  (Standard borders)
--border-light:    #4a4a4a  (Hover states)

--accent-green:    #10b981  (Primary CTA)
--accent-green-hover: #059669
--accent-green-light: #34d399

--status-success:  #10b981
--status-error:    #ef4444
--status-warning:  #f59e0b
--status-info:     #3b82f6
```

## Component Classes

### Buttons
- `.btn-primary` - Primary action button (green background)
- `.btn-secondary` - Secondary action button (outline style)
- `.btn-outline` - Outline button
- `.btn-danger` - Destructive action button (red)
- `.btn-small-primary` - Small primary button
- `.btn-small-secondary` - Small secondary button

### Cards & Containers
- `.card` - Standard card with border and shadow
- `.card-elevated` - Card with elevated shadow
- `.panel` - Panel container
- `.feature-card` - Feature showcase card (with gradient)
- `.section-card` - Section container card

### Status & Alerts
- `.status-badge` - Status indicator badge
- `.status-success` - Green success badge
- `.status-error` - Red error badge
- `.status-warning` - Yellow warning badge
- `.status-info` - Blue info badge

- `.alert` - Alert container
- `.alert-success` - Success alert
- `.alert-error` - Error alert
- `.alert-warning` - Warning alert
- `.alert-info` - Info alert

### Badges & Labels
- `.badge` - General-purpose badge
- `.label` - Form label

## Typography

All heading tags (h1-h6) are bold and use `--text-primary` color.
Paragraphs use `--text-secondary` color by default.

## Spacing & Borders

- Border radius: `0.5rem` (standard)
- Padding: Uses Tailwind spacing utilities
- Gaps: Uses Tailwind gap utilities
- Borders: 1px solid using `--border-color`

## Responsive Design

All components are responsive and work seamlessly on:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## Usage Examples

```jsx
// Button
<button className="btn-primary">Create Monitor</button>

// Card
<div className="card p-6">
  <h3 className="font-bold mb-2">Title</h3>
  <p className="text-[color:var(--text-secondary)]">Content</p>
</div>

// Alert
<div className="alert-success">
  ✓ Monitor created successfully
</div>

// Status Badge
<span className="status-success">Online</span>
```

## Dark Mode

By default, all styles use the dark theme (dark-first approach).
Light mode support is available via `.light` class on root element.
