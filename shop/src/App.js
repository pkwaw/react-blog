import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import image from './img/bg.png';
import data from './data.js';
import {Routes, Route, Link } from 'react-router-dom'


function App(){

  let [shoes] = useState(data)
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<div>메인페이지</div>} />
        <Route path="/detail" element={<div>상세페이지</div>} />
      </Routes>


      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Cart</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      <div className="main-bg" style={{ backgroundImage: 'url(' + image + ')' }}></div>
      <div className="container">
        <div className="row">
          
          {/* <Card shoes={shoes[1]} i={2}></Card>
          <Card shoes={shoes[2]} i={3}></Card>  */}

          {
            shoes.map((a, i) =>{
              return(
                <Card shoes={shoes[i]} i={i}></Card>
              )
            })
          } 
        </div>
      </div> 
    </div>
  )
}

function Card(props){
  return (
    <div className="col-md-4">
      {/* <img src={process.env.PUBLIC_URL + '/logo192.png'} width="80%"/> */}
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width="80%"/>  
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
