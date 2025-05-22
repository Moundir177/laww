// This tells Next.js to not include this route in static export
export const dynamic = 'force-dynamic'

// Skip generating static files for this route
export const generateStaticParams = async () => {
  return []
}

// Allow dynamic parameters for this route
export const dynamicParams = true 