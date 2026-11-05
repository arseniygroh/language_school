import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import About from "./pages/About"
import Classes from "./pages/Classes"
import Contacts from "./pages/Contacts"
import Header from "./components/Header"
import Login from "./pages/Login"
import Register from "./pages/Register"

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  )
}

export default App
