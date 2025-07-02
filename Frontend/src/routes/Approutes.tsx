import { Route, Routes } from "react-router-dom"
import First from "../pages/First"
import Choose from "../pages/Choose"
import Diabetes from "../pages/Diabetes"
import Heartattack from "../pages/Heartattack"
import About from "../pages/About"
import Contact from "../pages/Contact"

const Approutes = () => {
  return (
    <>
    <Routes>
<Route path="/" element={<First></First>}></Route>
<Route path="/home" element={<Choose></Choose>}></Route>
<Route path="/diabetes" element={<Diabetes></Diabetes>}></Route>
<Route path="/heartattack" element={<Heartattack></Heartattack>}></Route>
<Route path="/about" element={<About></About>}></Route>
<Route path="/contact" element={<Contact></Contact>}></Route>


    </Routes>
    
    </>
  )
}

export default Approutes