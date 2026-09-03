# Student Housing Explorer - Execution Plan

## Project Overview
Build a Student Housing Explorer mobile app using React Native (Expo recommended) with browse, filter, detail, and favorites flows using the provided mock property dataset.

## Timeline: 4-6 hours (recommended 5 calendar days from receipt)

---

## Phase 1: Project Setup & Foundation (1-1.5 hours)

### 1.1 Initialize Project
- [ ] Create Expo project: `npx create-expo-app@latest student-housing-explorer --template blank-typescript`
- [ ] Install dependencies:
  ```bash
  # Core
  npx expo install expo-router expo-linking expo-constants expo-status-bar
  
  # Navigation
  npx expo install @react-navigation/native @react-navigation/native-stack
  npx expo install react-native-screens react-native-safe-area-context
  
  # State & Data
  npx expo install @tanstack/react-query zustand @react-native-async-storage/async-storage
  
  # UI Components
  npx expo install @shopify/flash-list expo-image react-native-gesture-handler react-native-reanimated
  
  # Utils
  npx expo install expo-linear-gradient expo-blur
  ```
- [ ] Configure TypeScript paths in `tsconfig.json`
- [ ] Set up ESLint + Prettier

### 1.2 Project Structure
```
src/
├── api/
│   └── properties.ts          # Mock API with delay & failure simulation
├── data/
│   └── properties.seed.json   # Seed data (8 properties)
├── types/
│   └── property.ts            # TypeScript interfaces
├── store/
│   ├── favorites.ts           # Zustand store for favorites (MMKV/AsyncStorage)
│   └── filters.ts             # Zustand store for filter state
├── components/
│   ├── PropertyCard.tsx       # Reusable property card
│   ├── PropertyImage.tsx      # Image with placeholder/loading
│   ├── FilterSheet.tsx        # Bottom sheet for filters
│   ├── SearchBar.tsx          # Search input component
│   ├── PriceSlider.tsx        # Max price slider
│   ├── DistanceSlider.tsx     # Max distance slider
│   ├── CityChips.tsx          # City filter chips
│   ├── RatingStars.tsx        # Star rating display
│   ├── EmptyState.tsx         # Empty state component
│   ├── LoadingSkeleton.tsx    # Skeleton loader
│   └── ErrorBoundary.tsx      # Error boundary
├── screens/
│   ├── PropertyListScreen.tsx # Main list screen (/)
│   ├── PropertyDetailScreen.tsx # Detail screen (/property/:id)
│   └── FavoritesScreen.tsx    # Favorites screen (/favorites)
├── hooks/
│   ├── useProperties.ts       # React Query hook for properties
│   ├── useProperty.ts         # React Query hook for single property
│   ├── useFavorites.ts        # Favorites hook
│   └── useFilters.ts          # Filters hook
├── utils/
│   ├── formatters.ts          # Currency, distance formatting
│   ├── filterUtils.ts         # Filter logic (AND combination)
│   └── storage.ts             # MMKV/AsyncStorage helpers
└── constants/
    └── index.ts               # App constants
```

---

## Phase 2: Core Types & Mock API (30-45 min)

### 2.1 Type Definitions (`src/types/property.ts`)
```typescript
export interface Property {
  id: string;
  name: string;
  lat: number;
  lng: number;
  price: number;
  currency: string;
  address: string;
  university: string;
  distance: number;
  rating: number | null;
  about: string;
  images: string[];
  houseUrl: string;
  operator?: string;
  beds?: number;
  roomTypes?: string;
  country?: string;
  city?: string;
}

export interface FetchPropertiesResult {
  data: Property[];
  fetchedAt: string;
}
```

### 2.2 Seed Data (`src/data/properties.seed.json`)
- Copy the 8 properties from the assessment document

### 2.3 Mock API (`src/api/properties.ts`)
- Import seed data
- Implement `delay(400-800ms)` with `Math.random()`
- Implement `maybeFail()` with 5% failure rate
- Export `fetchProperties()` and `fetchPropertyById(id)`

---

## Phase 3: State Management (45-60 min)

### 3.1 Favorites Store (`src/store/favorites.ts`)
- Use Zustand with persist middleware (AsyncStorage or MMKV)
- State: `favoriteIds: string[]`
- Actions: `toggleFavorite(id)`, `isFavorite(id)`, `getFavorites()`, `clearFavorites()`

### 3.2 Filters Store (`src/store/filters.ts`)
- Use Zustand
- State:
  ```typescript
  searchQuery: string;
  selectedCities: string[];
  maxPrice: number | null;
  maxDistance: number | null;
  ```
- Actions: `setSearchQuery()`, `toggleCity()`, `setMaxPrice()`, `setMaxDistance()`, `clearAll()`, `getActiveCount()`

---

## Phase 4: Data Fetching Hooks (30-45 min)

### 4.1 `useProperties` Hook (`src/hooks/useProperties.ts`)
- Use `@tanstack/react-query`
- Query key: `['properties']`
- Select filtered data using filter store selectors
- Handle loading, error, empty states

### 4.2 `useProperty` Hook (`src/hooks/useProperty.ts`)
- Query key: `['property', id]`
- Enabled when id exists
- Return property data

