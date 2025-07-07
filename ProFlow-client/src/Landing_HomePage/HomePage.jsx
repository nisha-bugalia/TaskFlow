import React from 'react'
import HomePageHero from './HomePageHero'
import HomeScreenshotsSection from './HomeScreenshotsSection'
import HomePageFeatures from './HomePageFeatures'
import HomePageSteps from './HomePageSteps'
import HomePageFooter from './HomePageFooter'

function HomePage({ darkMode, toggleDarkMode }) {
  return (
    <div>
      <HomePageHero darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <HomeScreenshotsSection/>
      <HomePageFeatures/>
      <HomePageSteps/>
      <HomePageFooter/>
    </div>
  )
}

export default HomePage
