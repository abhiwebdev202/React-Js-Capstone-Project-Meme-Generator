import React from 'react';

class MemeGenerator extends React.Component{
    constructor(){
        super();
        this.state= {
            topText: '',
            bottomText: '',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }
    this.handleChange=this.handleChange.bind(this);
    this.handleClick=this.handleClick.bind(this);
    }
    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then(response =>{
            const {memes} = response.data;
            this.setState({
                allMemeImgs: memes
            })
        })
    }
    handleChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }
    handleClick(event){
        event.preventDefault();
        const randomNum = Math.floor(Math.random()*this.state.allMemeImgs.length);
        const randomMemeImg = this.state.allMemeImgs[randomNum].url
        this.setState({
            randomImg: randomMemeImg
        })
    }
    render(){
        return (
            <div>
                <form className='meme-form'>
                    <input type='text' placeholder='Top Text' name='topText' 
                    value={this.state.topText} onChange={this.handleChange}/>
                    <input type='text' placeholder='Bottom Text' name='bottomText' 
                    value={this.state.bottomText} onChange={this.handleChange}/>
                    <button onClick={this.handleClick}>Gen</button>
                </form>
                <div className='meme'>
                    <img src={this.state.randomImg} alt='loading...'/>
                    <h2 name='top'className='top'>{this.state.topText}</h2>
                    <h2 name= 'bottom' className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator;