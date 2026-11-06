import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ArrowDownRight, ArrowUpRight, CodeXml, Mail, MapPin, Menu, Phone, Sparkles, X } from 'lucide-react'
import './App.css'

const sections = [
  { id: 'about', label: 'À propos' },
  { id: 'skills', label: 'Compétences' },
  { id: 'experience', label: 'Expérience' },
  { id: 'projects', label: 'Projets' },
  { id: 'education', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuToggleRef = useRef(null)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuToggleRef.current?.focus()
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 761px)')
    const closeOnDesktop = (event) => {
      if (event.matches) setIsMenuOpen(false)
    }

    desktopQuery.addEventListener('change', closeOnDesktop)
    return () => desktopQuery.removeEventListener('change', closeOnDesktop)
  }, [])

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="portfolio-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Accueil — Hibatallah Sadiki" onClick={closeMenu}>
          <span className="wordmark-mark">HS</span>
          <span>Hibatallah Sadiki</span>
        </a>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} onClick={closeMenu}>
              {section.label}
            </a>
          ))}
        </nav>

        <button
          ref={menuToggleRef}
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div
          className="mobile-nav-slot"
          id="mobile-navigation"
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
        >
          <AnimatePresence initial={false}>
            {isMenuOpen && (
              <motion.nav
                className="mobile-nav"
                aria-label="Navigation mobile"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8, pointerEvents: 'none' }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {sections.map((section) => (
                  <a key={section.id} href={`#${section.id}`} onClick={closeMenu}>
                    {section.label}
                  </a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main id="top">
        <motion.section
          className="intro"
          id="about"
          aria-labelledby="intro-title"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <div className="intro-copy">
            <p className="eyebrow">Développeuse web full stack · Nador, Maroc</p>
            <h1 id="intro-title">
              Hibatallah <span className="name-gradient">Sadiki</span>
            </h1>
            <p className="intro-role">Des applications web utiles, du front au back.</p>
            <p className="intro-note">
              En formation à YouCode, je développe des applications web avec PHP, Laravel,
              JavaScript et MySQL. Je recherche une opportunité pour mettre mes compétences
              en pratique au sein d’une équipe.
            </p>
            <div className="hero-actions">
              <a className="hero-button hero-button-primary" href="#projects">
                Voir mes projets <ArrowDownRight aria-hidden="true" />
              </a>
              <a className="hero-button hero-button-secondary" href="mailto:hibatallahsadiki20@gmail.com">
                Me contacter <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <p className="mobility-note">
              <MapPin aria-hidden="true" /> Basée à Nador <span aria-hidden="true">·</span> Mobilité nationale
            </p>
          </div>

          <aside className="profile-card" aria-label="Coordonnées de Hibatallah Sadiki">
            <div className="profile-card-heading">
              <div className="profile-monogram" aria-hidden="true">HS</div>
              <div>
                <p className="eyebrow">Profil</p>
                <h2>En quelques mots</h2>
              </div>
              <Sparkles className="profile-sparkle" aria-hidden="true" />
            </div>
            <p className="profile-summary">
              Formation en développement web full stack · YouCode · 2025–2027
            </p>
            <div className="profile-divider" />
            <ul className="contact-list">
              <li>
                <Mail aria-hidden="true" />
                <a href="mailto:hibatallahsadiki20@gmail.com">hibatallahsadiki20@gmail.com</a>
              </li>
              <li>
                <Phone aria-hidden="true" />
                <a href="tel:+212775125077">+212 775-125077</a>
              </li>
              <li>
                <CodeXml aria-hidden="true" />
                <a href="https://github.com/HIBA53757" target="_blank" rel="noreferrer">
                  @HIBA53757
                </a>
              </li>
            </ul>
            <p className="profile-searching">À la recherche d’une opportunité professionnelle</p>
          </aside>
        </motion.section>

        {sections.filter((section) => section.id !== 'about').map((section) => (
          <section className="content-section" id={section.id} key={section.id}>
            <p className="eyebrow">{section.label}</p>
            <h2>{section.label}</h2>
            <p className="section-note">Cette section sera complétée dans une prochaine étape.</p>
          </section>
        ))}
      </main>

      <footer className="site-footer">Hibatallah Sadiki · Développeuse Web Full Stack</footer>
    </div>
    </MotionConfig>
  )
}

export default App
