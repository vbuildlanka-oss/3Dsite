import { useState } from 'react';
import { useAct } from '@/hooks/useAct';
import { useReveal } from '@/hooks/useReveal';
import { SplitText } from '@/components/SplitText';
import { BRAND, HOURS } from '@/content/site';

/** Closing act: where we are, when we're open, and who built this. */
export function Visit() {
  const act = useAct('visit');
  const scope = useReveal<HTMLElement>();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    setMsg(valid ? 'Thank you — we send one note a month.' : 'That address looks incomplete.');
    if (valid) setEmail('');
  };

  return (
    <footer
      className="section visit scrim"
      id="visit"
      ref={(el) => {
        act(el);
        scope.current = el;
      }}
      aria-labelledby="visit-title"
    >
      <div className="shell">
        <div className="visit__grid">
          <div>
            <div className="section__head">
              <span className="label">Visit</span>
            </div>

            <h2 className="visit__title" id="visit-title">
              <SplitText lines={['Kiln Lane,', <>from <em>seven</em></>]} />
            </h2>

            <p className="lead" data-reveal="fade" data-reveal-delay={0.1}>
              {BRAND.address}. Two minutes from Hoxton overground, under the green
              awning. No laptops after eleven on weekends.
            </p>

            <form className="subscribe" onSubmit={submit} data-reveal="fade" data-reveal-delay={0.2}>
              <label className="sr-only" htmlFor="newsletter">
                Email address
              </label>
              <input
                id="newsletter"
                type="email"
                name="email"
                placeholder="Lot drops and pop-ups"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" data-cursor="Send">
                Subscribe
              </button>
            </form>
            <p className="subscribe__msg" role="status">
              {msg}
            </p>
          </div>

          <div className="visit__cols" data-reveal="fade" data-reveal-delay={0.15}>
            <div className="visit__col">
              <h4>Hours</h4>
              <ul>
                {HOURS.map((h) => (
                  <li key={h.day}>
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="visit__col">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} data-cursor="Call">
                    {BRAND.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${BRAND.email}`} data-cursor="Email">
                    {BRAND.email}
                  </a>
                </li>
                <li>
                  <a
                    href="https://maps.google.com/?q=Kiln+Lane+Shoreditch+London"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Map"
                  >
                    Directions
                  </a>
                </li>
              </ul>
            </div>

            <div className="visit__col">
              <h4>Elsewhere</h4>
              <ul>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://open.spotify.com" target="_blank" rel="noreferrer">
                    Bar playlist
                  </a>
                </li>
                <li>
                  <a href="#origin">Wholesale</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="wordmark" data-reveal="mask" aria-hidden="true">
          Ember &amp; Oak
        </p>

        <div className="colophon">
          <span>
            © {new Date().getFullYear()} {BRAND.name} — {BRAND.coords}
          </span>
          <span>Roasted on site, six days a week</span>
          <span className="colophon__vbuild">
            Crafted by{' '}
            <a href="https://github.com/vbuildlanka-oss" target="_blank" rel="noreferrer">
              VBUILD<sup>™</sup>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
