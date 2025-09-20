import FeedbackForm from '@/components/FeedbackForm'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

// Demo toilet data - replace with Supabase when ready
const demoToilets = Array.from({ length: 50 }, (_, i) => ({
  id: `toilet_${i + 1}`,
  name: `Toilet ${i + 1}`,
  location: `Building ${String.fromCharCode(65 + Math.floor(i / 3))} - ${['Ground Floor', 'First Floor', 'Second Floor'][i % 3]}`
}))

async function getToilet(id: string) {
  // For demo purposes, return demo data
  // Replace this with Supabase query when database is set up
  const toilet = demoToilets.find(t => t.id === id)
  
  if (!toilet) {
    return null
  }

  return toilet
}

export default async function ToiletPage({ params }: PageProps) {
  const { id } = await params
  const toilet = await getToilet(id)

  if (!toilet) {
    notFound()
  }

  return (
    <FeedbackForm 
      toiletId={toilet.id} 
      toiletName={toilet.name} 
    />
  )
}

export async function generateStaticParams() {
  // Return demo toilet IDs for static generation
  return demoToilets.map((toilet) => ({
    id: toilet.id,
  }))
}
