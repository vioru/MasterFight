import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import templo from "./img/fondo intro.jpg"
import trans from './img/fondo intropng.png'
import mastergif from './img/maestrointro.gif'
import aprendiz from './img/male.gif'
import TempleIntro from "./background/temple";




const PlayerWall = () => {

    const [quiz, setQuiz] = useState([]);
    const [user, setUser] = useState({});
    const [Id, setId] = useState("");
    const [IdQuiz, setIdQuiz] = useState("");
    const [firstRender, setfirstRender] = useState(false);
    console.log("afuera", firstRender);
    // console.log (errorId);

    const [errorQuiz, setErrorQuiz] = useState({});

    // const [errorId, setErrorId] = useState({});


    const history = useHistory()

    const foundQuiz = (e) => {
        e.preventDefault();

        let id = Id
        console.log(id);
        setIdQuiz(id);
        // console.log("elquiz", quiz);
        setId("");
        // console.log("elquiz", quiz);



        // if (Id == ""){
        //     setErrorId("Debes introducir un codigo");

        // }else{
        //     let id = Id
        //     // console.log(id);
        //     setIdQuiz(id);
        //     // console.log("elquiz",quiz);
        //     setId("");
        //     // console.log("elquiz",quiz);

        // }



    }

    useEffect(() => {
        setfirstRender("cambio");


    }, [])

    useEffect(() => {
        if (firstRender == "cambio") {

            console.log("entro al use efect que va a guardar los quiz");
            console.log(firstRender);
            // newTask(list);
        }

    }, [firstRender])



    useEffect(() => {
        axios.get("http://localhost:8000/api/Quiz/" + IdQuiz, { withCredentials: true })
            .then(res => {

                let exits = quiz.filter(quiz => quiz._id == IdQuiz);
                // if(exits == ""){
                //     console.log("el dato exite ");

                // }

                let OtherQuiz = [...quiz];
                // console.log("el dato ", res.data);
                OtherQuiz.push(res.data);
                // console.log(OtherQuiz);
                setQuiz(OtherQuiz);
                setIdQuiz("");
                // let exits =quiz.length-1;
                // console.log('ya existe esa tarea',quiz.length-1)
                // if(quiz == quiz[exits]){
                //     console.log('ya existe esa tarea',quiz.length-1)

                //     // console.log('ya existe esa tarea',Task.length-1)
                // }else{
                //                         let OtherQuiz = [...quiz];
                //     // console.log("el dato ", res.data);
                //     OtherQuiz.push(res.data);
                //     // console.log(OtherQuiz);
                //     setQuiz(OtherQuiz);
                // }


                // let newList = quiz.filter(quiz => quiz._id !== IdQuiz);
                // console.log("new", newList);

                // if(newList == [""]){
                //     console.log("el quiz", quiz);
                //     let OtherQuiz = [...quiz];
                //     // console.log("el dato ", res.data);
                //     OtherQuiz.push(res.data);
                //     // console.log(OtherQuiz);
                //     setQuiz(OtherQuiz);
                //     // console.log("el quiz despues del push", quiz)
                //     console.log("no puedes agregar la misma tarea")
                // }



                // userInSession();
            })
            .catch(err => {
                if (err.response.status === 401) {

                    // setErrorId("Debes introducir un codigo invalido");
                }
            });
    }, [Id])





    // const userInSession =()=>{
    //     axios.get("http://localhost:8000/api/player", {withCredentials: true})
    //     .then(res => setUser(res.data))
    //     .catch(err => {
    //         if(err.response.status === 401) {
    //             history.push('/login');
    //         }
    //     });

    // }
    const TakeExam = (id) => {

        history.push('/player/exam/' + id);





    }

    const Intro = () => {
        setfirstRender(false);

    }




    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => history.push('/player'))
            .catch(err => console.log(err));
    }



    return (
        <div>

            <button className="btn btn-danger float-right m-3" onClick={cerrarSesion}>Cerrar Sesión</button>
            <h1>Bienvenido Aprendiz</h1>
            {firstRender ? <>
                <button className="btn btn-danger  m-3" onClick={Intro}>Ver Intro</button>


                {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Ver Intro
                    </button>

                
                    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content"  >


                                <div class="modal-body">
    
                                <img src={master} className="img-fluid col-6 " width="px"  alt="master"   />

                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Salir</button>
                                    <button type="button" class="btn btn-primary">Omitir Intro</button>
                                </div>
                            </div>
                        </div>
                    </div> */}



            </> : <>
                {/* <img src={templo} className="back"   alt="master"   /> */}
                <div className="row ">
                    <div class="maquina text-center col-12">
                        <h2 className="">Hoy decidiste empezar tu camino ninja, hoy comienza <br/> 
                            tu entrenamiento y cada que pases serie de pruebas<br/>
                            vas a subir tu nivel hasta llegar a ser un maestro ......<span>&#160;</span></h2>
                    </div>
                    <img src={trans} className="img-fluid col-12" width="900px" alt="master" />
{/* 
                    <img src={templo} className="img-fluid col-12   " width="1300px" alt="templo" />

                    <img src={mastergif} className="img-fluid col-12 masterintro" width="50px" alt="master" />

                    <img src={aprendiz} className="img-fluid col-12 aprendiz" width="50px" alt="aprendiz" /> */}

                    <TempleIntro/>
                </div>
                {/* <p>deberia salir los examenes y el input para meter codigo y quedarse aqui :/</p> */}

            </>}

            <form onSubmit={foundQuiz} className="my-3" >

                <div className="form-group col-11">
                    <h3>Introduce tu codigo de examen aqui</h3>
                    <input type="text" name="type" id="type" className=" " value={Id} onChange={e => setId(e.target.value)} />
                    {/* {errorId ? <span className="text-danger">{errorId}</span> : null} */}
                </div>
                <div className="col-11">
                    <input type="submit" value="Buscar" className="btn btn-primary " />
                </div>

            </form>
            <div className="row">

                {quiz.map((element, index) => (<>
                    <div class="card col-4">
                        {/* <img src="..." class="card-img-top" alt="..."/> */}

                        <div class="card-body">
                            <h5 class="card-title">{element.name}</h5>
                            <p class="card-text">Materia:{element.type} </p>
                            <p class="card-text">Puntaje Minimo:{element.scoreToWin} </p>

                            <button className="btn btn-success m-3" onClick={() => TakeExam(element._id)}>Presentar Examen</button>
                        </div>
                    </div>
                </>
                ))
                }

            </div>

            {/* 

            {quiz.map((element, index) => (<>
                <h5 key={index} id={"pquiz" + index}> {element.name}</h5>

                <button className="btn btn-primary" onClick={() => TakeExam(element._id)} >ver</button>
            </>
            ))
            } */}



        </div>

    )

}


export default PlayerWall;
