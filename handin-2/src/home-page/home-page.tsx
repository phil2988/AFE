import { Component } from "react";
import Login from "./login/login";
import "./home-page.css"

interface HomeProps {
    
}

class HomePage extends Component<HomeProps> {
    render() { 
        return (
            <div className="home-page">
                <h1>Home Page</h1>
                <div className="login-container">
                    <Login/>
                </div>
            </div>
        );
    }
}
 
export default HomePage;