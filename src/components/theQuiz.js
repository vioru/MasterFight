import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory, useParams} from "react-router-dom";
import CreateQuiz from "./createQuiz";
import CreateQuestions from "./questions";



const TheQuiz = () => {
    const{id} = useParams();

    const [quiz, setQuiz] = useState([]);
    const [user, setUser] = useState({});
    const[questions, setquestions]= useState([]);

    // console.log('soy el id '+id);
    

    const history = useHistory()


    useEffect(() => {
        axios.get("http://localhost:8000/api/Quiz/"+id, {withCredentials: true})
            .then(res => {
            setQuiz(res.data);
            setquestions(res.data.questions);
            // console.log("la data", res.data);
            // console.log("quiz", res.data.questions);
        })
            .catch(err => {
                if(err.response.status === 401) {
                    history.push('/login');
                }
            });
    }, [history])

    const userInSession =()=>{
        axios.get("http://localhost:8000/api/user", {withCredentials: true})
        .then(res => setUser(res.data))
        .catch(err => {
            if(err.response.status === 401) {
                history.push('/login');
            }
        });

    }

        const AgreeQuestion = (id) => {

            history.push('/thequiz/'+id);
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

    // const userInSession =()=>{
    //     axios.get("http://localhost:8000/api/user", {withCredentials: true})
    //     .then(res => setAutores(res.data))
    //     .catch(err => {
    //         if(err.response.status === 401) {
    //             history.push('/login');
    //         }
    //     });

    // }


    // const DeleteAutor = id => {
    //     axios.delete("http://localhost:8000/api/autors/"+id)
    //         .then(res =>{

    //             let newList = autores.filter(autors => autors._id !== id);
    //                 setAutores(newList);

    //         })
    // }


    // const cerrarSesion = () => {
    //     axios.get('http://localhost:8000/api/logout', {withCredentials:true})
    //         .then(res => history.push('/login'))
    //         .catch(err => console.log(err));
    // }

    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => history.push('/player'))
            .catch(err => console.log(err));
    }

    const EditQuestion = (id) => {
        console.log(id);
    }

    const DeleteQuestion = (id) => {
        console.log(id);
    }



    return (
        <div>
            {/* <h1>Bienvenido</h1> */}
            <button className="btn btn-danger float-right m-3" onClick={cerrarSesion}>Cerrar Sesión</button>
            

                <div className="row">
                    <div className="col-6">
                        {/* id={"pquiz"+index} */}
                    

                            <h2 >Nombre:{quiz.name} </h2>
                            <h3>Materia :{quiz.type}</h3>
                            <h3>Puntaje minimo :{quiz.scoreToWin}</h3>

                            {questions.map ((element, index) => (<>
                        <h3 key ={index}>Pregunta  : {element.question}</h3>
                        <h5><b>a.</b>{element.option1}</h5>
                        <h5><b>b.</b>{element.option2}</h5>
                        <h5><b>c.</b>{element.option3}</h5>

                        <button className="btn btn-warning mx-5" onClick={()=>EditQuestion(element._id)} >Editar</button>
                        <button className="btn btn-danger mx-5" onClick={()=>DeleteQuestion(element._id)} >Eliminar</button>
                        </>
                    ))}

    
                    

        
                
                    </div>
                    <div className="col-6">
                    <CreateQuestions id = {quiz._id} ></CreateQuestions>
                    </div>
                </div>
            
            
            
        
      

            


        </div>

    )

}


export default TheQuiz;
