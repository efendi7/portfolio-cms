// Database Types for Portfolio CMS

export interface Hero {
  id: string
  title: string
  subtitle: string
  description: string
  cta_text: string
  cta_link: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  order_index: number
  created_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string | null
  tech: string[]
  link: string | null
  github_link: string | null
  order_index: number
  created_at: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  image: string | null
  credential_url: string | null
  created_at: string
}

export interface TimelineItem {
  id: string
  title: string
  organization: string
  period: string
  description: string | null
  order_index: number
  created_at: string
}

export type Education = TimelineItem
export type Experience = TimelineItem

// Database response types
export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never
export type DbResultErr = { error: Error }

// Helper types for insert/update operations
export type HeroInsert = Omit<Hero, 'id' | 'created_at' | 'updated_at'>
export type HeroUpdate = Partial<HeroInsert>

export type ServiceInsert = Omit<Service, 'id' | 'created_at'>
export type ServiceUpdate = Partial<ServiceInsert>

export type ProjectInsert = Omit<Project, 'id' | 'created_at'>
export type ProjectUpdate = Partial<ProjectInsert>

export type CertificateInsert = Omit<Certificate, 'id' | 'created_at'>
export type CertificateUpdate = Partial<CertificateInsert>

export type TimelineItemInsert = Omit<TimelineItem, 'id' | 'created_at'>
export type TimelineItemUpdate = Partial<TimelineItemInsert>