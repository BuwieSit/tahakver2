import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Packages, { 
    getPackageCategory, 
    getPackageInclusions, 
    getPackageItinerary 
} from '../pages/TouristPages/Packages';
import { DataProvider } from '../contexts/DataContext';
import { LanguageProvider } from '../contexts/LanguageContext';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe('Packages Helper Functions', () => {
    describe('getPackageCategory', () => {
        it('identifies 3D2N packages', () => {
            expect(getPackageCategory({ title: 'Kapwa Package (3D2N)', duration: '3 Days, 2 Nights' })).toBe('3D2N Retreat');
        });

        it('identifies 2D1N packages', () => {
            expect(getPackageCategory({ title: 'Ugnayan Package (2D1N)', duration: '2 Days, 1 Night' })).toBe('2D1N Sanctuary');
        });

        it('identifies Day Tour packages', () => {
            expect(getPackageCategory({ title: 'Sama-Sama Package (Day Tour)', duration: 'Day Tour' })).toBe('Day Tour');
        });

        it('defaults to Wellness Tour for generic packages', () => {
            expect(getPackageCategory({ title: 'Forest Immersion', duration: 'Custom' })).toBe('Wellness Tour');
        });
    });

    describe('getPackageInclusions', () => {
        it('returns preset inclusions for ID 1 (Kapwa)', () => {
            const inclusions = getPackageInclusions({ id: 1 });
            expect(inclusions).toContain('Mt. Banahaw guided trek with Pamumuwesto');
            expect(inclusions).toContain('Banahaw Circle Nature Retreat stay (2 Nights)');
        });

        it('returns preset inclusions for ID 2 (Ugnayan)', () => {
            const inclusions = getPackageInclusions({ id: 2 });
            expect(inclusions).toContain('Banahaw Circle Nature Retreat stay (1 Night)');
            expect(inclusions).toContain('Arnis stick yoga & Mt. Banahaw forest bathing');
        });

        it('returns preset inclusions for ID 3 (Sama-Sama)', () => {
            const inclusions = getPackageInclusions({ id: 3 });
            expect(inclusions).toContain('Mt. Banahaw guided trek with folklore storytelling');
            expect(inclusions).toContain('Kawa bath with complimentary coconut treat');
        });

        it('returns fallback inclusions for unknown custom ID', () => {
            const inclusions = getPackageInclusions({ id: 999 });
            expect(inclusions.length).toBeGreaterThan(0);
            expect(inclusions[0]).toBe('Accredited local eco-guide & safety steward');
        });
    });

    describe('getPackageItinerary', () => {
        it('returns preset daily itinerary breakdown for ID 1 (Kapwa)', () => {
            const itinerary = getPackageItinerary({ id: 1 });
            expect(itinerary.length).toBe(3);
            expect(itinerary[0].title).toContain('Tangan ni Ama');
            expect(itinerary[1].title).toContain('Kalinga ni Inay');
            expect(itinerary[2].title).toContain('Yapak ni Bunso');
        });

        it('returns preset daily itinerary breakdown for ID 2 (Ugnayan)', () => {
            const itinerary = getPackageItinerary({ id: 2 });
            expect(itinerary.length).toBe(2);
            expect(itinerary[0].title).toContain('Sandigan kay Kuya');
            expect(itinerary[1].title).toContain('Paghilom kay Ate');
        });

        it('returns preset itinerary steps for ID 3 (Sama-Sama)', () => {
            const itinerary = getPackageItinerary({ id: 3 });
            expect(itinerary.length).toBe(2);
            expect(itinerary[0].title).toContain('Sulyap ng Tahanan');
        });

        it('returns fallback itinerary for unknown custom ID', () => {
            const itinerary = getPackageItinerary({ id: 999, title: 'Custom Tour', desc: 'A nice day' });
            expect(itinerary.length).toBe(3);
            expect(itinerary[0].title).toBe('Basecamp Arrival & Briefing');
        });
    });
});

