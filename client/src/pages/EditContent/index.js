
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import Form from '../../components/Form'
import { GET_MOVIE_BY_ID, GET_SERIES_BY_ID } from '../../graphql'


export default function EditContent() {
  const { id } = useParams()

  const { data: movieData, loading: movieLoading, error: movieError } = useQuery(GET_MOVIE_BY_ID, { variables: { MovieId: id } })
  const { data: seriesData, loading: seriesLoading, error: seriesError } = useQuery(GET_SERIES_BY_ID, { variables: { SeriesId: id } })


  if (movieLoading || seriesLoading) return <h1>Loading</h1>
  if (movieError) return `Error! ${movieError.message}`
  if (seriesError) return `Error! ${seriesError.message}`

  let item
  if (movieData.movieById) { item = movieData.movieById }
  if (seriesData.seriesById) { item = seriesData.seriesById }



  return (
    <div className="my-auto">
      <div>
      <br className="mt-5" />
      <br className="mt-5" />
      <br />
      <br />
      </div>

      < div className="container d-flex flex-wrap p-4 mx-auto" >
        <div className="col-5 mt-4">
          <img src={item.poster_path} alt={item.title} height="600" width="400" />
        </div>
        <div className="col-7">
          <Form item={item} />
        </div>
      </div >

    </div>
  )
}