import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete'
import { favorite } from '../../graphql/vars'
import { DELETE_SERIES, GET_MOVIES, GET_SERIES, DELETE_MOVIE } from '../../graphql';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function DetailCard({ item }) {
  const classes = useStyles();
  const history = useHistory()
  const [deleteMovie, { selectedMovie }] = useMutation(DELETE_MOVIE, { refetchQueries: [{ query: GET_MOVIES }] })
  const [deleteSeries, { selectedSeries }] = useMutation(DELETE_SERIES, { refetchQueries: [{ query: GET_SERIES }] })



  const onDeleteHandler = (id) => {
    if (item.__typename === "Movie") {
      deleteMovie({ variables: { MovieId: id } })
    }
    if (item.__typename === "Series") {
      deleteSeries({ variables: { SeriesId: id } })
    }
    history.push('/movies')
  }

  const onFavoriteHandler = (id) => {
    const currentFavorite = favorite()
    const found = currentFavorite.find(item => item._id === id)
    if (!found) {
      const newFavorite = [...currentFavorite, item]
      favorite(newFavorite)
    }
  }

  return (
    <>
      <div className="container mt-4" >
        <iframe width="1280" height="500" src={item.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div className="bg-light p-4 bg-dark text-light text-center" width="1000">
          <h1 className="card-title text-uppercase mb-3">{item.title}</h1>
          <h3 className="card-text">{item.overview}</h3>

          <div className="d-flex flex-wrap">
            {
              item.tags?.map((el, i) => (
                <div key={i}>
                  <span class="badge rounded-pill bg-secondary">{el}</span>
                </div>
              ))
            }
          </div>
          <span className="badge rounded-pill bg-warning">
            <h1 className="card-text mb-3">{item.popularity}</h1>
          </span>



          <div className={classes.root}>
            <div className="d-flex flex-row-reverse">
              <Fab color="error" aria-label="delete" className="m-3" onClick={() => onDeleteHandler(item._id)}>
                <DeleteIcon />
              </Fab>

              <Fab color="secondary" aria-label="like" className="m-3" onClick={() => onFavoriteHandler(item._id)}>
                <FavoriteIcon />
              </Fab>
              <Fab color="primary" aria-label="edit" className="m-3" onClick={() => history.push(`edit/${item._id}`)}>
                <EditIcon />
              </Fab>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}