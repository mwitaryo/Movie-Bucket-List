
import { useQuery } from '@apollo/client'
import { GET_MOVIES } from '../../graphql'
import ContentCard from '../../components/ContentCard'
import "./styles.css"


export default function Movies() {
  const { loading, data, error } = useQuery(GET_MOVIES)


  if (loading) return <h1>LOADING.....</h1>
  if (error) return `Error! ${error.message}`


  return (
    <div className="list-container align-items-center d-flex flex-column mt-4" >
      <h1 className="text-light mt-4">Movies</h1>
      <div className="container d-flex flex-wrap justify-content-center"  >
        {
          data.movies.map((item, i) => (
            <ContentCard key={i} item={item} />
          ))
        }
      </div>

    </div>
  )
}