import React from 'react'

type LoadingProps = {
  loading: boolean
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  if (!loading) {
    return null
  }

  return (
    <div className="page-loading">
      <div className="loading-container" />
    </div>
  )
}

export default Loading
