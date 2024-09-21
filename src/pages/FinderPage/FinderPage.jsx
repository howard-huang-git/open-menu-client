import './FinderPage.scss'
import FinderForm from '../../components/FinderForm/FinderForm'
import Header from '../../components/Header/Header'

function FinderPage() {
  return (
    <>
        <Header link="/search"/>
        <FinderForm />
    </>
    
  )
}

export default FinderPage