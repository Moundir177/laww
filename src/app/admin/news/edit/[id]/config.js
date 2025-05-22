// Set dynamic to force-dynamic to skip static generation for this route
export const dynamic = 'force-dynamic'

// Or set generateStaticParams to empty array to skip static generation
export const generateStaticParams = async () => {
  return []
}

// Optional: Set dynamicParams to true
export const dynamicParams = true 