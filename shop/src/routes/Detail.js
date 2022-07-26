import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';

import { addItem } from "../store.js";
import { useDispatch } from "react-redux";


import {Context1} from './../App.js';

let YellowBtn = styled.button`
    background : ${ props => props.bg};
    color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`
// 버튼 속성 복사
// let NewBtn = styled.button(YellowBtn)` 
    
// `

function Detail(props){
    let {stock} = useContext(Context1)


    let [num, setNum] = useState('')
    let [count, setCount] = useState(0)
    let [alert1, setAlert] = useState(true)
    let [tab, setTab] = useState(0)

    let {id} = useParams();
    let product = props.shoes.find(function(x){
        return x.id == id
    });

    let dispatch = useDispatch()


    //useEffect 정리
    // useEffect(() => { }) 1. 재랜더링마다 코드 실행       4. useEffect 실행 전에 뭔가 실행하려면 언제나 return () => {}
    // useEffect(() => { }, []) 2. mount시 1회 코드실행    5. 특정 state 변경시에만 실행하려면 [state이름]
    // useEffect(() => {
    //    return () => {
    //      3. unmount시 1회 코드 실행
    //    }
    //}, [])

    // useEffect(() => { // useEffect 안에는 어려운연산, 서버에서 데이터 가져오기, 타이머 장착등에 사용
    //     setTimeout(() => { setAlert(false) }, 2000)
    // }, [count])

    useEffect(() => {
        if (isNaN(num) == true){
            alert('그러지마세요');
        }
    }, [num])

    return(
    <div className="container">
        {/* {
            alert == true
            ? <div className="alert alert-warning">
                2초이내 구매시 할인
              </div>
            : null
        }
        <YellowBtn bg="blue">버튼</YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
        {count}
        <button onClick={() => { setCount(count+1)}}>버튼</button> */}
        <div className="row">
            <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6">
                {/* <input onChange={((e) => { setNum(e.target.value)})} /> */}
                <h4 className="pt-5">{product.title}</h4>
                <p>{product.content}</p>
                <p>{product.price}</p>
                <button className="btn btn-danger" onClick={() => {
                    dispatch(addItem( {id : 1, name : 'RedKnit', count : 1}))
                }}>주문하기</button> 
            </div>
        </div>

        <Nav variant="tabs"  defaultActiveKey="link0">
            <Nav.Item>
                <Nav.Link onClick={() => { setTab(0)}} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => { setTab(1)}} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => { setTab(2)}} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
        <TabContent tab={tab} />


    </div> 
    )
}

function TabContent({tab}){

    let [fade, setFade] = useState('') 
    let {stock} = useContext(Context1)

    useEffect(() => {
        setTimeout(() => { setFade('end') }, 100)
        return () => {
            setFade('')
        }
    }, [tab])
    
    return (<div className={'start ' + fade}>
        { [ <div>{stock}</div>, <div>내용1</div>, <div>내용2</div>][tab]}
        </div>)
}

export default Detail;