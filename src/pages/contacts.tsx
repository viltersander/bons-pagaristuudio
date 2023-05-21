import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import ContactsPage from "@modules/common/components/maps/ContactsPage"

const Contact: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Kontaktid"
        description="Böns kontaktid."
      />
      <div className="flex flex-col min-h-[calc(100vh-64px)] p-6">
        <ContactsPage/>
      </div>
    </>
  )
}

Contact.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Contact
