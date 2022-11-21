import React, {useEffect, useState} from "react";
import master from './img/master.png'
import player from './img/aprendiz.png'
// import axios from "axios";
import {Link, useHistory} from "react-router-dom";

const Intro = () => {


    return (
        <div className="masterbck">
            <h1 className="text-center my-4">Elije tu destino</h1>
            <div className="row my-5 "> 
            <div>
                <h2>Maestro</h2>
                <a href="/admi"> <img src={master} className="img-fluid col-6 "  width="200px"  alt="master"></img> </a>
            </div>

            <div>
                <h2>Aprendiz</h2>
                <a href="/player"> <img src={player} className="img-fluid col-6 "  width="200px"  alt="player"/> </a>
            </div>

            
            {/* <Link to="/admi" className="col-6 text-center">Maestro </Link>
            <Link to="/player" className="col-6 text-center">Aprendiz </Link> */}
            </div>


            {/* <img src="https://i.pinimg.com/236x/99/52/71/995271f543426293fb4f2b4f0ee2f5a0--kawaii-chibi-anime-chibi.jpg">
                <Link to="/Admi" className="">Maestro </Link></img>
     */}

        </div>

    )

}


export default Intro;
