import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import TododList from './TodoList';
import axios from 'axios';

import './User.css';

const styles = {
    facebookBtn: {
      backgroundColor: 'rgb(51, 89, 157)'
    },
    form: {
      textAlign: 'center'
    }
  }

export class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
           isRegister:false,
           username:'',
           password:'',
           confirmpassword:'',
           Rusername:'',
           Rpassword:'',
           Rconfirmpassword:'',
           username_localstorage:localStorage.getItem('username')
          }

      }

      changeHandler = e => {
        this.setState({[e.target.name]:e.target.value})
       }

      onRegister=()=>{
        this.setState({
            isRegister:true
        })
      }
      onLogin = ()=>{
        this.setState({
            isRegister:false
        })
      }

      userLogin =()=>{
        const user={
            username:this.state.username,
            password:this.state.password
        }
        axios.post(`http://127.0.0.1:8000/user_login/`, { user })
        .then(res => {
            console.log(res);
            console.log(res.data);
            localStorage.setItem('username', this.state.username);
            this.props.history.push('/todolist');
        })
      }

      userRegister =()=>{
        const user={
            username:this.state.Rusername,
            password:this.state.Rpassword,
            confirmpassword:this.state.Rconfirmpassword

        }
        axios.post(`http://127.0.0.1:8000/user_register/`, { user })
        .then(res => {
            console.log(res);
            console.log(res.data);
            localStorage.setItem('username', this.state.Rusername);
            this.setState({
                isRegister:false
            })

        })
      }


      componentDidMount() {
       if(this.state.username_localstorage){
        this.props.history.push('/todolist');
       }
      }
   
    render() {
        const {username,password,Rusername,Rpassword,
        Rconfirmpassword} = this.state
        let userForm;
        if(!this.state.isRegister){
             userForm= <div className="TOP"> <form style={styles.form}>
                <h4>LOGIN</h4>
                <div className='form-group row'>
                    <input className='input' type='text' placeholder='Username' name="username"  value={username} onChange={this.changeHandler}/>
                </div>
                <div className='form-group row'>
                    <input className='input' type='password' placeholder='Password' name="password"  value={password} onChange={this.changeHandler}/>
                </div>
                <div className='form-group row'>
                    <button className='btn' type='button' onClick={() => this.userLogin()}>Log In</button>
                </div>
                <div className='form-group row'>
                    <button className='fb' type='button' onClick={() => this.onRegister()}>Register</button>
                </div>
             </form>
                        <Route path="/TododList" component={TododList}/>
                        </div>
        }
        else{
             userForm= <form style={styles.form}  className="TOP">
                <h4>REGISTER</h4>
                <div className='form-group row'>
                    <input className='input' type='text' placeholder='Username' name="Rusername"  value={Rusername} onChange={this.changeHandler}/>
                </div>
                <div className='form-group row'>
                    <input className='input' type='password' placeholder='Password' name="Rpassword"  value={Rpassword} onChange={this.changeHandler}/>
                </div>
                <div className='form-group row'>
                    <input className='input' type='password' placeholder='Confirm Password' name="Rconfirmpassword"value={Rconfirmpassword} onChange={this.changeHandler} />
                </div>
                <div className='form-group row'>
                    <button className='btn' type='button' onClick={() => this.userRegister()}>Register</button>
                </div>
                <div className='form-group row'>
                    <button className='fb' type='button' onClick={() => this.onLogin()}>Login</button>
                </div>
            </form>
        }
        return (
            <div>
                {userForm}
            </div>
        )
    }
}

export default User
