import React from 'react'
import Card from './Card'
import "./FeatureSection.scss"

function FeatureSection() {
  return (
    <div id='feature-section'>
        <div className='title'>
            <h1>And many more features</h1>
            <h2>Typebot makes form building easy and comes with powerful features</h2>
        </div>
        <div className='grid'>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    </div>
  )
}

export default FeatureSection