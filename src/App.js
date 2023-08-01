import './App.css';
import React from "react";
import ToDo from "./ToDo";
import { Paper, List, Container } from '@material-ui/core';
import AddToDo from './AddToDo';
// 중괄호를 사용하는 이유는 전체에서 일부만 import 하겠다는 의미
// 그래서 이름이 틀리지 말아야 함
// 일반적인 import는 전체를 가져오는 것이기 때문에 from 앞의 이름은 임의로 사용 가능
import { call } from './service/ApiService';

class App extends React.Component {
  constructor(props){
    super(props);
    // 여러 객체를 생성해서 state에 items 이라는 이름으로 저장
    // 객체가 여럿이므로 배열을 사용
    this.state = {items:[]};
  }

  // 컴포넌트가 메모리 할당을 한 후 출력하기 전에 호출되는 메서드
  componentDidMount(){
    // 데이터를 가져오는 API 요청을 수행
    call("/todo", "GET", null)
    .then((response) => this.setState({items:response.list}))
  }

  // 데이터 추가를 위한 함수
  // Item 1개를 받아서 items 에 추가하는 함수
  // react 에서는 배열 등의 원본을 바로 수정하면 에러가 발생하므로
  // 복제본을 만들어서 수정하고 이를 원본에 반영하는 형식
  add = (item) => {
    item.userid = 'park';
    call("/todo", "POST", item)
    .then((response) => this.setState({items:response.list})) 
  }

  // 데이터를 삭제하는 함수
  deleteFunction = (item) => {
    item.usreid = 'park';
    call("/todo", "DELETE", item)
    .then((response) => this.setState({items:response.list}))
  }

  // 데이터를 수정하는 함수
  update = (item) => {
    item.userid = 'park'
    call("/todo", "PUT", item)
    .then((response) => this.setState({items:response.list}))
  }
  

  render(){
    // map 함수 : 데이터의 모임을 순회하면서 함수를 적용해
    // 함수의 리턴 값을 가지고 데이터의 모임을 만들어주는 함수
    // 데이터 변환에 활용
    // 화살표 함수(람다)는 이름 없는 함수
    // 데이터 갯수에 따라 다르게 반응하도록 작성
    // item의 길이가 0보다 크면(데이터가 있으면) 뒤의 실행문을 수행
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin:16}}>
        <List> 
          {this.state.items.map((item, idx) => (
          <ToDo item = {item} key = {item.id} 
          deleteFunction = {this.deleteFunction}
          update = {this.update}/>
        ))}
        </List>
      </Paper>
    )
    return(
      // ToDo 태그(컴포넌트)를 사용하는게 아니라 todoItems 를 호출해서 출력
      <div className="App">
        <Container maxWidth = "md">
          <AddToDo add={this.add}/>
          {todoItems}
        </Container>
      </div>
    )
  }
}

export default App;