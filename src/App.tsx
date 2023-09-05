import Header from "./components/header"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Detail from "./pages/detail"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:id" element={<Detail />} />
      </Routes>
    </>
  )
}

export default App
