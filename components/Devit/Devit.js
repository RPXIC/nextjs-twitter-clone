import { Avatar } from "components"
import useTimeAgo from "hooks/useTimeAgo"

const Devit = ({ avatar, userName, content, img, createdAt, id }) => {
  const timeago = useTimeAgo(createdAt)

  return (
    <>
      <article>
        <div>
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> · </span>
            <date>{timeago}</date>
          </header>
          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>

      <style jsx>{`
        article {
          border-bottom: 1px solid #eadcdc;
          display: flex;
          padding: 10px 15px;
        }

        img {
          height: auto;
          width: 100%;
          border-radius: 10px;
          margin-top: 10px;
        }

        div {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        date {
          color: #555;
          font-size: 14px;
        }
      `}</style>
    </>
  )
}
export default Devit
