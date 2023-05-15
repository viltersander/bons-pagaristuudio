import AccountLayout from "@modules/account/templates/account-layout"
import ProfileTemplate from "@modules/account/templates/profile-template"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Profile: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Kasutaja" description="Vaata ja muuda oma Bönsi kasutajat." />
      <ProfileTemplate />
    </>
  )
}

Profile.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Profile
