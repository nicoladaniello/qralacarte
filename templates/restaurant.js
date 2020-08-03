import React from "react"

const Restaurant = ({ data }) => {
  const { slug } = data.restaurant

  return <div>The slug is: {slug}</div>
}

export default Restaurant
