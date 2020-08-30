import { Devit } from "components"
import { firestore } from "firebase/admin"
import { useRouter } from "next/router"

const DevitPage = (props) => {
  const router = useRouter()

  if (router.isFallback) return <h1>Loading...</h1>

  return (
    <>
      <Devit {...props} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "fr5rv9x2Mg0AvsFRWdqu" } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

export default DevitPage
