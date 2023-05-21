import Head from "@modules/common/components/head"
import FeaturedProducts from "@modules/home/components/featured-products"
import FooterCTA from "@modules/layout/components/footer-cta"
import Hero from "@modules/home/components/hero"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import ContactsPage from "@modules/common/components/maps/ContactsPage"

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Avaleht"
        description="Böns pagaristuudio."
      />
      <Hero />
      <FeaturedProducts />
      <FooterCTA/>
      <ContactsPage/>
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
