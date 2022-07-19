/* eslint-disable */   // warning 메시지 제거

import './App.css';
import { useState } from 'react';

// jsx에서는 className 사용
// 변수 넣을때는 {} 중괄호 사용 데이터 바인딩이라 부름
// style 넣을때는 style={}

// state란 


function App() { // JSX로 자바스크립트 안에서 html을 사용할 수 있음
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동맛집', '파이썬 독학']);  // a는 state의 자료 (남자 코트 추천) b는 state의 변경을 도와주는 함수
  let [따봉, 따봉변경] = useState([0, 0, 0]);
  // 변수와 state의 차이점 
  // 변수는 저장되있는 정보가 바뀌면 html상에서도 바꿔줘야하는데 state는 자동으로 재렌더링됨으로써 따로 변경을 안해줘도 됨
  let [modal, setModal] = useState(0);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  // [1,2,3].map(function(a){ // map함수
  //   console.log(1); // 배열 안의 갯수만큼 함수의 코드를 실행해줌
  //   console.log(a); // 배열 안의 자료들을 출력해줌
  //   return '112233'; // 배열 안에 자료를 추가해줌
  // })

  return (
    <div className="App">   
      <div className="black-nav"> 
        <h4 style={ {color:'red', fontSize : '30px'} }>ReactBlog</h4>
      </div>
      {/* <div className="list">
        <h4>{ 글제목[0] }<span onClick={function(){  // state 변경 함수를 이용해서 값을 변경해야함
          따봉변경(따봉+1)
        }}>👍</span> { 따봉 } </h4>
        <p>2월 17일 발행</p>
        <button onClick={function(){   // 원본데이터를 보존한 상태에서 변경하기 위해 새로운 변수 사용
          let copy = [...글제목];       // state 변경 함수는 기존값과 변경값이 같을시 변경을 해주지 않음
          copy[0] = '여자코트 추천';
          글제목변경(copy);
        }}>글수정</button>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={()=>{ 
          if(modal==true){
            setModal(false) 
          }else if(modal==false){
            setModal(true)
          }
          }}>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}
      {
        글제목.map(function(a, i){
          return (
            <div className="list" key={i}>
              <h4 onClick={()=>{
                if(modal==true){
                  setModal(false)
                }else if(modal==false){
                  setModal(true);
                  setTitle(i);
                }
              }}>{ 글제목[i] }<span onClick={(e) => {  
                e.stopPropagation();
                let copy = [...따봉];
                copy[i] = copy[i] + 1;
                따봉변경(copy)
              }}>👍</span> { 따봉[i] } </h4>
              <p>2월 17일 발행</p>
              <button onClick={() => {
                let copy = [...글제목];
                copy.splice(i, 1);
                글제목변경(copy);
              }}>삭제</button>
            </div>
          )
        })
      }

      <input onChange={(e) => { 
        입력값변경(e.target.value); 
        console.log(입력값) 
      }}/>
      <button onClick={() => {
        let copy = [...글제목];
        copy.unshift(입력값);
        글제목변경(copy)
      }}>글발행</button>
      

    {
      modal == true 
      ? <Modal title={title} 글제목변경={글제목변경} 글제목={글제목}/>  // props 사용을 위해state 전달
      : null 
      // jsx안에서는 if문 사용이 불가하기에 삼항연산자 사용
      
    }                        

    </div>
  );
}

// 컴포넌트 사용 예시
// 1. 반복적인 html을 축약할 때
// 2. 큰 페이지 하나를 만들 때
// 3. 자주 변경되는 ui들 구성할 때

function Modal(props){ // 컴포넌트 생성
  return ( // 의미 없는 div대신 fragment라는 문법 사용 가능 <></>
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={function(){
        props.글제목변경(['여자코트 추천', '강남우동 맛집', '파이썬독학'])
      }}>글수정</button>
    </div>
  )
}

export default App;
