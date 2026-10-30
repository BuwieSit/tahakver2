import '@testing-library/jest-dom';

// Mock assets imported by DataContext and pages (Vite handles these, jsdom does not)
vi.mock('../assets/pictures/farm.jpg', () => ({ default: 'farm.jpg' }));
vi.mock('../assets/pictures/forestbath.jpg', () => ({ default: 'forestbath.jpg' }));
vi.mock('../assets/pictures/trek.jpg', () => ({ default: 'trek.jpg' }));
vi.mock('../assets/pictures/tea.jpg', () => ({ default: 'tea.jpg' }));
vi.mock('../assets/pictures/sound.jpg', () => ({ default: 'sound.jpg' }));
vi.mock('../assets/pictures/hilot.png', () => ({ default: 'hilot.png' }));
vi.mock('../assets/tahak_logo.png', () => ({ default: 'tahak_logo.png' }));
vi.mock('../assets/mountain.jpg', () => ({ default: 'mountain.jpg' }));
vi.mock('../assets/sta_lucia.jpg', () => ({ default: 'sta_lucia.jpg' }));
vi.mock('../assets/rocks.webp', () => ({ default: 'rocks.webp' }));
vi.mock('../assets/fb_icon.png', () => ({ default: 'fb_icon.png' }));
vi.mock('../assets/email_icon.png', () => ({ default: 'email_icon.png' }));
vi.mock('../assets/ig_icon.png', () => ({ default: 'ig_icon.png' }));

// Silence expected console.error calls from DataContext localStorage fallback
beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});
