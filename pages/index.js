import { BaseLayout } from "@components/layout"
import { Hero } from "@components/common"

/**
 * App index Page.
 * 
 * @returns Index Page
 */
export default function Home() {
  return ( 
    <>
      <Hero/>
    </>
  )
}

// Sets Home page layout to Base layout
Home.Layout = BaseLayout
