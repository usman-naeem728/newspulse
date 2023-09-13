import React, { useState } from 'react'
// import Navbar from './components/navbar'
import News from './components/news'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'
import moon from './components/moon.png'
import sun from './components/sun.png'

const App = () => {
  const pageSize = 5
  const apiKey = process.env.REACT_APP_NEWS_API
  const [islit, setLit] = useState(true);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0)
  const [updated, setUpdated] = useState(message);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = (e) => {
   e.preventDefault()
    setUpdated(message);
  };
  

  return (
    <div style={{
      backgroundColor: islit ? "white" : "black",
      color: islit ? "black" : "white"
    }} >
      <Router>

        {/* navbar */}

        <div>
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">News Pluse</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                  <li className="nav-item"><Link className="nav-link" to="/home">Home</Link></li>
                  <li className="nav-item" ><Link className="nav-link" to="/business">business</Link></li>
                  <li className="nav-item" ><Link className="nav-link" to="/entertainment">entertainment</Link></li>
                  <li className="nav-item" ><Link className="nav-link" to="/general">general</Link></li>
                  <li className="nav-item" ><Link className="nav-link" to="/health">health</Link></li>
                  <li className="nav-item" ><Link className="nav-link" to="/science">science</Link></li>
                  <li className="nav-item" ><Link className="nav-link" to="/">sports</Link></li>
                  <li className="nav-item" ><Link className="nav-link" to="/technology">technology</Link></li>

                </ul>

                <form className="d-flex">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                   onChange={handleChange}
                   value={message}
                  />
                  <button className="btn btn-outline-success" type="submit" onClick={handleClick}>Search</button>
                </form>
              </div>
            </div>
          </nav>
        </div>

        <button className='mx-3 my-2' onClick={() => {
          setLit(!islit)
        }} >
          <img src={islit ? sun : moon} width={20} />
        </button>
        <LoadingBar
          color='#f11946'
          height={4}
          progress={progress}

        />
        <Routes>
          <Route path='/home' element={<News  searchquery={updated} mode={islit} setProgress={setProgress} apiKey={apiKey} key={'home'} pageSize={pageSize} country='in' category='general' />} />
          <Route path='/' element={<News  searchquery={updated} mode={islit} setProgress={setProgress} apiKey={apiKey} key={'sports'} pageSize={pageSize} country='in' category='sports' />} />
          <Route path='/general' element={<News  searchquery={updated} mode={islit} setProgress={setProgress} apiKey={apiKey} key={'general'} pageSize={pageSize} country='in' category='general' />} />
          <Route path='/business' element={<News  searchquery={updated} mode={islit} setProgress={setProgress} apiKey={apiKey} key={'business'} pageSize={pageSize} country='in' category='business' />} />
          <Route path='/entertainment' element={<News  searchquery={updated} mode={islit} setProgress={setProgress} apiKey={apiKey} key={'entertainment'} pageSize={pageSize} country='in' category='entertainment' />} />
          <Route path='/health' element={<News  searchquery={updated} mode={islit} setProgress={setProgress} apiKey={apiKey} key={'health'} pageSize={pageSize} country='in' category='health' />} />
          <Route path='/science' element={<News  searchquery={updated} mode={islit} setProgress={setProgress} apiKey={apiKey} key={'science'} pageSize={pageSize} country='in' category='science' />} />
          <Route path='/technology' element={<News  searchquery={updated} mode={islit} setProgress={setProgress} apiKey={apiKey} key={'technology'} pageSize={pageSize} country='in' category='technology' />} />
        </Routes>
      </Router>



    </div>
  )

}

export default App