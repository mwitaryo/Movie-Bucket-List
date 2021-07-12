

import ContentCard from '../../components/ContentCard'
import { favorite } from '../../graphql/vars'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useReactiveVar } from '@apollo/client'
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




export default function Favorites() {
  const classes = useStyles();
  let favorites = useReactiveVar(favorite)

  const deleteHandler = (id) => {
    const newFavorite = favorites.filter(item => item._id !== id)
    favorite(newFavorite)
  }

  return (
    <>

      <div className="container align-items-center mt-4">
        <h1 className="text-light">Favorites</h1>
        <div className="d-flex flex-wrap">

          {
            favorites.map((item, i) => (
              <div key={i}>
                <div className={classes.root}>
                  <Fab color="error" aria-label="delete" className="m-3" onClick={() => deleteHandler(item._id)}>
                    <DeleteIcon />
                  </Fab>
                </div>

                <ContentCard key={i} item={item} />
              </div>
            ))
          }
        </div>

      </div>
    </>
  )
}