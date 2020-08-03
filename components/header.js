import PropTypes from "prop-types"
import React from "react"

const Header = ({ title }) => (
  <header className="container pt-lg-1 pb-lg-3">
    <div className="jumbotron mb-3 mb-lg-5">
      <h1>{title}</h1>
    </div>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
}

Header.defaultProps = {
  title: ``,
}

export default Header
