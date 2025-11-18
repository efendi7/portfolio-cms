'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js' 
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { LogIn, Code, Layout, Database, Globe, Award, ExternalLink, Github } from 'lucide-react'

// --- IMPORT PENTING ---
// Pastikan component Hero ada di folder components/Hero.tsx
import Hero from '@/components/Hero'

// --- 1. KONFIGURASI SUPABASE ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// --- 2. TYPE DEFINITIONS ---
type HeroData = {
  id: string
  title: string
  subtitle: string
  description: string
  cta_text: string
  cta_link: string
}

type Service = {
  id: string
  title: string
  description: string
  icon: string 
  order_index: number
}

type Project = {
  id: string
  title: string
  description: string
  image: string | null
  tech: string[]
  link: string | null
  github_link: string | null
  order_index: number
}

type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  image: string | null
  credential_url: string | null
}

export default function LandingPage() {
  // --- 3. STATE MANAGEMENT ---
  const [hero, setHero] = useState<HeroData | null>(null)
  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  // --- 4. DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch Hero
        const { data: heroData } = await supabase.from('hero').select('*').limit(1).single()
        if (heroData) setHero(heroData)

        // Fetch Services
        const { data: servicesData } = await supabase.from('services').select('*').order('order_index', { ascending: true })
        if (servicesData) setServices(servicesData)

        // Fetch Projects
        const { data: projectsData } = await supabase.from('projects').select('*').order('order_index', { ascending: true })
        if (projectsData) setProjects(projectsData)

        // Fetch Certificates
        const { data: certData } = await supabase.from('certificates').select('*').order('date', { ascending: false })
        if (certData) setCertificates(certData)

      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Helper Icon
  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Code: <Code className="h-6 w-6 text-blue-400" />,
      Layout: <Layout className="h-6 w-6 text-purple-400" />,
      Database: <Database className="h-6 w-6 text-emerald-400" />,
      Globe: <Globe className="h-6 w-6 text-cyan-400" />,
    }
    return icons[iconName] || <Code className="h-6 w-6 text-gray-400" />
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading Portfolio...</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-x-hidden">
      {/* NAV */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">PF</div>
          <div>
            <h1 className="text-lg font-semibold">Portfolio CMS</h1>
            <p className="text-xs text-gray-300">Next.js • Supabase</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-4">
          <Link href="#projects" className="text-sm text-gray-300 hover:text-white transition-colors">Projects</Link>
          <Link href="#services" className="text-sm text-gray-300 hover:text-white transition-colors">Services</Link>
          <Link href="#certificates" className="text-sm text-gray-300 hover:text-white transition-colors">Certificates</Link>
          <Link href="#contact" className="text-sm text-gray-300 hover:text-white transition-colors">Contact</Link>

          <Link href="/login">
            <Button className="ml-2 bg-white/10 hover:bg-white/20 border-white/10 text-white" variant={'outline'} size="sm">
              <LogIn className="mr-2 h-4 w-4" /> Admin
            </Button>
          </Link>
        </nav>
      </header>

      {/* --- HERO SECTION BARU --- */}
      {/* Menggunakan Component Hero yang berisi GSAP & 3D RawCard */}
      <Hero data={hero} />

      {/* SERVICES SECTION */}
      <section id="services" className="container mx-auto px-6 py-20 relative z-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          <h3 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">What I Do</h3>
          <p className="text-gray-400">Services provided to clients.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/60 backdrop-blur-sm border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 h-full">
                <CardHeader>
                  <div className="mb-4 p-3 w-fit rounded-lg bg-white/5 border border-white/5">{getIconComponent(service.icon)}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="container mx-auto px-6 py-20 relative z-20">
        <h3 className="text-3xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Featured Projects</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 border-white/10 h-full flex flex-col hover:bg-white/10 transition-all duration-300 overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/20">
                {p.image && (
                  <div className="h-48 w-full bg-gray-800 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{p.title}</CardTitle>
                    <div className="flex gap-3">
                      {p.github_link && <a href={p.github_link} target="_blank" className="text-gray-400 hover:text-white transition-colors"><Github size={18}/></a>}
                      {p.link && <a href={p.link} target="_blank" className="text-gray-400 hover:text-blue-400 transition-colors"><ExternalLink size={18}/></a>}
                    </div>
                  </div>
                  <CardDescription className="flex flex-wrap gap-2 mt-3">
                    {p.tech && p.tech.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 bg-blue-500/10 text-blue-300 text-[10px] font-medium rounded-full border border-blue-500/20">
                        {t}
                      </span>
                    ))}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed">{p.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CERTIFICATES SECTION */}
      <section id="certificates" className="container mx-auto px-6 py-20 relative z-20">
        <div className="bg-gradient-to-r from-white/5 to-transparent p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
            <div className="mb-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">
                <Award className="text-yellow-500 fill-yellow-500/20" /> Certificates & Awards
            </h3>
            </div>
            <div className="space-y-4">
            {certificates.map((cert) => (
                <div key={cert.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-gray-900/50 rounded-xl border border-white/5 hover:border-white/20 transition-colors group">
                <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 flex-shrink-0 overflow-hidden border border-white/5">
                        {cert.image ? <img src={cert.image} alt="logo" className="w-full h-full object-cover" /> : <Award size={24}/>}
                    </div>
                    <div>
                    <h4 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">{cert.title}</h4>
                    <p className="text-sm text-gray-400">{cert.issuer} • {cert.date}</p>
                    </div>
                </div>
                {cert.credential_url && (
                    <Button variant="outline" size="sm" className="mt-4 md:mt-0 bg-transparent border-white/20 text-gray-300 hover:text-white hover:bg-white/10 group-hover:border-blue-500/50 transition-all" asChild>
                        <a href={cert.credential_url} target="_blank">View Credential</a>
                    </Button>
                )}
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-white/10 py-12 mt-12 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-6 text-center">
            <h4 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Let's Build Something Together</h4>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Tertarik berkolaborasi? Hubungi saya atau kelola konten ini melalui panel admin.
            </p>
            <div className="flex justify-center gap-4 mb-10">
                 <Link href="/admin/login">
                    <Button className="bg-white text-black hover:bg-gray-200">Login Admin</Button>
                 </Link>
                 <Button variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10">Email Me</Button>
            </div>
            <div className="text-xs text-gray-500 border-t border-white/5 pt-8">
                © {new Date().getFullYear()} Portfolio CMS. Built with Next.js, Supabase, React Three Fiber & GSAP.
            </div>
        </div>
      </footer>
    </main>
  )
}