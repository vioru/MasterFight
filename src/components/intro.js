import React, {useEffect, useState} from "react";
import master from './img/master.png'
import player from './img/aprendiz.png'
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


    return (
        <div className="masterbck container">
            <h1 className="text-center my-4">Elije tu destino</h1>
            <div className="row my-5 "> 
                <div className="col-6">
                    <h2>Maestro</h2>
                    <img src={master} className="img-fluid col-6 "  width="100px"  alt="master"   onClick={GoMaster}/> 
                </div>

                <div className="col-6">
                    <h2>Aprendiz</h2>
                        <img src={player} className="img-fluid col-6 "  width="100px"  alt="player"   onClick={GoPlayer}/> 
                </div>

                

            </div>


        </div>

    )

}


export default Intro;
