import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export class Header extends  React.Component {
    constructor(props) {
        const username= localStorage.getItem('username');
        super(props);
        this.state = {
            username:username
          }
      }
    onRemoveUsername =()=>{
        localStorage.removeItem("username");
    }
    componentDidMount() {
       this.setState({
           username:localStorage.getItem('username')
       })
      }
    render() {
        let btn
       if(this.state.username){
                btn = <Button  variant="outline-warning" onClick={() => this.onRemoveUsername()}> Logout</Button>
       }else{
           btn =<Button></Button>
       }
        return (
            <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
                <Navbar.Brand href="#home">THE TODO APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav className="Right">
                <Nav.Link  className="username">{this.state.username}</Nav.Link>
                <Nav.Link  className="username"> </Nav.Link>
                <Nav.Link href="/">
                  {btn}
                </Nav.Link>
                </Nav>
                </Navbar.Collapse>

            </Navbar>
        </div>
        )
    }
}

export default Header
