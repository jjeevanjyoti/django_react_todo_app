import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default class TodoList  extends React.Component  {
    constructor(props) {
        const username = localStorage.getItem('username');
        super(props);
        this.state = {
            todos: [],
            title:'',
            desc:'',
            id:'',
            username:username,
            completed:false,
            isEdit:false
          }
          this.handleInputChange = this.handleInputChange.bind(this);

      }
      changeHandler = e => {
       this.setState({[e.target.name]:e.target.value})
      }
      handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            completed: value
        });
      }
      handleSubmit = event => {
        event.preventDefault();
        const todo = {
          title: this.state.title,
          username:this.state.username,
          desc:this.state.desc,
          completed:this.state.completed
        };
        let id = this.state.id
        if(this.state.isEdit){
            axios.put(`http://127.0.0.1:8000/todos/`+id, { todo })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.componentDidMount();
            })
        
        }else{
            axios.post(`http://127.0.0.1:8000/todos/`, { todo })
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.componentDidMount();
            })
        }
        
      }
      componentDidMount() {
        axios.post(`http://127.0.0.1:8000/alltodos/`,{username:this.state.username})
          .then(res => {
            const todos = res.data;
            this.setState({ todos });
          })
      }

      onEdit(title,desc,completed,id) {

        this.setState({
            title:title,
            desc:desc,
            completed:completed,
            id:id,
            isEdit:true
        })

      }
      onDelete(id){
        axios.delete(`http://127.0.0.1:8000/todos/`+id)
        .then(res => {
            this.componentDidMount();
        })

    }
      
render(){
    let button;

    if(this.state.isEdit){
         button = <Button variant="primary" type="submit">Update</Button>
    }else{
         button = <Button variant="primary" type="submit">Add</Button>
    }
    const {title,desc} = this.state
    return (
        <div className="TOP">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control  placeholder="Title"  type="text" name="title"  value={title} onChange={this.changeHandler}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control  placeholder="Description" type="text" name="desc"  value={desc} onChange={this.changeHandler}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Completed" name="completed"   checked={this.state.completed} onChange={this.handleInputChange}/>
                </Form.Group>
                {button}
            </Form>

            <ListGroup >
            { this.state.todos.map(todo => 
            <ListGroup.Item className="TOP" key={todo.id}>
            <span className="Right">
                <h2>{todo.title}</h2>
                <p>{todo.desc}</p>
            </span>
            <span className="Left">
                <Button variant="primary" type="submit" onClick={() => this.onEdit(todo.title,todo.desc,todo.completed,todo.id)}>
                        edit
                </Button>
                <Button variant="danger" className="delete" type="submit" onClick={() => this.onDelete(todo.id)}>
                        delete
                </Button>
            </span>
        </ListGroup.Item>
            )}
            </ListGroup>
        </div>
    )
}
}

