import React, { useRef } from 'react';
import dynamic from 'next/dynamic';

const Interactive3DBackground = dynamic(() => import('../components/sokoloff/Interactive3DBackground'), { ssr: false });
import HeroSection from '../components/sokoloff/HeroSection';
import AboutSection from '../components/sokoloff/AboutSection';
import ChronologySection from '../components/sokoloff/ChronologySection';
import TimelineSection from '../components/sokoloff/TimelineSection';
import InteractiveGallery from '../components/sokoloff/InteractiveGallery';
import FullBiographySection from '../components/sokoloff/FullBiographySection';
import BiographySection from '../components/sokoloff/BiographySection';
import FooterSection from '../components/sokoloff/FooterSection';
const SectionNavigation = dynamic(() => import('../components/sokoloff/SectionNavigation'), { ssr: false });
import { LanguageProvider } from '../components/sokoloff/LanguageContext';
import LanguageToggle from '../components/sokoloff/LanguageToggle';

const MapSection = dynamic(() => import('../components/sokoloff/MapSection'), {
  ssr: false,
});

export default function Home() {
  const timelineRef = useRef(null);

  const scrollToTimeline = () => {
    timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
    <div className="bg-black min-h-screen overflow-x-hidden scroll-smooth">
      <Interactive3DBackground />
      <LanguageToggle />
      <SectionNavigation />
      
      <div id="hero">
        <HeroSection onScrollToTimeline={scrollToTimeline} />
      </div>
      
      <AboutSection />
      
      <div id="chronology">
        <ChronologySection />
      </div>
      
      <div id="timeline">
        <TimelineSection scrollRef={timelineRef} />
      </div>
      
      <InteractiveGallery />
      
      <div id="map">
        <MapSection />
      </div>
      
      <FullBiographySection />
      
      <BiographySection />
      
      <FooterSection />
    </div>
    </LanguageProvider>
  );
}
