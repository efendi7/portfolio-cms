'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import RawCard from './3d/RawCard' // Sesuaikan path
import { Button } from '@/components/ui/button' // Asumsi pakai shadcn button atau button sendiri

type HeroProps = {
  data: {
    title?: string
    subtitle?: string
    description?: string
    cta_text?: string
    cta_link?: string
  } | null
}

const Hero = ({ data }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animasi Judul (Subtitle & Title)
    gsap.fromTo(
      ".hero-title-group > *", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    )

    // Animasi Deskripsi
    gsap.fromTo(
      ".hero-description",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.inOut" }
    )

    // Animasi Tombol
    gsap.fromTo(
      ".hero-buttons",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: "power2.inOut" }
    )
  }, { scope: containerRef }) // Scope penting agar animasi tidak bocor ke elemen lain

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-between container mx-auto px-6 pt-20"
    >
      {/* KIRI: Text Content (Data dari Supabase) */}
      <div className="relative z-20 flex flex-col justify-center md:w-1/2 w-full gap-6">
        <div className="hero-title-group">
          {/* Subtitle */}
          <p className="text-blue-400 font-medium text-lg mb-2">
             {data?.subtitle || 'Hello, I am'}
          </p>
          
          {/* Title Dinamis */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            {data?.title || 'Loading...'}
          </h1>
        </div>

        {/* Description */}
        <div className="hero-description">
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-xl">
                {data?.description || 'Fetching profile details...'}
            </p>
        </div>

        {/* Buttons */}
        <div className="hero-buttons flex flex-wrap gap-4 mt-4">
          {data?.cta_link && (
            <a href={data.cta_link}>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                {data?.cta_text || 'View Work'}
                </Button>
            </a>
          )}
          <Button variant="outline" size="lg" className="text-white border-white/20 bg-white/5 hover:bg-white/10">
             Download CV
          </Button>
        </div>
      </div>

      {/* KANAN: 3D RawCard */}
      {/* Kita pakai pointer-events-auto pada wrapper div agar interaksi drag bekerja */}
      <div className="relative md:w-1/2 w-full flex justify-center items-center h-[500px] pointer-events-auto z-30">
        <div className="w-full h-full">
          <RawCard />
        </div>
      </div>
    </section>
  )
}

export default Hero