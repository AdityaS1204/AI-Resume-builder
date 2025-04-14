import { Outlet } from "react-router-dom"
import Landing from "./component/Pages/Landing"
import { CTA, Features, Footer, Hero, Navbar } from "./component/landing/index"


const App = () => {
  return (
    <div >

  <Outlet/>
    
     
    </div>
  )
}

export default App