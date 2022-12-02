import React, {useEffect, useState} from "react";
import master from './img/master.png'
import player from './img/aprendiz.png'
import masterrev from './img/masterre2v.png'
import playerrev from './img/aprendizrev.png'


// import axios from "axios";
import {Link, useHistory} from "react-router-dom";

const Intro = () => {


    const history = useHistory();


    const GoPlayer = () => {

            history.push('/player')
        

    }

    const GoMaster = () => {

        history.push('/admi')
    

}


const overA = () => {
    console.log()

        var image = document.getElementById('1')
        image.src = playerrev;

}

const outA = () => {

    var image = document.getElementById('1')

    image.src = player; 


}

const overM = () => {
    console.log()

        var image = document.getElementById('0')
        image.src = masterrev;

}

const outM = () => {

    var image = document.getElementById('0')

    image.src = master; 


}


    return (
        <div className="masterbck container">
            <h1 className="text-center my-4">Elije tu destino</h1>
            <div className="row my-5 "> 
                <div className="col-6">
                    <h2>Maestro</h2>
                    <img src={master} className="img-fluid col-6 "  width="100px"  alt="master" id="0"  onMouseOver={overM} onMouseOut={outM}  onClick={GoMaster}/> 
                </div>

                <div className="col-6">
                    <h2>Aprendiz</h2>
                        <img src={player} className="img-fluid col-6 "  width="100px"  alt="player" id="1" onMouseOver={overA} onMouseOut={outA} onClick={GoPlayer}/> 
                </div>

                

            </div>


        </div>

    )

}


export default Intro;
