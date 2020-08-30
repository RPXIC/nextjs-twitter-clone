import { useEffect } from "react"
import Head from "next/head"
import { colors } from "styles/theme"
import { Button } from "components"
import { Logo, GitHub } from "components/Icons"
import { loginWithGitHub } from "firebase/client"
import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

const Home = () => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = async () => {
    try {
      await loginWithGitHub()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>devter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <Logo width="100" />
        <h1>Devter</h1>
        <h2>
          Talk about development <br /> with developers👩‍💻👨‍💻
        </h2>

        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={24} height={24} />
              Login with GitHub
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        img {
          width: 120px;
        }

        div {
          margin-top: 16px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
          margin-bottom: 16px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
export default Home
