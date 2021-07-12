import { useQuery, useMutation } from '@apollo/client'
import { GET_SERIES } from '../../graphql'
import ContentCard from '../../components/ContentCard'
import "./styles.css"

export default function Series() {
  const { loading, error, data } = useQuery(GET_SERIES)

  if (loading) return <h1>Loading.....</h1>
  if (error) return `Error!!  ${error.message}`

  return (
    <>
      <div className="list-container align-items-center d-flex flex-column mt-4" >
        <h1 className="text-light mt-4">Series</h1>
        <div className="container d-flex flex-wrap justify-content-center"  >
          {
            data.series.map((item, i) => (
              <ContentCard key={i} item={item} />
            ))
          }

        </div>
      </div>
    </>
  )
}

