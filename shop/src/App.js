import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import image from './img/bg.png';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './routes/Detail.js'
import axios from 'axios'


function App(){

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate(); // 페이지 이동 도와줌
  // navigate(1) 앞으로 가기, navigate(-1) 뒤로가기 기능
  return (
    <div className="App">

      


      <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
          <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
        </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route path="/" element={
          <>
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
          <button onClick={() => {
            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((res) => {
              let copy = [...shoes, ...res.data]
              setShoes(copy)
            })
            .catch(() => {
              console.log('실패')
            })
          }}>더보기</button>
          </>
        } />

        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />


        <Route path="/about" element={<About/>} >     {/* Nested Routes 라우트 안에 추가적인 세부 라우트 */}
          <Route path="member" element={<div>멤버임</div>} /> 
          <Route path="location" element={<div>위치정보임</div>} />
        </Route>
        
        <Route path="*" element={<div>없는페이지</div>} /> {/* 라우팅 이외의 라우트 표시는 *를 이용해서 표시*/}
      </Routes>
      </div>

      
  )
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet> {/* Nested route를 보여줄 위치 표시 */}
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
