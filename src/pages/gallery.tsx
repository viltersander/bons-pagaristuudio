import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"
import GalleryComponent from "@modules/common/components/gallery/index"

const Blog: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="Galerii"
        description="Böns galerii."
      />
      <div className="flex flex-col min-h-[calc(100vh-64px)] p-8">
        <GalleryComponent/>
      </div>
    </>
  )
}

Blog.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Blog
