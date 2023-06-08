import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Blog: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Galerii"
        description="Böns galerii."
      />
      <div className="flex flex-col min-h-[calc(100vh-64px)] p-6">
        <h1 className="text-2xl-semi text-gry-900">Galerii</h1>
        <Link href="/">
          <a className="mt-4 underline text-base-regular text-gray-900">
            Mine avalehele
          </a>
        </Link>
      </div>
    </>
  )
}

Blog.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Blog
