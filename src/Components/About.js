import React, { Component } from 'react';

class About extends Component {

    constructor(props){
        super(props);

        this.state = {aboutContent:""};
    }

    componentDidMount(){
        const fetchPosts = async() => {
            const res = await fetch('http://localhost:5000/about');
            const data = await res.json();
            return data;
          }

        const getPosts = async() => {
        const postsFromServer = await fetchPosts();
        //reverse arr to display most recent first
        // setBlogRecords(postsFromServer.slice(0).reverse());
        // console.log(postsFromServer[0].content);
        this.setState({aboutContent:postsFromServer[0].content});
        console.log(this.state.aboutContent);
        }
    
        getPosts();
    }



    render() {

        const bodyStyle = {
            marginTop: 64,
            paddingTop: 20,
            fontWeight: 400,
            fontSize: '48px',
            color: '#102851',
            width: '70%',
            whiteSpace: "pre-line"
        }
    
        return (
            <p style={bodyStyle}>
            {/* is the author of Of the Florids (Diode Editions, 2022), winner of the 2021 Diode Editions Chapbook Prize. His poetry has been anthologised in New Singapore Poetries (Gaudy Boy, 2022) and Exhale: An Anthology of Queer Singapore Voices (Math Paper Press, 2021) and published in New Delta Review, Queer Southeast Asia, Quarterly Literary Review Singapore, Voice and Verse Poetry Magazine and elsewhere. His Mandarin Chinese to English translations have been published in Journal of Practice, Research and Tangential Activities (PR&TA) and Exchanges: Journal of Literary Translation. He is Translation Tuesdays Editor at Asymptote. Shawn is born and based in Singapore. */}
            {this.state.aboutContent}
            </p>
        )
    }
}

export default About;

