import { useHistory } from 'react-router'
import './styles.css'

export default function ContentCard({ item }) {

  const history = useHistory()

  return (
    <>
      <div className="box">
          <div className="mx-auto">
            <img src={item.poster_path} height="420" width="320" alt="..." onClick={() => history.push(`/${item.__typename}/${item._id}`)} title={item.title} />
          </div>
      </div>
    </>
  )
}