describe('Packages Component UI', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    const renderPackages = () => {
        return render(
            <MemoryRouter>
                <LanguageProvider>
                    <DataProvider>
                        <Packages />
                    </DataProvider>
                </LanguageProvider>
            </MemoryRouter>
        );
    };

    it('renders the header title and description without a hero banner', () => {
        renderPackages();
        expect(screen.getByRole('heading', { level: 1, name: /Our Sacred Journeys/i })).toBeInTheDocument();
        expect(screen.getByText(/Choose from our three signature retreats/i)).toBeInTheDocument();
    });

    it('renders trust assurance badges', () => {
        renderPackages();
        expect(screen.getByText('Banahaw Stewards')).toBeInTheDocument();
        expect(screen.getByText('Farm-to-Table')).toBeInTheDocument();
        expect(screen.getByText('24h Confirmation')).toBeInTheDocument();
        expect(screen.getByText('Flexible Reschedule')).toBeInTheDocument();
    });

    it('renders the 3 official packages from TOUR_PACKAGES.md', () => {
        renderPackages();
        expect(screen.getByText('Kapwa Package (3D2N)')).toBeInTheDocument();
        expect(screen.getByText('Ugnayan Package (2D1N)')).toBeInTheDocument();
        expect(screen.getByText('Sama-Sama Package (Day Tour)')).toBeInTheDocument();
    });

    it('filters packages dynamically through search input', () => {
        renderPackages();
        const searchInput = screen.getByPlaceholderText(/Search by name, duration, or ritual/i);
        
        fireEvent.change(searchInput, { target: { value: 'Kapwa' } });
        expect(screen.getByText('Kapwa Package (3D2N)')).toBeInTheDocument();
        expect(screen.queryByText('Sama-Sama Package (Day Tour)')).not.toBeInTheDocument();
    });

    it('displays empty state and allows resetting filters', () => {
        renderPackages();
        const searchInput = screen.getByPlaceholderText(/Search by name, duration, or ritual/i);
        
        fireEvent.change(searchInput, { target: { value: 'NonexistentExperience12345' } });
        expect(screen.getByText('No matching packages')).toBeInTheDocument();

        const clearBtn = screen.getByRole('button', { name: /Clear filters/i });
        fireEvent.click(clearBtn);
        expect(screen.getByText('Kapwa Package (3D2N)')).toBeInTheDocument();
    });

    it('opens Quick View modal with itinerary when "Full Itinerary" is clicked', () => {
        renderPackages();
        const viewDetailsButtons = screen.getAllByRole('button', { name: /Full Itinerary/i });
        fireEvent.click(viewDetailsButtons[0]);

        expect(screen.getByText("What's Included")).toBeInTheDocument();
        expect(screen.getByText("Daily Breakdown & Rituals")).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Proceed to Book/i })).toBeInTheDocument();

        // Close modal
        const closeBtn = screen.getByLabelText('Close modal');
        fireEvent.click(closeBtn);
        expect(screen.queryByText("What's Included")).not.toBeInTheDocument();
    });

    it('navigates to /booking with selectedPackage state when "Book Now" is clicked', () => {
        renderPackages();
        const bookNowButtons = screen.getAllByRole('button', { name: /Book Now/i });
        fireEvent.click(bookNowButtons[0]);

        expect(mockNavigate).toHaveBeenCalledWith('/booking', expect.objectContaining({
            state: expect.objectContaining({
                selectedPackage: expect.objectContaining({ id: 1 })
            })
        }));
    });

    it('navigates to /create when custom builder button is clicked', () => {
        renderPackages();
        const customBtn = screen.getByRole('button', { name: /Build Custom Package/i });
        fireEvent.click(customBtn);

        expect(mockNavigate).toHaveBeenCalledWith('/create');
    });

    it('toggles FAQ accordions', () => {
        renderPackages();
        const faqQuestion = screen.getByText(/What makes Tahak's three core packages unique\?/i);
        fireEvent.click(faqQuestion);

        expect(screen.getByText(/Our three official packages—Sama-Sama/i)).toBeInTheDocument();
    });
});
