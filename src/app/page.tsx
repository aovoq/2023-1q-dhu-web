import { NextPage } from 'next'
import FirstView from '@/components/FirstView'
import InfoSection from '@/components/InfoSection'
import ProfessorSection from '@/components/ProfessorSection'
import CurriculumSection from '@/components/CurriculumSection'
import WorksSection from '@/components/WorksSection'
import Footer from '@/components/Footer'

const Home: NextPage = () => {
  return (
    <main>
      <FirstView />
      <InfoSection />
      <ProfessorSection />
      <CurriculumSection />
      <WorksSection />
      <Footer />
    </main>
  )
}

export default Home