### 4.3 `useFavorites` Hook (`src/hooks/useFavorites.ts`)
- Subscribe to favorites store
- Return `favorites`, `toggleFavorite`, `isFavorite`

### 4.4 `useFilters` Hook (`src/hooks/useFilters.ts`)
- Subscribe to filters store
- Return filter state and actions

---

## Phase 5: Utility Functions (30 min)

### 5.1 Formatters (`src/utils/formatters.ts`)
- `formatCurrency(price, currency)` - e.g., "£189/week", "$1,450/week"
- `formatDistance(km)` - e.g., "0.8 km"
- `formatRating(rating)` - e.g., "4.5"

### 5.2 Filter Utils (`src/utils/filterUtils.ts`)
- `filterProperties(properties, filters)` - AND logic combining all filters
- `getUniqueCities(properties)` - Extract unique cities for chips
- `getPriceRange(properties)` - Min/max for slider bounds

### 5.3 Storage (`src/utils/storage.ts`)
- MMKV or AsyncStorage wrapper for persistence

---

## Phase 6: Core Components (1.5-2 hours)

### 6.1 PropertyCard (`src/components/PropertyCard.tsx`)
- FlashList item component
- Thumbnail (expo-image with placeholder)
- Name, city/university, price, distance, rating
- Favorite heart icon (synced with store)
- Press handler for navigation

### 6.2 PropertyImage (`src/components/PropertyImage.tsx`)
- Expo Image with priority loading
- Placeholder/skeleton while loading
- Error fallback

### 6.3 LoadingSkeleton (`src/components/LoadingSkeleton.tsx`)
- Skeleton matching PropertyCard layout
- Shimmer animation

### 6.4 EmptyState (`src/components/EmptyState.tsx`)
- Configurable icon, title, message
- Used for: no results, no favorites, error states

### 6.5 FilterSheet (`src/components/FilterSheet.tsx`)
- Bottom sheet (react-native-bottom-sheet or modal)
- SearchBar (text input)
- CityChips (horizontal scrollable chips)
- PriceSlider (dual thumb or single max)
- DistanceSlider
- Active filter count badge
- Clear All button
- Apply/Close actions

### 6.6 RatingStars (`src/components/RatingStars.tsx`)
- 5 stars, filled based on rating
- Half-star support
- Read-only display

---

## Phase 7: Screens Implementation (2-2.5 hours)

### 7.1 PropertyListScreen (`src/screens/PropertyListScreen.tsx`)
- FlashList with `PropertyCard` items
- Pull-to-refresh (refetch properties)
- LoadingSkeleton on initial load
- EmptyState when filtered results empty
- Filter button in header (shows active count badge)
- Navigate to PropertyDetail on press
- Preserve scroll position (FlashList `maintainScrollPosition`)

### 7.2 PropertyDetailScreen (`src/screens/PropertyDetailScreen.tsx`)
- Hero image (first image, full width)
- Horizontal image gallery (scrollable) if multiple images
- Name, address, about text
- Price, currency, beds, room types
- University + distance
- Operator name
- Favorite toggle (heart icon in header)
- Back navigation preserves list scroll + filters

### 7.3 FavoritesScreen (`src/screens/FavoritesScreen.tsx`)
- Filter properties by favoriteIds
- Same PropertyCard UI
- EmptyState: "No saved properties yet"
- Unfavorite removes from list immediately
- Tab bar navigation

---

## Phase 8: Navigation & Routing (30-45 min)

### 8.1 Expo Router Setup
- `app/_layout.tsx` - Root layout with providers
- `app/(tabs)/_layout.tsx` - Tab navigator
- `app/(tabs)/index.tsx` - PropertyListScreen
- `app/(tabs)/favorites.tsx` - FavoritesScreen
- `app/property/[id].tsx` - PropertyDetailScreen

### 8.2 Providers
- QueryClientProvider (React Query)
- Zustand providers (if needed)
- GestureHandlerRootView

---

## Phase 9: Polish & Testing (1-1.5 hours)

### 9.1 Visual Polish
- Consistent spacing, typography
- Platform-specific adjustments (iOS/Android)
- Safe area handling
- Dark mode support (optional)

### 9.2 Error Handling
- ErrorBoundary for screens
- Network error retry (pull-to-refresh)
- Friendly error messages

### 9.3 Performance
- FlashList `estimatedItemSize`
- Image caching (expo-image)
- Memoized filter computations
- Lazy load detail screen

### 9.4 Testing Checklist
- [ ] App launches on iOS Simulator
- [ ] App launches on Android Emulator
- [ ] Property list loads with skeleton → data
- [ ] Pull-to-refresh works
- [ ] Filters apply correctly (AND logic)
- [ ] Filter count badge updates
- [ ] Clear filters works
- [ ] Property detail navigates correctly
- [ ] Image gallery swipes
- [ ] Favorite toggle works on list & detail
- [ ] Favorites persist after app restart
- [ ] Favorites screen shows only favorites
- [ ] Unfavorite from favorites screen works
- [ ] Back navigation preserves scroll position
- [ ] Empty states display correctly
- [ ] Network error simulation (5%) handles gracefully

