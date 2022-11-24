import React, { Component } from 'react';

class About extends Component {

    render() {
        const bodyStyle = {
            fontFamily: 'Newsreader',
            fontWeight: 400,
            fontSize: '48px',
            color: '#102851',
            width: '70%',
            marginLeft: '35px'
        }
    
        return (
            <div className='main-body' style={bodyStyle}>
            is the author of Of the Florids (Diode Editions, 2022), winner of the 2021 Diode Editions Chapbook Prize. His poetry has been anthologised in New Singapore Poetries (Gaudy Boy, 2022) and Exhale: An Anthology of Queer Singapore Voices (Math Paper Press, 2021) and published in New Delta Review, Queer Southeast Asia, Quarterly Literary Review Singapore, Voice and Verse Poetry Magazine and elsewhere. His Mandarin Chinese to English translations have been published in Journal of Practice, Research and Tangential Activities (PR&TA) and Exchanges: Journal of Literary Translation. He is Translation Tuesdays Editor at Asymptote. Shawn is born and based in Singapore.
            </div>
        )
    }
}

export default About;