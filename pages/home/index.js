import { AppLayout, Devit } from "components"
import { useEffect, useState } from "react"

const HomePage = () => {
  const [timeline, setTimeline] = useState()

  useEffect(() => {
    fetch("/api/statuses/home_timeline")
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline &&
            timeline.map(({ id, username, avatar, message }) => (
              <Devit
                key={id}
                username={username}
                avatar={avatar}
                message={message}
                id={id}
              />
            ))}
        </section>
        <nav></nav>
      </AppLayout>

      <style jsx>{`
        header {
          align-items: center;
          border-bottom: 1px solid #ccc;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
        }

        nav {
          bottom: 0;
          border-top: 1px solid #ccc;
          position: sticky;
          width: 100%;
        }

        section {
          padding-top: 100px;
        }
      `}</style>
    </>
  )
}
export default HomePage
