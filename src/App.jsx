import { useEffect, useState } from 'react'
import { MotionConfig, motion } from 'motion/react'
import emailjs from '@emailjs/browser'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ArrowDownRight, ArrowUpRight, CodeXml, Mail, MapPin, Moon, Phone, Send, Sparkles, Sun } from 'lucide-react'
import './App.css'

const sections = [
  { id: 'about', label: 'À propos' },
  { id: 'skills', label: 'Compétences' },
  { id: 'experience', label: 'Expérience' },
  { id: 'projects', label: 'Projets' },
  { id: 'education', label: 'Formation' },
  { id: 'contact', label: 'Contact' },
]

const mobileNavIcons = [Sparkles, CodeXml, Phone, ArrowDownRight, MapPin, Mail]

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Indiquez votre nom (au moins 2 caractères).').max(80, 'Le nom doit contenir moins de 80 caractères.'),
  email: z.string().trim().email('Entrez une adresse e-mail valide.').max(200, 'L’adresse e-mail est trop longue.'),
  subject: z.string().trim().min(3, 'Le sujet doit contenir au moins 3 caractères.').max(120, 'Le sujet doit contenir moins de 120 caractères.'),
  message: z.string().trim().min(20, 'Le message doit contenir au moins 20 caractères.').max(2000, 'Le message doit contenir moins de 2 000 caractères.'),
})

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

function validateContactField(field) {
  return (value) => {
    const result = contactSchema.shape[field].safeParse(value)
    return result.success || result.error.issues[0]?.message
  }
}

