import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import CreateQuiz from "./createQuiz";
import CreateQuestions from "./questions";

const PlayerWall = () => {

    const [quiz, setQuiz] = useState([]);
    const [user, setUser] = useState({});
    // console.log(autores);
    

    const history = useHistory()


    useEffect(() => {
        axios.get("http://localhost:8000/api/playerWall", {withCredentials: true})
            .then(res => setQuiz(res.data))
            .catch(err => {
                if(err.response.status === 401) {
                    history.push('/login');
                }
            });
    }, [history])

    const userInSession =()=>{
        axios.get("http://localhost:8000/api/player", {withCredentials: true})
        .then(res => setUser(res.data))
        .catch(err => {
            if(err.response.status === 401) {
                history.push('/login');
            }
        });

    }

    // useEffect(() => {
    //     axios.get("http://localhost:8000/api/autors", {withCredentials: true})
    //         .then(res => setAutores(res.data))
    //         .catch(err => {
    //             if(err.response.status === 401) {
    //                 history.push('/login');
    //             }
    //         });
    // }, [history])



    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => history.push('/player'))
            .catch(err => console.log(err));
    }




    return (
        <div>
                        <button className="btn btn-danger float-right m-3" onClick={cerrarSesion}>Cerrar Sesión</button>
            <h1>Bienvenido Aprendiz</h1>
            <h3>Introduce tu codigo de examen aqui</h3>


            


            


        </div>

    )

}


export default PlayerWall;
