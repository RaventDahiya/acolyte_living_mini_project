# Student Housing Explorer

A React Native (Expo) mobile app for browsing student housing properties with filtering, favorites, and detail views.

## Features

- **Property List**: Browse 8 mock properties with thumbnails, pricing, distance, and ratings
- **Search & Filter**: Search by name/address, filter by city, max price, and max distance (AND logic)
- **Property Detail**: Full-screen hero image, image gallery, all property details, favorite toggle
- **Favorites**: Persisted locally with AsyncStorage, survives app restarts
- **Pull-to-Refresh**: Re-fetch properties with simulated network delay
- **Loading States**: Skeleton loaders for smooth UX
- **Error Handling**: Graceful error display with retry capability

## Tech Stack

- **Framework**: Expo SDK 57 / React Native 0.86
- **Language**: TypeScript (strict mode)
- **Navigation**: Expo Router (file-based routing)
- **State Management**: 
  - @tanstack/react-query (server state, caching, retries)
  - Zustand + AsyncStorage (client state: favorites, filters)
- **UI Components**: 
  - @shopify/FlashList (performant list rendering)
  - expo-image (fast image loading with caching)
  - react-native-bottom-sheet (filter modal)
  - expo-linear-gradient (skeleton shimmer)
- **Code Quality**: ESLint, Prettier, TypeScript strict mode

## Setup & Run

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd student-housing-explorer

# Install dependencies
npm install

# Start development server
npx expo start
```

### Run on Platforms

```bash
# iOS (requires macOS)
npm run ios

# Android
npm run android

# Web
npm run web
```

### Development Commands

```bash
# Type checking
npm run typecheck

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check
```

## Project Structure

```
student-housing-explorer/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout with providers
│   ├── (tabs)/             # Tab navigator
│   │   ├── _layout.tsx     # Tab bar config
│   │   ├── index.tsx       # Property list screen
│   │   └── favorites.tsx   # Favorites screen
│   └── property/[id].tsx   # Property detail screen
├── src/
│   ├── api/                # Mock API with delay/failure simulation
│   ├── components/         # Reusable UI components
│   │   ├── PropertyCard.tsx
│   │   ├── PropertyImage.tsx
│   │   ├── RatingStars.tsx
│   │   ├── SearchBar.tsx
│   │   ├── CityChips.tsx
│   │   ├── PriceSlider.tsx
│   │   ├── DistanceSlider.tsx
│   │   ├── FilterSheet.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   └── EmptyState.tsx
│   ├── constants/          # App constants
│   ├── data/               # Seed data (properties.seed.json)
│   ├── hooks/              # Custom React hooks
│   │   ├── useProperties.ts
│   │   ├── useProperty.ts
│   │   ├── useFavorites.ts
│   │   └── useFilters.ts
│   ├── screens/            # Screen components
│   │   ├── PropertyListScreen.tsx
│   │   ├── PropertyDetailScreen.tsx
│   │   └── FavoritesScreen.tsx
│   ├── store/              # Zustand stores
│   │   ├── favorites.ts
│   │   └── filters.ts
│   ├── types/              # TypeScript interfaces
│   │   └── property.ts
│   └── utils/              # Utility functions
│       ├── formatters.ts
│       ├── filterUtils.ts
│       └── storage.ts
├── .eslintrc.js            # ESLint config (flat)
├── .prettierrc             # Prettier config
├── tsconfig.json           # TypeScript config with path aliases
└── package.json
```

## Architecture Decisions

1. **Expo Router** - File-based routing with type-safe navigation, integrates seamlessly with Expo ecosystem
2. **@tanstack/react-query** - Handles server state with caching, deduplication, retry logic, and stale-while-revalidate
3. **Zustand + AsyncStorage** - Lightweight client state management with simple persistence for favorites and filters
4. **@shopify/FlashList** - High-performance list rendering with maintained scroll position, better than FlatList
5. **expo-image** - Fast image loading with built-in caching, placeholder support, and web compatibility
6. **TypeScript strict mode** - Full type safety across API, components, navigation, and stores

## Known Limitations

1. No real backend - mock API only with simulated 400-800ms delay and 5% failure rate
2. No map view for property locations (lat/lng available in data but unused)
3. No authentication/user accounts
4. Favorites stored locally only (not synced to cloud)
5. Images from picsum.photos (placeholder service)
6. No offline-first architecture beyond React Query cache
7. No push notifications
8. Limited accessibility testing

## Future Improvements

1. **Map Integration** - Show properties on map with clustering
2. **Real Backend** - Replace mock API with real endpoints
3. **User Accounts** - Cloud-synced favorites, preferences, saved searches
4. **Advanced Filters** - Room type, beds, operator, amenities
5. **Comparison Feature** - Side-by-side property comparison
6. **Offline Support** - Full offline-first with sync
7. **Unit/E2E Tests** - Jest + React Native Testing Library + Detox
8. **CI/CD** - GitHub Actions for build, test, deploy
9. **Analytics** - Track filter usage, property views, conversions
10. **Accessibility** - Full a11y audit, screen reader support

## Time Spent

~12 hours total (detailed implementation following the execution plan)

## License

MIT