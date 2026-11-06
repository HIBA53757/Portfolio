import './App.css'

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

function App() {
  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Hibatallah Sadiki home">
          <span className="wordmark-mark">HS</span>
          <span>Hibatallah Sadiki</span>
        </a>
        <nav aria-label="Main navigation">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="intro" aria-labelledby="intro-title">
          <p className="eyebrow">Portfolio · 2026</p>
          <h1 id="intro-title">Hibatallah Sadiki</h1>
          <p className="intro-role">Développeuse web full stack</p>
          <p className="intro-note">
            Portfolio professionnel · Développement web · Applications temps réel
          </p>
        </section>

        {sections.map((section) => (
          <section className="content-section" id={section.id} key={section.id}>
            <p className="eyebrow">{section.label}</p>
            <h2>{section.label}</h2>
            <p className="section-note">Cette section sera complétée dans une prochaine étape.</p>
          </section>
        ))}
      </main>

      <footer className="site-footer">Hibatallah Sadiki · Développeuse Web Full Stack</footer>
    </div>
  )
}

export default App