const skillGroups = [
  {
    title: 'Langages',
    items: ['PHP', 'JavaScript', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frameworks & bibliothèques',
    items: ['Laravel', 'React', 'Express.js', 'EJS', 'jQuery'],
  },
  {
    title: 'UI/UX & styling',
    items: ['Tailwind CSS', 'Bootstrap', 'Figma', 'Responsive design'],
  },
  {
    title: 'Bases de données',
    items: ['MySQL', 'MongoDB', 'Mongoose'],
  },
  {
    title: 'Développement web',
    items: ['API REST', 'MVC', 'AJAX', 'WebSockets', 'Laravel Reverb', 'Laravel Sanctum'],
  },
  {
    title: 'Outils & environnement',
    items: ['Git', 'GitHub', 'VS Code', 'Jira', 'Scrum / Agile', 'Node.js', 'npm', 'Docker'],
  },
]

const transferableSkills = [
  'Travail en équipe',
  'Organisation & gestion du temps',
  'Autonomie',
  'Apprentissage rapide',
  'Adaptabilité',
]

const education = [
  {
    period: '2025 — 2027',
    title: 'Développement Web Full Stack',
    institution: 'YouCode',
    location: 'Nador, Maroc',
    status: 'En cours',
  },
  {
    period: '2024 — 2025',
    title: 'Informatique & Intelligence Artificielle',
    institution: 'Université Mohammed 1',
    location: 'Nador, Maroc',
  },
  {
    period: '2023 — 2024',
    title: 'Informatique & langue chinoise',
    institution: 'China Jiliang University',
    location: 'Hangzhou, Chine',
  },
  {
    period: '2020 — 2023',
    title: 'Baccalauréat Sciences Physiques · option française',
    institution: 'Baccalauréat',
    location: 'Nador, Maroc',
  },
]

const languages = [
  { name: 'Arabe', level: 'Langue maternelle' },
  { name: 'Anglais', level: 'Avancé' },
  { name: 'Français', level: 'Intermédiaire' },
  { name: 'Turc', level: 'Avancé' },
  { name: 'Chinois', level: 'Débutant' },
]

const projects = [
  {
    id: 'job-match',
    number: '01',
    category: 'Plateforme de recrutement',
    title: 'Job Match',
    description:
      'Plateforme de recrutement avec espaces séparés pour les apprenants et les administrateurs. Les apprenants consultent les offres et filtrent les opportunités en temps réel ; les administrateurs gèrent les annonces, les entreprises et suivent les statistiques depuis leur tableau de bord.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'PDO', 'Twig', 'Composer'],
    concepts: [
      'Architecture MVC personnalisée',
      'Recherche AJAX & filtres combinables',
      'Rôles et sessions séparés',
      'Archivage et restauration (soft delete)',
      'Sécurité : CSRF, validation & protection XSS',
      'Dashboard avec statistiques dynamiques',
    ],
    visual: 'job-match',
    image: 'https://images.unsplash.com/photo-1758520144437-f068ecaf0d83?auto=format&fit=crop&w=1400&q=85',
    visualLabel: 'Illustration des profils candidats et entreprises reliés par Job Match',
  },
  {
    id: 'lms-backend',
    number: '02',
    category: 'API backend · Projet en squad',
    title: 'LMS Backend',
    description:
      'Projet d’API LMS mené en squad sur trois briefs, avec un périmètre allant du catalogue à l’authentification, la progression, les quiz, les notifications et les statistiques.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Docker'],
    concepts: ['API REST', 'Rôles & permissions', 'Progression séquentielle', 'Quiz & score backend', 'Jobs & statistiques'],
    visual: 'lms',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
    visualLabel: 'Illustration conceptuelle de l’API LMS et de sa base MongoDB',
  },
  {
    id: 'ecommerce-laravel',
    number: '03',
    category: 'Application monolithique · Projet collectif',
    title: 'E-commerce Laravel',
    description:
      'Application e-commerce Laravel couvrant le catalogue, les stocks, le panier, le cycle de commande et les notifications par e-mail.',
    technologies: ['PHP', 'Laravel', 'Eloquent', 'Spatie Permission'],
    concepts: ['Rôles & policies', 'Stocks & commandes', 'Avis & modération', 'Notifications e-mail'],
    visual: 'shop',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85',
    visualLabel: 'Illustration conceptuelle du catalogue et du parcours de commande e-commerce',
    briefBonuses: ['Paiement en ligne (Stripe/Mollie)', 'Temps réel (Reverb/Pusher)'],
  },
  {
    id: 'easycoloc',
    number: '04',
    category: 'Plateforme de gestion de colocation',
    title: 'EasyColoc',
    description:
      'Application de gestion de colocation qui centralise les membres, les invitations et les dépenses partagées. Elle calcule les soldes, simplifie les remboursements et permet de suivre la réputation financière des membres.',
    technologies: ['PHP', 'Laravel', 'Eloquent', 'MySQL / PostgreSQL'],
    concepts: [
      'Architecture monolithique MVC & relations Eloquent',
      'Rôles Owner, Member & administrateur global',
      'Invitations par email avec token',
      'Balances et remboursements simplifiés',
      'Dépenses par catégorie & filtre mensuel',
      'Réputation financière & modération des utilisateurs',
    ],
    visual: 'easycoloc',
    image: 'https://images.unsplash.com/photo-1602443394222-300ea8fca02e?auto=format&fit=crop&w=1400&q=85',
    visualLabel: 'Illustration conceptuelle des dépenses partagées et des remboursements EasyColoc',
  },
]

