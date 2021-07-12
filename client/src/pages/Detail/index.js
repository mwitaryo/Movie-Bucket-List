import { useQuery } from "@apollo/client"
import { useParams, useLocation } from "react-router"
import { GET_MOVIE_BY_ID, GET_SERIES_BY_ID } from '../../graphql'
import DetailCard from '../../components/DetailCard'

export default function Detail() {
  const location = useLocation()
  const { id } = useParams()

  const { loading: movieLoading, data: movieData, error: movieError } = useQuery(GET_MOVIE_BY_ID, { variables: { MovieId: id } })
  const { loading: seriesLoading, data: seriesData, error: seriesError } = useQuery(GET_SERIES_BY_ID, { variables: { SeriesId: id } })

  if (movieLoading || seriesLoading) return <h1>Loading</h1>
  if (movieError) return `Error! ${movieError.message}`
  if (seriesError) return `Error! ${seriesError.message}`

  let item
  if (movieData.movieById) { item = movieData.movieById }
  if (seriesData.seriesById) { item = seriesData.seriesById }
  return (
      <div className="mt-4 pt-4">
        <DetailCard item={item} />
      </div>

  )
}