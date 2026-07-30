import { useCallback, useEffect, useState } from 'react';
import { Preloader } from '@/components/Preloader';
import { Nav } from '@/components/Nav';
import { Cursor } from '@/components/Cursor';
import { Grain } from '@/components/Grain';
import { ScrollRail } from '@/components/ScrollRail';
import { SceneBoundary } from '@/components/SceneBoundary';
import { Scene } from '@/three/Scene';
import { Hero } from '@/sections/Hero';
import { Origin } from '@/sections/Origin';
import { Roast } from '@/sections/Roast';
import { Brew } from '@/sections/Brew';
import { Menu } from '@/sections/Menu';
import { Ritual } from '@/sections/Ritual';
import { Visit } from '@/sections/Visit';
import { useSmoothScroll, lockScroll } from '@/hooks/useSmoothScroll';
import { ScrollTrigger } from '@/lib/gsap';
import { measureActs, setLive } from '@/lib/scroll';

export default function App() {
  const [sceneReady, setSceneReady] = useState(false);
  const [live, setLiveState] = useState(false);

  useSmoothScroll();

  // Always open on the hero, even on a reload halfway down the page.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    lockScroll(true);
  }, []);

  const onReady = useCallback(() => setSceneReady(true), []);

  const onIntroDone = useCallback(() => {
    lockScroll(false);
    setLive(true);
    setLiveState(true);
    // The document height is final now that the loader is out of the flow.
    measureActs();
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <a className="skip-link" href="#menu">
        Skip to the menu
      </a>

      <div className="scene" data-ready={sceneReady} aria-hidden="true">
        <SceneBoundary onFail={onReady}>
          <Scene onReady={onReady} />
        </SceneBoundary>
      </div>
      <div className="scene-veil" aria-hidden="true" />

      <Nav />
      <ScrollRail />
      <Cursor />
      <Grain />

      <main className="main" id="top">
        <Hero start={live} />
        <Origin />
        <Roast />
        <Brew />
        <Menu />
        <Ritual />
        <Visit />
      </main>

      <Preloader ready={sceneReady} onDone={onIntroDone} />
    </>
  );
}
