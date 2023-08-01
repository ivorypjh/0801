import React from "react";

import { TextField, Paper, Button, Grid } from "@material-ui/core";

// 1줄의 텍스트를 입력 받아서 버튼을 누르면 추가하는 컴포넌트
class AddToDo extends React.Component{
    constructor(props){
        super(props);
        // 입력 받은 내용을 저장할 state를 생성
        // 내용을 입력 받아서 title 에 저장
        this.state = {item:{title:""}}

        // 넘겨준 데이터(props)를 변수(this)에 대입
        this.add = props.add
    }

    // 입력 내용이 변경될 때 title을 수정하는 메서드
    onInputChange = (e) => {
        // item 속성을 복제
        const thisItem = this.state.item;
        // 복제된 객체의 title 값을 입력한 내용으로 수정
        thisItem.title = e.target.value;
        // 복제된 객체를 다시 item으로 복사
        this.setState({item:thisItem})
    }

    // 추가하기 버튼을 누를 때 호출되는 메서드
    onButtonPush = (e) => {
        // 데이터를 추가
        this.add(this.state.item);
        // title을 클리어 - 입력상자도 클리어 됨
        this.setState({item:{title:""}});
    }

    // Enter 키를 눌렀을 때 호출되는 메서드
    enterEnterHandler = (e) => {
        // Enter 키를 누르면 추가하기 버튼을 누른 것과 동일한 효과
        if(e.key === "Enter"){
            this.onButtonPush();
        }
    }

    render(){
        return(
            // margin 은 내부 여백, padding 은 외부 여백
            // xs, md 는 사이즈의 일종
            // 전체 크기가 16 이므로 12/16 이 됨
            // Grid 는 표처럼 공간을 나누기 위해 사용
            <Paper style={{margin:16, padding : 16}}>
                <Grid container>
                    <Grid xs={12} md={12} item style={{paddingRight:16}}>
                        <TextField
                        placeholder="제목을 입력하세요"
                        fullwidth
                        value={this.state.item.state}
                        onChange={this.onInputChange}
                        onKeyDown={this.enterEnterHandler}/>
                    </Grid>
                    <Grid xs ={1} md = {1} item>
                        <button
                        fullwidth
                        color="secondary"
                        variant = "outlined"
                        onClick={this.onButtonPush}>
                            추가하기
                        </button>
                    </Grid>
                </Grid>

            </Paper>
        )
    }
}

export default AddToDo;