---

## Phase 10: Documentation & Submission (30 min)

### 10.1 README.md
- Setup and run instructions (iOS/Android)
- Architecture decisions (2-5 bullets)
- Known limitations
- What you'd do with more time
- Total time spent

### 10.2 Git Repository
- Initialize git
- Commit progressively
- Push to GitHub/GitLab (public)
- Verify clone & run works

---

## Architecture Decisions (for README)

1. **Expo Router** - File-based routing, type-safe, integrates with Expo ecosystem
2. **@tanstack/react-query** - Server state management, caching, deduping, retry logic
3. **Zustand + AsyncStorage** - Lightweight client state, simple persistence for favorites/filters
4. **@shopify/FlashList** - Performant list rendering, maintains scroll position, better than FlatList
5. **expo-image** - Fast image loading, caching, placeholder support, web-compatible
6. **TypeScript strict mode** - Type safety across API, components, navigation

---

## Known Limitations

1. No real backend - mock API only with simulated failures
2. No map view for property locations (lat/lng available but unused)
3. No authentication/user accounts
4. Favorites stored locally only (not synced)
5. Images from picsum.photos (placeholder service)
6. No offline-first architecture beyond cached queries
7. No push notifications
8. Limited accessibility testing

---

## Future Improvements (with more time)

1. **Map Integration** - Show properties on map with clustering
2. **Real Backend** - Replace mock API with real endpoints
3. **User Accounts** - Cloud-synced favorites, preferences
4. **Advanced Filters** - Room type, beds, operator, amenities
5. **Comparison Feature** - Side-by-side property comparison
6. **Offline Support** - Full offline-first with sync
7. **Unit/E2E Tests** - Jest + React Native Testing Library + Detox
8. **CI/CD** - GitHub Actions for build, test, deploy
9. **Analytics** - Track filter usage, property views
10. **Accessibility** - Full a11y audit, screen reader support

---

## Dependencies Summary

| Category | Packages |
|----------|----------|
| Framework | expo, expo-router, react-native |
| Navigation | @react-navigation/native, @react-navigation/native-stack, react-native-screens, react-native-safe-area-context |
| State | @tanstack/react-query, zustand, @react-native-async-storage/async-storage |
| UI/List | @shopify/flash-list, expo-image, react-native-gesture-handler, react-native-reanimated |
| Utils | expo-linear-gradient, expo-blur, react-native-bottom-sheet (optional) |
| Dev | typescript, eslint, prettier, @types/react |

---

## Estimated Time Breakdown

| Phase | Estimated Time |
|-------|----------------|
| Setup & Foundation | 1.5 hrs |
| Types & Mock API | 0.75 hrs |
| State Management | 1 hr |
| Data Fetching Hooks | 0.75 hrs |
| Utilities | 0.5 hrs |
| Core Components | 2 hrs |
| Screens | 2.5 hrs |
| Navigation | 0.75 hrs |
| Polish & Testing | 1.5 hrs |
| Documentation | 0.5 hrs |
| **Total** | **~12 hrs** |

*Note: The assessment estimates 4-6 hours for an experienced developer. This plan is detailed for completeness; experienced developers can combine/parallelize phases.*

---

## Quick Start Commands

```bash
# Clone and setup
git clone <repo-url>
cd student-housing-explorer
npm install

# Start development
npx expo start

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

---

## File Checklist for Submission

- [ ] `package.json` with all dependencies
- [ ] `tsconfig.json` configured
- [ ] `app.json` / `app.config.ts` with Expo config
- [ ] `src/types/property.ts`
- [ ] `src/data/properties.seed.json`
- [ ] `src/api/properties.ts`
- [ ] `src/store/favorites.ts`
- [ ] `src/store/filters.ts`
- [ ] `src/hooks/useProperties.ts`
- [ ] `src/hooks/useProperty.ts`
- [ ] `src/hooks/useFavorites.ts`
- [ ] `src/hooks/useFilters.ts`
- [ ] `src/utils/formatters.ts`
- [ ] `src/utils/filterUtils.ts`
- [ ] `src/utils/storage.ts`
- [ ] `src/components/PropertyCard.tsx`
- [ ] `src/components/PropertyImage.tsx`
- [ ] `src/components/LoadingSkeleton.tsx`
- [ ] `src/components/EmptyState.tsx`
- [ ] `src/components/FilterSheet.tsx`
- [ ] `src/components/SearchBar.tsx`
- [ ] `src/components/CityChips.tsx`
- [ ] `src/components/PriceSlider.tsx`
- [ ] `src/components/DistanceSlider.tsx`
- [ ] `src/components/RatingStars.tsx`
- [ ] `src/screens/PropertyListScreen.tsx`
- [ ] `src/screens/PropertyDetailScreen.tsx`
- [ ] `src/screens/FavoritesScreen.tsx`
- [ ] `app/_layout.tsx`
- [ ] `app/(tabs)/_layout.tsx`
- [ ] `app/(tabs)/index.tsx`
- [ ] `app/(tabs)/favorites.tsx`
- [ ] `app/property/[id].tsx`
- [ ] `README.md`