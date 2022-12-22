import React, { Component } from 'react';
import './CSS/AboutPage.css';

class About extends Component {

    constructor(props){
        super(props);

        this.state = {aboutContent:""};
    }

    componentDidMount(){
        const fetchPosts = async() => {
            const res = await fetch('https://shawn-hoo-portfolio-server.onrender.com/about');
            const data = await res.json();
            return data;
          }

        const getPosts = async() => {
        const postsFromServer = await fetchPosts();
        
        this.setState({aboutContent:postsFromServer[0].content});
        console.log(this.state.aboutContent);
        }
    
        getPosts();
    }



    render() {    
        return (
            <p className="bodyStyle">
                {this.state.aboutContent}
            </p>
        )
    }
}

export default About;

