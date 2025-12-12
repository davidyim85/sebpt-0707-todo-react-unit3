import { useNavigate } from "react-router";
import { useState } from "react";
import axios from 'axios';
import { BASEURL } from "../contants";

const SignIn= (props) => {
    const navigate = useNavigate();

    // keeping track of sign up state
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    // handle a change to the form
    const handleChange = (e) => {
        setFormData({
            ...formData, //whatever the formdata was originally
            [e.target.name]: e.target.value,
        })
    }

    // handle a submit
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent the page from reloading

        try {
            // make a call to the backend to sign up
            const res = await axios.post(`${BASEURL}/users/sign-in`, formData);

            props.logIn(res.data.token);

            // then navigate to the '/home' page
            navigate('/home');
        } catch (error) {
            console.error(error)
        }
    }

    const isFormInValid = () => {
        // any of the fields are blank
        if (!formData.username || !formData.password) {
            return true;
        } else {
            return false;
        }
    }

    // form validation
    console.log(formData)
    return <main>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="username">Username: </label>
            <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />

            <label htmlFor="password">Password: </label>
            <input
                id="password"
                type="password" //was originally text
                name="password"
                value={formData.password}
                onChange={handleChange}

            />
            <div>
                <button disabled={isFormInValid()} type="submit" >Sign Up</button>
                <button onClick={() => navigate('/')}>Cancel</button>
            </div>
        </form>
    </main>
}

export default SignIn;