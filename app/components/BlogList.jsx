import React from 'react'

function BlogList({query}) {
  return (
    <div>{JSON.stringify(query)}</div>
  )
}

export default BlogList