import { gql } from '@apollo/client'

export const GET_ENTERTAINMENT = gql`
query {
  movies{
    _id
    title
    overview
    popularity
    tags
    poster_path
    trailer
  }

  series{
    _id
    title
    overview
    popularity
    tags
    poster_path
    trailer
  }
}
`

export const GET_SERIES = gql`
query {
  series{
    _id
    title
    overview
    popularity
    tags
    poster_path
    trailer
  }
}
`

export const GET_MOVIES = gql`
query{
  movies {
    _id
    title
    overview
    popularity
    tags
    poster_path
    trailer
  }
}
`

export const GET_MOVIE_BY_ID = gql`
query MovieById($MovieId:ID!){
  movieById(id:$MovieId){
    _id
    title
    overview
    popularity
    tags
    poster_path
    trailer
  }
}
`

export const GET_SERIES_BY_ID = gql`
query SeriesById($SeriesId:ID!) {
  seriesById(id:$SeriesId) {
    _id
  title
  overview
  popularity
  tags
  poster_path
  trailer
  }
}
`

export const EDIT_SERIES = gql`
mutation UpdateSeries($input: SeriesInput ){
  updateSeries(series:$input){
    title
    overview
  }
}
`


export const ADD_SERIES = gql`
mutation AddSeries($input: SeriesInput ){
  addSeries(series:$input){
    title
    overview
  }
}
`

export const DELETE_MOVIE = gql`
mutation DeleteMovie($MovieId:ID!) {
  deleteMovie(id:$MovieId) {
  title
  }
}
`

export const DELETE_SERIES = gql`
mutation DeleteSeries($SeriesId:ID!) {
  deleteSeries(id:$SeriesId) {
    title
  }
}
`

export const ADD_MOVIE = gql`
mutation AddMovie($input: MovieInput ){
  addMovie(movie:$input){
    title
    overview
  }
}
`

export const UPDATE_MOVIE = gql`
mutation UpdateMovie($input: MovieInput ){
  updateMovie(movie:$input){
    title
    overview
  }
}
`

export const UPDATE_SERIES = gql`
mutation UpdateSeries($input: SeriesInput ){
  updateSeries(series:$input){
    title
    overview
  }
}
`
