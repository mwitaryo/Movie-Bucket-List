const errorHandler = async (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message })
  } else {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" })
  }

}

module.exports = errorHandler