//react.js 파일에서 export 한 객체를 React로 받아서 사용
//{이름} 의 경우는 export 한 객체에서 이름에 해당하는 것만 받아서 사용
import React from "react";

import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
    ListItemSecondaryAction,
    IconButton,
    Icon
} from "@material-ui/core";

// Icon 가져오기
import DeleteOutlined from "@material-ui/icons/DeleteOutlined"

class ToDo extends React.Component{
    //생성자
    constructor(props){
        super(props);
        //props는 읽기 전용이라서 수정을 하고자 하는 경우
        //state에 복사해서 사용해야 합니다.
        this.state = {item:props.item, readOnly : true}

        this.deleteFunction = props.deleteFunction;
        this.update = props.update;
    }

    // 이벤트가 발생하면 readOnly 의 값을 false 로 수정
    offReadOnlyMode = (e) => {
        // state 값을 직접 변경
        // 1개짜리 속성을 바꾸는 경우 복사 없이 바로 바꿔도 무방
        this.setState({readOnly:false});
    }

    // Enter를 눌렀을 때 동작하는 메서드
    enterKeyEventHandler = (e) => {
        if(e.key === "Enter"){
            this.setState({readOnly:true});
            this.update(this.state.item);
        }
    }

    // input 의 내용을 변경했을 때 호출될 메서드
    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item : thisItem});
        this.update(this.state.item);
    }

    // 체크박스의 값을 변경할 때 호출되는 메서드
    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({item:thisItem});
        this.update(this.state.item);
    }

    // 삭제 아이콘을 눌렀을 때 호출될 함수
    deleteEventHandler = (e) => {
        this.deleteFunction(this.state.item);
    }

    // class 내의 render 함수를 수정
    // id, name 등을 사용할 때 this.state.item.id 와 같이 사용하는데
    // this.state.item 이 반복되므로 const item 선언을 통해 짧게 만듦
    render(){
        const item = this.state.item
        return(
            <ListItem>
                <Checkbox checked = {item.done}
                onChange={this.checkboxEventHandler} />

                <ListItemText>
                    <InputBase
                        inputProps={{"aria-label":"naked",
                    readOnly:this.state.readOnly}}
                        type="text"
                        id = {item.id}
                        name = {item.id}
                        value={item.title}
                        multiline={true}
                        fullwidth
                        onClick={this.offReadOnlyMode}
                        onKeyDown={this.enterKeyEventHandler}
                        onChange={this.editEventHandler}/>
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton aria-label="delete todo"
                    onClick={this.deleteEventHandler}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default ToDo;