import React from 'react'
import Card from './Card'
import "./FeatureSection.scss"

function FeatureSection() {
  const features = [
    {
      heading: "AI-Powered Chatbot",
      content:  "A specialized virtual assistant providing real-time troubleshooting support for various laptop-related issues with step-by-step guidance."
    },
    {
      heading: "Appointment Scheduling",
      content:  "Enables users to schedule appointments with technical specialists if the chatbot cannot resolve their issue."
    },
    {
      heading: "User-Centric Design",
      content:  " An intuitive interface that enhances user experience, making navigation and finding help easy."
    },
    {
      heading: "Efficient Problem Resolution",
      content:  "Offers clear, concise solutions to common laptop problems, helping users troubleshoot independently."
    },
  ]
  return (
    <div id='feature-section'>
        <div className='title'>
            <h1>And many more features</h1>
            {/* <h2>Typebot makes form building easy and comes with powerful features</h2> */}
            <h3>We make troubleshooting easy with intuitive features and tailored solutions at your fingertips!</h3>
        </div>
        <div className='grid'>
            {features.map(feature => <Card heading={feature.heading} content={feature.content} />)}
        </div>
    </div>
  )
}

export default FeatureSection