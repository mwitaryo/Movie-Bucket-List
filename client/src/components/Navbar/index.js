import { Link, useHistory } from 'react-router-dom'
import "./styles.css"

export default function Navbar() {
  const history = useHistory()

  return (
    <>
      <main>

      <nav className="floating-menu">
          <ul className="main-menu">
            <li className="nav-link">
              <Link className="ripple" to="/">
                <i className="fas fa-home fa-3x"></i>
              </Link>
            </li>

            <li className="nav-link">
              <Link className="ripple" to="/movies">
                <i className="fas fa-film fa-3x"></i>
              </Link>
            </li>
            <li className="nav-link">
              <Link className="ripple" to="/series">
                <i className="fas fa-tv fa-3x"></i>
              </Link>
            </li>

            <li className="nav-link">
              <Link className="ripple" to="/favorites">
                <i className="fas fa-star fa-3x"></i>
              </Link>
            </li>
            <li className="nav-link">
              <Link className="ripple" to="/content/add">
                <i className="fas fa-plus fa-3x"></i>
              </Link>
            </li>
          </ul>
          <div class="menu-bg"></div>
        </nav>
      </main>






      {/* <main> */}

      {/* </main> */}
    </>

  )

}