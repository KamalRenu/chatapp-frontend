import React, { useState, useContext } from 'react'
import './Signin-up.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import { AuthContext } from '../Context/AuthContext'

const initialState = {
    email: "",
    password: ""
}

function Signin() {
    const [formValue, setFormValue] = useState(initialState)
    const {email, password} = formValue
    const [error,setError] = useState("")
    const { isFetching, dispatch } = useContext(AuthContext)

    const fillInputs = () => {
        setFormValue({email: "person1@gmail.com", password: "123456"})
    }

    const API_URL = "https://message-app-node.herokuapp.com/"

    const loginCall = async (userCredential, dispatch) => {
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(API_URL+"api/auth/signin", userCredential);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        }
        catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err })
            setError("Wrong Password Or Username")
        }
    }

    const handleChange = (e) => {
        let {name, value} = e.target;
        setFormValue({...formValue, [name]: value})
    }

    const handleForm = (e) => {
        e.preventDefault()
        loginCall({ ...formValue }, dispatch)
    }

    return (
        <div className='signin-container'>
            <div className="signin-card">
                <form onSubmit={handleForm}>
                    <h2 className="signin-title"> Log in</h2>
                    <p className="line"></p>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor="email"> <b>Email</b></label>
                        <input className='signin-textbox' type="email" value={email} placeholder="Enter Email" name="email" required onChange={handleChange} />
                        <label htmlFor="password"><b>Password</b></label>
                        <input className='signin-textbox' type="password" value={password} minLength='6' placeholder="Enter Password" name="password" required onChange={handleChange} />
                    </div>
                    <button className="signin-button" disabled={isFetching}>{isFetching ? <CircularProgress color="#ffffff" /> : "Log In"}</button>
                    <button className="signin-button" onClick={()=> fillInputs()} >Demo Credentials</button>
                    <a className="forget-pass" href="#home">Forgot password?</a>
                </form>
                <div className='signup-option'>
                    <p className="signup-question">Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signin