function App() {
  const [theme, setTheme] = useState(() => window.localStorage.getItem('portfolio-theme') || 'light')
  const [contactStatus, setContactStatus] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  async function sendContactMessage(values) {
    const message = contactSchema.parse(values)

    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      setContactStatus('Le formulaire d’envoi n’est pas encore configuré. Écrivez-moi directement à hibatallahsadiki20@gmail.com.')
      return
    }

    setContactStatus('Envoi de votre message…')

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: message.name,
          reply_to: message.email,
          subject: message.subject,
          message: message.message,
        },
        { publicKey: emailJsConfig.publicKey },
      )
      setContactStatus('Votre message a bien été envoyé. Merci pour votre message !')
      reset()
    } catch {
      setContactStatus('L’envoi a échoué. Réessayez ou écrivez-moi directement à hibatallahsadiki20@gmail.com.')
    }
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="portfolio-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Accueil — Hibatallah Sadiki">
          <span className="wordmark-mark">HS</span>
          <span>Hibatallah Sadiki</span>
        </a>

        <nav className="desktop-nav" aria-label="Navigation principale">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.label}
            </a>
          ))}
        </nav>

        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')}
          aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
          title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
        >
          {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
        </button>

      </header>

      <nav className="mobile-dock" aria-label="Navigation mobile">
        {sections.map((section, index) => {
          const Icon = mobileNavIcons[index]
          return (
            <a key={section.id} href={`#${section.id}`}>
              <Icon aria-hidden="true" />
              <span>{section.label}</span>
            </a>
          )
        })}
      </nav>

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

          <motion.aside
            className="profile-card"
            aria-label="Coordonnées de Hibatallah Sadiki"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
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
              <li>
                <span className="linkedin-mark" aria-hidden="true">in</span>
                <a href="https://www.linkedin.com/in/hibatallah-sadiki" target="_blank" rel="noreferrer">
                  LinkedIn · hibatallah-sadiki
                </a>
              </li>
            </ul>
            <p className="profile-searching">À la recherche d’une opportunité professionnelle</p>
          </motion.aside>
        </motion.section>

        <section className="content-section skills-section" id="skills">
          <div className="skills-heading">
            <div>
              <p className="eyebrow">Compétences</p>
              <h2>
                Mon arbre de <span className="skills-title-accent">compétences</span>
              </h2>
            </div>
            <p className="section-note">
              Chaque branche rassemble les outils et savoir-faire que je développe au fil de mes projets.
            </p>
          </div>

          <div className="skill-tree">
            {skillGroups.map((group, index) => (
              <motion.article
                className="skill-card"
                key={group.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -22 : 22, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                whileHover={{ y: -5, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.36, delay: index * 0.06, ease: 'easeOut' }}
              >
                <span className="skill-branch" aria-hidden="true" />
                <div className="skill-card-top">
                  <span className="skill-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="skill-card-rule" aria-hidden="true" />
                </div>
                <h3>{group.title}</h3>
                <ul className="skill-tags">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>

          <div className="transferable-section">
            <h3>Compétences transversales</h3>
            <ul className="transferable-list">
              {transferableSkills.map((skill, index) => (
                <motion.li
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                >
                  {skill}
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        <section className="content-section experience-section" id="experience">
          <div className="experience-heading">
            <div>
              <p className="eyebrow">Parcours professionnel</p>
              <h2>Expérience</h2>
            </div>
            <p className="section-note">
              Une première expérience au sein d’une équipe de développement web.
            </p>
          </div>

          <div className="experience-entry">
            <div className="experience-meta">
              <span className="experience-period">05.2026 — 08.2026</span>
              <span className="experience-location">Kénitra, Maroc</span>
            </div>

            <motion.article
              className="experience-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="experience-card-top">
                <a
                  className="highness-wordmark"
                  href="https://highness.co/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visiter le site officiel de Highness"
                >
                  highness<span>.</span>
                </a>
                <span className="experience-type">Stage</span>
                <span className="experience-card-period">Mai — août 2026</span>
              </div>
              <h3>Stagiaire en développement web</h3>
              <p className="experience-company">Highness · Agence digitale à Kénitra</p>
              <p className="experience-summary">
                Participation au développement d’une application SaaS destinée aux entreprises,
                avec un système de live chat pour mettre en relation les visiteurs et les agents.
              </p>

              <div className="experience-showcase">
                <div className="experience-highlights">
                  <motion.article
                    className="experience-highlight"
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -3 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.32, delay: 0.05, ease: 'easeOut' }}
                  >
                    <span className="highlight-number">01</span>
                    <div>
                      <h4>Développement full stack</h4>
                      <p>Contribution au frontend, au backend, aux interfaces et à la gestion des données.</p>
                    </div>
                  </motion.article>
                  <motion.article
                    className="experience-highlight"
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -3 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.32, delay: 0.12, ease: 'easeOut' }}
                  >
                    <span className="highlight-number">02</span>
                    <div>
                      <h4>Chat en temps réel</h4>
                      <p>Mise en place de la communication avec WebSockets et Laravel Reverb.</p>
                    </div>
                  </motion.article>
                  <motion.article
                    className="experience-highlight"
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ y: -3 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.32, delay: 0.19, ease: 'easeOut' }}
                  >
                    <span className="highlight-number">03</span>
                    <div>
                      <h4>Travail d’équipe</h4>
                      <p>Approche Agile et suivi du code source avec Git.</p>
                    </div>
                  </motion.article>
                </div>

                <motion.div
                  className="realtime-visual"
                  role="img"
                  aria-label="Illustration conceptuelle d’un échange en temps réel entre un visiteur et un agent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <p className="visual-kicker">Illustration conceptuelle · Live chat</p>
                  <div className="chat-participants">
                    <div className="chat-actor">
                      <span className="chat-avatar visitor-avatar">V</span>
                      <div>
                        <span className="chat-actor-label">Visiteur</span>
                        <span className="chat-bubble visitor-bubble" />
                      </div>
                    </div>
                    <div className="chat-connection" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="chat-actor agent-actor">
                      <span className="chat-avatar agent-avatar">A</span>
                      <div>
                        <span className="chat-actor-label">Agent</span>
                        <span className="chat-bubble agent-bubble" />
                      </div>
                    </div>
                  </div>
                  <div className="visual-tech-label">
                    <span className="live-dot" /> WebSockets · Laravel Reverb
                  </div>
                </motion.div>
              </div>

              <div className="experience-divider" />
              <p className="technology-label">Technologies</p>
              <ul className="technology-list" aria-label="Technologies utilisées">
                {[
                  'PHP', 'Laravel', 'Blade', 'JavaScript', 'jQuery', 'AJAX',
                  'WebSockets', 'Laravel Reverb', 'HTML', 'CSS', 'API', 'Git',
                ].map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </motion.article>
          </div>
        </section>

        <section className="content-section projects-section" id="projects">
          <div className="projects-heading">
            <div>
              <p className="eyebrow">Projets sélectionnés</p>
              <h2>Des projets concrets</h2>
            </div>
            <p className="section-note">
              Des applications développées pendant ma formation et mes projets pratiques.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <motion.article
                className={`project-row project-row--${index % 2 === 0 ? 'visual-left' : 'visual-right'}`}
                key={project.id}
                aria-labelledby={`${project.id}-title`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.36, delay: index * 0.07, ease: 'easeOut' }}
              >
                <div
                  className={`project-visual project-visual--${project.visual}`}
                  role="img"
                  aria-label={project.visualLabel}
                >
                  <img className="project-background-image" src={project.image} alt="" aria-hidden="true" loading="lazy" />
                  <span className="project-visual-label">Illustration conceptuelle</span>
                  <span className="project-visual-number">{project.number}</span>
                  {project.visual === 'job-match' && (
                    <div className="job-match-preview" aria-hidden="true">
                      <span className="preview-label">Connexion professionnelle</span>
                      <div className="match-people">
                        <span className="match-person">Candidat</span>
                        <span className="match-symbol">↔</span>
                        <span className="match-person match-person--company">Entreprise</span>
                      </div>
                      <span className="preview-footer">Profils · Offres · Recherche</span>
                    </div>
                  )}
                  {project.visual === 'lms' && (
                    <div className="lms-preview" aria-hidden="true">
                      <span className="lms-code-mark">&lt;/&gt;</span>
                      <span className="lms-name">API LMS</span>
                      <div className="lms-flow">
                        <span>Express</span>
                        <span className="lms-flow-arrow">→</span>
                        <span>MongoDB</span>
                      </div>
                      <span className="lms-caption">Node.js · Mongoose</span>
                    </div>
                  )}
                  {project.visual === 'shop' && (
                    <div className="shop-preview" aria-hidden="true">
                      <div className="shop-preview-heading">
                        <span>BOUTIQUE · CATALOGUE</span>
                        <span>Panier</span>
                      </div>
                      <div className="shop-preview-body">
                        <div className="shop-product-shape">
                          <span>Produit</span>
                        </div>
                        <div className="shop-order-flow">
                          <span>Stock disponible</span>
                          <strong>Panier <span>→</span> Commande</strong>
                          <span>Cycle de commande</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {project.visual === 'easycoloc' && (
                    <div className="easycoloc-preview" aria-hidden="true">
                      <div className="easycoloc-preview-heading">
                        <span>EASYCOLOC · DÉPENSES PARTAGÉES</span>
                        <span>Colocation active</span>
                      </div>
                      <div className="easycoloc-preview-body">
                        <div className="easycoloc-balance">
                          <span>Solde du mois</span>
                          <strong>+ 240 DH</strong>
                          <span>3 membres · 8 dépenses</span>
                        </div>
                        <div className="easycoloc-settlement">
                          <span>Remboursements simplifiés</span>
                          <strong>Salma <b>→</b> Lina</strong>
                          <span className="easycoloc-settlement-amount">80 DH · À régler</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="project-copy">
                  <p className="project-index">{project.number} <span>/ {String(projects.length).padStart(2, '0')}</span></p>
                  <p className="project-category">{project.category}</p>
                  <h3 id={`${project.id}-title`}>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-technologies" aria-label={`Technologies de ${project.title}`}>
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <div className="project-concepts">
                    <p className="project-detail-label">Concepts clés</p>
                    <ul className="project-concept-list">
                      {project.concepts.map((concept) => (
                        <li key={concept}>{concept}</li>
                      ))}
                    </ul>
                  </div>
                  {project.briefBonuses && (
                    <p className="project-brief-bonuses">
                      Options bonus du brief : {project.briefBonuses.join(' · ')}
                    </p>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="content-section education-section" id="education">
          <div className="projects-heading">
            <div>
              <p className="eyebrow">Études & parcours</p>
              <h2>Formation</h2>
            </div>
            <p className="section-note">
              Un parcours entre développement web, informatique et découverte de nouvelles langues.
            </p>
          </div>

          <div className="education-layout">
            <div className="education-list" aria-label="Parcours de formation">
              {education.map((item, index) => (
                <motion.article
                  className="education-item"
                  key={item.institution}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -18 : 18, scale: 0.96 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  whileHover={{ y: -4 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
                >
                  <p className="education-period">{item.period}</p>
                  <div className="education-details">
                    <div className="education-title-row">
                      <h3>{item.title}</h3>
                      {item.status && <span className="education-status">{item.status}</span>}
                    </div>
                    <p className="education-institution">{item.institution}</p>
                    <p className="education-location">{item.location}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <motion.aside
              className="language-panel"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              aria-labelledby="languages-title"
            >
              <p className="eyebrow">Communication</p>
              <h3 id="languages-title">Langues</h3>
              <ul className="language-list">
                {languages.map((language, index) => (
                  <motion.li
                    className="language-item"
                    key={language.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ x: 4 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                  >
                    <span>{language.name}</span>
                    <span className="language-level">{language.level}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </section>

        <section className="content-section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-heading">
            <div>
              <p className="eyebrow">Contact</p>
              <h2 id="contact-title">Parlons de votre prochain projet.</h2>
            </div>
            <p className="section-note">
              Une opportunité, une collaboration ou une question ? Écrivez-moi.
            </p>
          </div>

          <div className="contact-layout">
            <motion.div
              className="contact-info-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <span className="contact-card-mark"><Mail aria-hidden="true" /></span>
              <h3>Restons en contact</h3>
              <p>Je suis à la recherche d’une opportunité professionnelle et ouverte aux échanges.</p>
              <ul className="contact-list contact-details">
                <li>
                  <Mail aria-hidden="true" />
                  <a href="mailto:hibatallahsadiki20@gmail.com">hibatallahsadiki20@gmail.com</a>
                </li>
                <li>
                  <Phone aria-hidden="true" />
                  <a href="tel:+212775125077">+212 775-125077</a>
                </li>
                <li>
                  <MapPin aria-hidden="true" />
                  <span>Nador · Mobilité nationale</span>
                </li>
                <li>
                  <CodeXml aria-hidden="true" />
                  <a href="https://github.com/HIBA53757" target="_blank" rel="noreferrer">GitHub · @HIBA53757</a>
                </li>
                <li>
                  <span className="linkedin-mark" aria-hidden="true">in</span>
                  <a href="https://www.linkedin.com/in/hibatallah-sadiki" target="_blank" rel="noreferrer">LinkedIn · hibatallah-sadiki</a>
                </li>
              </ul>
            </motion.div>

            <motion.form
              className="contact-form-card"
              noValidate
              onSubmit={handleSubmit(sendContactMessage)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
              aria-label="Formulaire de contact"
            >
              <div className="contact-form-heading">
                <h3>Envoyer un message</h3>
                <span>Les champs * sont obligatoires</span>
              </div>

              <div className="contact-form-row">
                <div className="form-field">
                  <label htmlFor="contact-name">Votre nom *</label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Votre nom"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    {...register('name', { validate: validateContactField('name') })}
                  />
                  {errors.name && <span className="form-error" id="contact-name-error">{errors.name.message}</span>}
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Votre e-mail *</label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="nom@exemple.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    {...register('email', { validate: validateContactField('email') })}
                  />
                  {errors.email && <span className="form-error" id="contact-email-error">{errors.email.message}</span>}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="contact-subject">Sujet *</label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="Objet de votre message"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  {...register('subject', { validate: validateContactField('subject') })}
                />
                {errors.subject && <span className="form-error" id="contact-subject-error">{errors.subject.message}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">Message *</label>
                <textarea
                  id="contact-message"
                  rows="5"
                  required
                  placeholder="Dites-moi quelques mots sur votre demande…"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  {...register('message', { validate: validateContactField('message') })}
                />
                {errors.message && <span className="form-error" id="contact-message-error">{errors.message.message}</span>}
              </div>

              <button className="contact-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'} <Send aria-hidden="true" />
              </button>
              <p className="contact-form-note">
                Votre message sera transmis directement à mon adresse e-mail.
              </p>
              <p className="contact-status" role="status" aria-live="polite">{contactStatus}</p>
            </motion.form>
          </div>
        </section>

        {sections.filter((section) => !['about', 'skills', 'experience', 'projects', 'education', 'contact'].includes(section.id)).map((section) => (
          <section className="content-section" id={section.id} key={section.id}>
            <p className="eyebrow">{section.label}</p>
            <h2>{section.label}</h2>
            <p className="section-note">Cette section sera complétée dans une prochaine étape.</p>
          </section>
        ))}
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-wordmark" href="#top" aria-label="Retour à l’accueil">
              <span className="wordmark-mark">HS</span> Hibatallah Sadiki
            </a>
            <p>Développeuse Web Full Stack, je conçois des applications utiles et accessibles, du frontend au backend.</p>
            <div className="footer-links" aria-label="Réseaux et contact">
              <a href="https://github.com/HIBA53757" target="_blank" rel="noreferrer"><CodeXml aria-hidden="true" /> GitHub</a>
              <a href="https://www.linkedin.com/in/hibatallah-sadiki" target="_blank" rel="noreferrer"><span className="linkedin-mark" aria-hidden="true">in</span> LinkedIn</a>
              <a href="mailto:hibatallahsadiki20@gmail.com"><Mail aria-hidden="true" /> E-mail</a>
            </div>
          </div>

          <nav className="footer-navigation" aria-label="Navigation du pied de page">
            <h2>Navigation</h2>
            <div className="footer-navigation-links">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>{section.label}</a>
              ))}
            </div>
          </nav>

          <div className="footer-contact">
            <h2>Me contacter</h2>
            <p>Nador, Maroc · Mobilité nationale</p>
            <a href="mailto:hibatallahsadiki20@gmail.com">hibatallahsadiki20@gmail.com</a>
            <a href="tel:+212775125077">+212 775-125077</a>
            <a className="footer-top-link" href="#top">Retour en haut <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Hibatallah Sadiki</span>
          <span>Développeuse Web Full Stack · Nador, Maroc</span>
        </div>
      </footer>
    </div>
    </MotionConfig>
  )
}

export default App
