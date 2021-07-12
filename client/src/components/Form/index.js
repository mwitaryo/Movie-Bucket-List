import { ADD_MOVIE, ADD_SERIES, GET_MOVIES, GET_SERIES, UPDATE_MOVIE, UPDATE_SERIES } from "../../graphql"
import { useQuery, useMutation, gql } from '@apollo/client'
import { useState } from "react"
import React, { Component } from 'react'
import Select from 'react-select'
import { useHistory, useLocation } from "react-router"
import client from '../../config'
import { options } from '../../data'


export default function Form({ item }) {
  const history = useHistory()
  const location = useLocation()

  const [input, setFormData] = useState({
    title: item ? item.title : "",
    overview: item ? item.overview : "",
    tags: item ? item.tags : [],
    poster_path: item ? item.poster_path : "",
    popularity: item ? item.popularity : 0,
    id: item ? item._id : "",
    trailer: item ? item.trailer : ""
  })

  const [contentType, setContentType] = useState("")
  // if (movieData) {
  //   setFormData({
  //     ...input,
  //     ...movieData
  //   })
  // }

  const [addMovie, { newData }] = useMutation(ADD_MOVIE, { refetchQueries: [{ query: GET_MOVIES }] })
  const [updateMovie, { updateData }] = useMutation(UPDATE_MOVIE, { refetchQueries: [{ query: GET_MOVIES }] })
  const [updateSeries, { updatedSeries }] = useMutation(UPDATE_SERIES, { refetchQueries: [{ query: GET_SERIES }] })
  const [addSeries, { newSeries }] = useMutation(ADD_SERIES, { refetchQueries: [{ query: GET_SERIES }] })


  const contentHandler = ({ target: { value } }) => {
    setContentType(value)
  }

  const submitContent = (event) => {
    event.preventDefault()
    if (location.pathname.includes("add")) {
      if (contentType === 'Series') {
        addSeries({ variables: { input } })
      } else {
        addMovie({ variables: { input } })
      }

    }
    if (location.pathname.includes("edit")) {
      if (location.pathname.includes("Series")) {
        updateSeries({ variables: { input } })
      } else {
        updateMovie({ variables: { input } })
      }
    }
    history.push('/')

  }

  const inputHandler = (event) => {
    if (Array.isArray(event)) {
      setFormData({
        ...input,
        tags: event.map(tag => tag.value)
      })

    } else {
      let { name, value } = event.target
      if (name === "popularity") {
        value = +value
      }

      setFormData({
        ...input,
        [name]: value,
      })
    }
  }


  return (

    <form onSubmit={submitContent} className="bg-black text-light">
      {
        location.pathname.includes("add") ? (
          <div className="mb-3 text-center">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="contentType"  value="Movies" onChange={contentHandler} />
              <label className="form-check-label" >Movies</label>
            </div>

            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="contentType"  value="Series" onChange={contentHandler} />
              <label className="form-check-label" >Tv Series</label>
            </div>
          </div>
        ) : null
      }

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" name="title" onChange={inputHandler} value={input.title} />
      </div>
      <div className="mb-3">
        <label className="form-label">Overview</label>
        <textarea className="form-control" name="overview" rows="3" onChange={inputHandler} value={input.overview} />
      </div>
      <div className="mb-3">
        <label className="form-label">Popularity</label>
        <input type="number" className="form-control" name="popularity" step="0.1" min="1" max="10" onChange={inputHandler} value={input.popularity} />
      </div>
      <div className="mb-3">
        <label className="form-label">Poster Path</label>
        <input type="url" className="form-control" name="poster_path" onChange={inputHandler} value={input.poster_path} />
      </div>
      <div className="mb-3">
        <label className="form-label">Trailer</label>
        <input type="url" className="form-control" name="trailer" onChange={inputHandler} value={input.trailer} />
      </div>
      <div className="mb-3">
        <label className="form-label">Tags</label>
        <Select
          value={options.filter(obj => input.tags.includes(obj.value))}
          isMulti
          name="tags"
          options={options}
          className="basic-multi-select text-dark"
          classNamePrefix="select"
          onChange={inputHandler}
        />
      </div>
      <div>
        <button type="submit" className="btn btn-primary mx-auto">Submit</button>

      </div>
    </form>
  )
}