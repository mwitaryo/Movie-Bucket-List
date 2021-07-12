import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import ContentCard from '../../components/ContentCard'
import client from '../../config'
import { GET_ENTERTAINMENT, GET_MOVIES } from '../../graphql'
import Movies from '../Movies'
import { Link } from 'react-router-dom'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./styles.css"



const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};



export default function Home() {

  const { loading, error, data } = useQuery(GET_ENTERTAINMENT)

  if (loading) return <h1>Loading....</h1>
  if (error) return `Error! ${error.message}`

  return (
    <>
      <div className="p-2 mt-4 shadow-lg round">
        <div className="container p-2 round">
          <Link to="/movies" className="nav-link text-light">
            <h1>Movies</h1>
          </Link>

          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            keyBoardControl={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            // transitionDuration={500}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-60-px"
            minimumTouchDrag={50}

            containerClass="carousel-container"
            responsive={responsive}>

            {
              data.movies.map((item, i) => (
                <ContentCard key={i} item={item} />
              ))
            }
          </Carousel>
      </div>



        <div className="container p-2 round">
          <Link to="/series" className="nav-link text-light">
            <h1>TV SERIES</h1>
          </Link>

          <Carousel
            showDots={true}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            // transitionDuration={500}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            minimumTouchDrag={50}

            containerClass="carousel-container"
            responsive={responsive}>

            {
              data.series.map((item, i) => (
                <ContentCard key={i} item={item} />
              ))
            }
          </Carousel>;
      </div>
      </div>


    </>
  )
}