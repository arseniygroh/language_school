import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import About from "./pages/About"
import Classes from "./pages/Classes"
import Contacts from "./pages/Contacts"
import Header from "./components/Header"

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>
    </>
  )
}

export default App
