# Norphel Retreat Pelling
A modern, responsive web application for **Norphel Retreat**, a luxury resort located in Pelling, Sikkim. Built with React, TypeScript, Vite, and Tailwind CSS, featuring direct WhatsApp booking integration and dynamic site configuration.

---
## 📁 Repository Structure
```
norphel-retreat/
├── public/                 # Static assets served directly by Vite (e.g., cover images)
├── src/                    # Primary application source code
│   ├── components/         # Modular React UI components
│   │   ├── AboutUsSection.tsx   # About Us section, photo collage, and amenities list
│   │   ├── DatePicker.tsx       # Custom date range picker component for booking
│   │   ├── Footer.tsx           # Pre-footer banner, site links, contact info, and copyright
│   │   ├── Hero.tsx             # Hero section with interactive booking search bar
│   │   ├── Navbar.tsx           # Sticky navigation bar with quick booking CTA
│   │   ├── RoomsSection.tsx     # Filterable room catalog and room details
│   │   └── ServicesSection.tsx  # Highlights, services grid, and video tour modal
│   ├── config/             # Site configuration and data settings
│   │   └── siteConfig.ts        # Centralized site data and content configuration
│   ├── App.tsx             # Main App layout, page assembly, and WhatsApp booking handlers
│   ├── data.ts             # Static/fallback mock data
│   ├── index.css           # Global Tailwind CSS directives and custom styling
│   ├── main.tsx            # React application entry point
│   └── types.ts            # TypeScript interfaces & types (Room, ServiceItem, BookingDetails)
├── .env.example            # Template for environment variables (e.g., GEMINI_API_KEY)
├── index.html              # HTML entry template
├── package.json            # Scripts and dependency declarations
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build and dev server configuration
```
---
## ⚙️ Site Configuration (`siteConfig.ts`)
The project uses a centralized configuration file located at [`src/config/siteConfig.ts`]. This file serves as the **single source of truth** for content, contact details, image URLs, navigation links, and room listings.
Updating `siteConfig.ts` allows you to customize site content without modifying UI component code.
### Key Sections in `siteConfig`:
| Section | Key | Description |
| :--- | :--- | :--- |
| **Hotel Information** | `hotelInfo` | Hotel name, subtitle, location, address, phone numbers, reservation emails, WhatsApp booking number, and social media URLs. |
| **Navigation Bar** | `navbar` | List of main menu links (`navLinks`) and header CTA button text (`bookButtonText`). |
| **Hero Section** | `hero` | Headline text, background image, room dropdown options, and guest limits (`maxAdults`, `maxChildren`). |
| **About Us Section** | `aboutSection` | Story copy, brand quote, photo collage image URLs, and hotel amenities list with Lucide icon references. |
| **Rooms & Suites** | `roomsSection` | Section headers, category filter tabs (`all`, `executive`, `premium`, `luxury`), and room item data (pricing, type, image). |
| **Services & Tour** | `servicesSection` | Highlight features, service cards, and video modal setup (YouTube embed URL, thumbnail image). |
| **Footer & Pre-Footer** | `footer` | Pre-footer call-to-action banner, brand description, quick explore links, legal links, and copyright statement. |
---

## 🚀 Run Locally
**Prerequisites:** Node.js (v18 or higher recommended)
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   Copy `.env.example` to `.env.local` and set your API key if needed:
   ```bash
   cp .env.example .env.local
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```