'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/src/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Save, Eye, Sparkles } from 'lucide-react'
import { useToast } from '@/src/hooks/use-toast'
import type { Hero } from '@/src/types/database.types'

export default function HeroEditorPage() {
  const [hero, setHero] = useState<Hero | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchHero()
  }, [])

  const fetchHero = async () => {
    try {
      const { data, error } = await supabase
        .from('hero')
        .select('*')
        .single()

      if (error) throw error
      setHero(data)
    } catch (error) {
      console.error('Error fetching hero:', error)
      toast({
        title: 'Error',
        description: 'Failed to load hero data',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!hero) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('hero')
        .update({
          title: hero.title,
          subtitle: hero.subtitle,
          description: hero.description,
          cta_text: hero.cta_text,
          cta_link: hero.cta_link,
          updated_at: new Date().toISOString(),
        })
        .eq('id', hero.id)

      if (error) throw error

      toast({
        title: 'Success!',
        description: 'Hero section updated successfully',
      })
    } catch (error) {
      console.error('Error saving hero:', error)
      toast({
        title: 'Error',
        description: 'Failed to save changes',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (!hero) {
    return (
      <div className="text-center text-gray-400 py-12">
        <p>No hero data found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-500" />
            Edit Hero Section
          </h1>
          <p className="text-gray-400 mt-1">
            Customize your homepage banner and call-to-action
          </p>
        </div>
        <Button
          onClick={() => setShowPreview(!showPreview)}
          variant="outline"
        >
          <Eye className="w-4 h-4 mr-2" />
          {showPreview ? 'Hide' : 'Show'} Preview
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Form */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Hero Content</CardTitle>
            <CardDescription>Edit the main content of your hero section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Title</Label>
              <Input
                id="title"
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                placeholder="e.g., Full-Stack Developer"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle" className="text-white">Subtitle</Label>
              <Input
                id="subtitle"
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                placeholder="e.g., Building Digital Experiences"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Description</Label>
              <Textarea
                id="description"
                value={hero.description}
                onChange={(e) => setHero({ ...hero, description: e.target.value })}
                placeholder="Write a brief introduction about yourself..."
                rows={4}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_text" className="text-white">Call-to-Action Text</Label>
              <Input
                id="cta_text"
                value={hero.cta_text}
                onChange={(e) => setHero({ ...hero, cta_text: e.target.value })}
                placeholder="e.g., View My Work"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta_link" className="text-white">Call-to-Action Link</Label>
              <Input
                id="cta_link"
                value={hero.cta_link}
                onChange={(e) => setHero({ ...hero, cta_link: e.target.value })}
                placeholder="e.g., /projects or #projects"
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Live Preview */}
        {showPreview && (
          <Card className="bg-gray-800/50 border-gray-700 lg:sticky lg:top-6">
            <CardHeader>
              <CardTitle className="text-white">Live Preview</CardTitle>
              <CardDescription>See how it looks on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">
                      {hero.subtitle}
                    </span>
                  </div>

                  <h1 className="text-4xl font-bold text-white leading-tight">
                    {hero.title}
                  </h1>

                  <p className="text-gray-400 max-w-md">
                    {hero.description}
                  </p>

                  <Button className="bg-blue-500 hover:bg-blue-600">
                    {hero.cta_text}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Tips */}
      <Card className="bg-blue-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-blue-400 text-sm">💡 Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-400 space-y-2">
          <p>• Keep your title short and impactful (2-5 words)</p>
          <p>• Use the subtitle to add context or your tagline</p>
          <p>• Description should be 1-2 sentences max</p>
          <p>• CTA link can be internal (/projects) or anchor (#projects)</p>
        </CardContent>
      </Card>
    </div>
  )
}