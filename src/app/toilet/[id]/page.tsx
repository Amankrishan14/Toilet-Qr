import { supabase } from '@/lib/supabase'
import FeedbackForm from '@/components/FeedbackForm'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

async function getToilet(id: string) {
  const { data, error } = await supabase
    .from('toilets')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
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
  const { data: toilets } = await supabase
    .from('toilets')
    .select('id')

  return toilets?.map((toilet) => ({
    id: toilet.id,
  })) || []
}
