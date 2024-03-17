import { useState, useEffect } from "react"
import './App.css'
import axios from "axios"

function App() {

  const [products, setProducts] = useState([]);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  useEffect(() => {
    axios("http://localhost:8080/api/products")
      .then((res) => {
        console.log(res.data.response)
        setProducts(res.data.response.docs)
        setPrevPage(res.data.response.prevPage)
        setNextPage(res.data.response.nextPage)
      })
      .catch(err => console.log(err))
  }, [])

  const handlePrevPage = () => {
    if (prevPage) {
      axios(prevPage)
        .then((res) => {
          setProducts(res.data.response.docs)
          setPrevPage(res.data.response.prevPage)
          setNextPage(res.data.response.nextPage)
        })
        .catch(err => console.log(err))
    }
  }

  const handleNextPage = () => {
    if (nextPage) {
      axios(nextPage)
        .then((res) => {
          setProducts(res.data.response.docs)
          setPrevPage(res.data.response.prevPage)
          setNextPage(res.data.response.nextPage)
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="https://i.imgur.com/6B7qbCj.png" alt="Essence Selecto Icon" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" aria-current="page" href="/">Home</a>
              <a className="nav-link" id="formbtn" aria-current="page" href="/form" >Form</a>
              <a className="nav-link" id="ordersbtn" href="/orders" >Orders</a>
              <a className="nav-link" id="registerbtn" href="/sessions/register">Register</a>
              <a className="nav-link" id="loginbtn" href="/sessions/login">Login</a>
              <a className="nav-link text-danger" id="signout" href="/sessions/signout" >Sign Out</a>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-grow-1 w-100 d-flex flex-column">
        <section id="background">
          <h1 className="title">Eleva tu estilo con Essence Selecto</h1>
        </section>
        <h2 className="subtitle mt-4 mb-2 text-center">Nuestros perfumes</h2>
        <div className="m-auto d-flex justify-content-end align-items-center">
          <div className="input-group" style={{ width: '300px' }}>
            <input id="text" type="text" className="form-control rounded-end" placeholder="Buscar..." />
            <button id="search" className="btn btn-primary rounded-start" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-evenly w-100 mt-2 mb-4">
          {products.map(each =>
            <section key={each.id} className="card m-2 anchor" style={{ width: '360px' }}>
              <img src={each.photo} style={{ height: '200px' }} className="card-img-top object-fit-cover" alt="" />
              <h5 className="p-2 text-center card-title">{each.title}</h5>
              <p className="p-2 text-center card-description" style={{ fontSize: '14px', marginTop: '0' }}>{each.description}</p>
              <p className="p-2 text-center card-price">Precio: $ {each.price}</p>
            </section>
          )}
        </div>
        <div className="w-100 d-flex justify-content-center">
          <i id="prev" className="fas fa-arrow-left btn btn-primary fs-5 m-4 mt-0"  onClick={handlePrevPage}></i>
          <i id="next" className="fas fa-arrow-right btn btn-primary fs-5 m-4 mt-0"  onClick={handleNextPage}></i>
        </div>
      </main>

      <footer className="footer">
        <div className="red-social">
          <a href="#" className="fa fa-facebook"></a>
          <a href="#" className="fa fa-twitter"></a>
          <a href="#" className="fa fa-instagram"></a>
        </div>
        <small>&copy; 2024 <strong>ESSENCE SELECTO</strong> - Todos los Derechos Reservados.</small>
      </footer>

    </>
  );
}

export default App;

