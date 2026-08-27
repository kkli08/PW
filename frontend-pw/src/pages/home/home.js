import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './home.css';
import Header from '../../component/header/header';
import Cover from '../../component/cover/cover';
import { ref, runTransaction } from 'firebase/database';
import { database } from '../../firebase';

const About = lazy(() => import('../../component/about/about'));
const Experience = lazy(() => import('../../component/experience/experience'));
const Project = lazy(() => import('../../component/project/project'));
const Blog = lazy(() => import('../../component/blog/blog'));
const Contact = lazy(() => import('../../component/contact/contact'));
const Contribution = lazy(() => import('../../component/contribution/contribution'));

function DeferredSection({ id, minHeight, children }) {
  const sectionRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || !('IntersectionObserver' in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="deferred-section"
      style={{ '--deferred-min-height': minHeight }}
    >
      {shouldRender && (
        <Suspense fallback={<div className="section-loading" aria-hidden="true" />}>
          {children}
        </Suspense>
      )}
    </section>
  );
}

function Home() {
  useEffect(() => {
    const incrementViewCount = async () => {
      try {
        await runTransaction(ref(database, 'viewCount'), (currentCount) => (currentCount || 0) + 1);
      } catch (error) {
        // Analytics should never prevent the page itself from rendering.
        console.warn('Unable to update view count.', error);
      }
    };

    incrementViewCount();
  }, []); // Empty dependency array ensures this runs once per render

  return (
    <div className="Home">
      <header className="Home-header">
        <Header />
      </header>
      <main>
        <Cover />
        <DeferredSection id="about" minHeight="80vh"><About /></DeferredSection>
        <DeferredSection id="experience" minHeight="75vh"><Experience /></DeferredSection>
        <DeferredSection id="projects" minHeight="80vh"><Project /></DeferredSection>
        <DeferredSection id="blog" minHeight="70vh"><Blog /></DeferredSection>
        <DeferredSection id="contact" minHeight="45vh"><Contact /></DeferredSection>
        <DeferredSection id="contribution" minHeight="30vh"><Contribution /></DeferredSection>
      </main>
    </div>
  );
}

export default Home;
