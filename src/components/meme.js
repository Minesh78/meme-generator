import React from "react";

export default function Meme(){

    const[meme, setMeme] = React.useState({
        topText:"",
        bottomText:"",
        randomImage:"https://i.imgflip.com/39t1o.jpg"
    })

    const[allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes").then(res => res.json()).then(data=> setAllMemes(data.data.memes))
    },[])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url

        setMeme(prevMeme =>({
            ...prevMeme,
            randomImage: url
        }))
    }
   

    function handleChange(event){
        const {name,value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        }))
    }
    
    return (
    <main>
   
    <div className="form">
        <input 
        className="input-top" 
        type="text" 
        placeholder="Top text"
        name="topText"
        value={meme.topText}
        onChange={handleChange}    
        />

        <input 
        className="input-bottom" 
        type="text" 
        placeholder="Bottom text"
        name="bottomText"
        value={meme.bottomText}
        onChange={handleChange}
        />
        
        <button className="form-button" 
        onClick={getMemeImage}>
        Get a new meme image
        </button>
        
    </div>
    <div className="meme">
    <img className="meme-img" alt="MEME" src={meme.randomImage}></img>
    <h2 className="meme-text top">{meme.topText}</h2>
    <h2 className="meme-text bottom">{meme.bottomText}</h2>
    </div>

    </main>
    )
}