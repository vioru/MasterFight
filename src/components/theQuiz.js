import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { set } from "mongoose";
import Editq from "./editquestion";
import TempleIntro from "./background/temple";





const TheQuiz = () => {
    const { id } = useParams();
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState([, ,]);
    const [status, setStatus] = useState([false, false, false]);
    const [idQ, setidQ] = useState("");




    const [errorQuestion, setErrorQuestion] = useState({});
    const [Edit, setEdit] = useState(false);

    console.log(Edit);
    // console.log(errorQuestion);

    const [quiz, setQuiz] = useState([]);
    const [user, setUser] = useState({});
    const [questions, setquestions] = useState([]);

    // console.log('soy el id '+id);


    const history = useHistory()


    useEffect(() => {
        loadQuizData();

    }, [])

    // const userInSession = () => {
    //     axios.get("http://localhost:8000/api/user", { withCredentials: true })
    //         .then(res => setUser(res.data))
    //         .catch(err => {
    //             if (err.response.status === 401) {
    //                 history.push('/login');
    //             }
    //         });

    // }
    const loadQuizData=()=>{
        axios.get("http://localhost:8000/api/Quiz/"+id, { withCredentials: true })
        .then(res => {
            setQuiz(res.data);
            setquestions(res.data.questions);

        })
        .catch(err => {
            if (err.response.status === 401) {
                history.push('/login');
            }
        });

    }

    const AgreeQuestion = (id) => {

        history.push('/thequiz/' + id);
    }


    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => history.push('/admi'))
            .catch(err => console.log(err));
    }




    const EditQuestion = (idQuestion) => {

        setEdit(true);
        setidQ(idQuestion);


    }




const DeleteQuestion = id => {
    axios.delete("http://localhost:8000/api/question/delete/" + id)
        .then(res => {
            // let newList = question.filter(question => question._id !== id);
            // setQuestion(newList);
            console.log(res.data);
            loadQuizData();
        })

}




const OptionsChange = ({ target }) => {
    setOptions({
        ...options,
        [target.id]: target.value
    });
}

const StatusChange = ({ target }) => {

    setStatus([target.id == "status1", target.id == "status2", target.id == "status3"]);

}

const newQuestion = e => {
    e.preventDefault();
    // console.log(status,'status');

    let data = {
        question,
        option1: options.option1,
        option2: options.option2,
        option3: options.option3,
        status1: status[0],
        status2: status[1],
        status3: status[2],
        quiz: id
    }




    axios.post('http://localhost:8000/api/question/save',
        data
        , { withCredentials: true })
        .then(res => {

            let idQuestion = res.data._id;

            axios.put('http://localhost:8000/api/quiz/update/' + id, {
                questions: idQuestion
            }, { withCredentials: true })

                // .then(res => history.go(0))
                .then(res => {
                    history.go(0);
                    // setStatus([false, false, false]);
                    // setOptions([, , ]);
                    // setQuestion("");
                    // reloadQuizData();
                    // click();

                })
        })
        .catch(err => {
            setErrorQuestion(err.response.data.errors)

        }); //setErrorQuestion(err.response.data.errors)
}






const reloadQuizData = (questionId) => {
    loadQuizData();
    // history.push('/thequiz/'+id+"#"+questionId);
}


return (
    <div>
        {/* <h1>Bienvenido</h1> */}

        <button className="btn btn-danger float-right m-3" onClick={cerrarSesion}>Cerrar Sesi??n</button>
        <Link to="/admi/wall" className="  btn btn-success float-right col-1 m-3 "> Atras </Link>


        <div className="row">
            <div className="col-6">
                {/* id={"pquiz"+index} */}


                <h2>Nombre:{quiz.name} </h2>
                <h3>Materia :{quiz.type}</h3>
                <h3>Puntaje minimo :{quiz.scoreToWin}</h3>

                {questions.map((element, index) => (<>
                    <h3 id={element._id} key={index}>Pregunta  : ??{element.question}?</h3>
                    <h5><b>a.</b>{element.option1}</h5>
                    <h5><b>b.</b>{element.option2}</h5>
                    <h5><b>c.</b>{element.option3}</h5>

                    <button className="btn btn-warning mx-5" onClick={() => EditQuestion(element._id)} >Editar</button>
                    <button className="btn btn-danger mx-5" onClick={() => DeleteQuestion(element._id)} >Eliminar</button>
                </>
                ))}

            </div>
            <div className="col-6">
                { Edit? 
                // <TempleIntro/>
                <><div className="row container mx-5 masterbck">
                <div className="col-10 my-3 ">
                <Editq  id ={idQ} setEdit ={setEdit}  reloadQuizData={reloadQuizData} />
                    </div>
                    </div>
                    </>
                


                    :<>
                <div className="row container mx-5 masterbck">
                    <div className="col-10 my-3 ">
                        <h2 className="">Preguntas</h2>
                        <form onSubmit={newQuestion} className="my-3" >
                            <div id="question">
                                <div className="form-group">
                                    <label htmlFor="Question">Haz tu Pregunta</label>
                                    {/* <input type="hidden" value={id} name="id"/> */}

                                    <input type="text" name="Question" id="Question" className="form-control" value={question} onChange={e => setQuestion(e.target.value)} />
                                    {errorQuestion.question ? <span className="text-danger">{errorQuestion.question.message}</span> : null}
                                </div>
                                <p>Opciones</p>
                                <div className=" form-group mx-1 row text-center">


                                    <input type="text" name="option1" id="option1" className="form-control col-11 my-2 " value={options[0]} onChange={OptionsChange} />
                                    <input className="form-control col-1  my-3" id="status1" type="radio" name="status" value={status[0]} onChange={StatusChange} />
                                    {errorQuestion.option1 ? <span className="text-danger">{errorQuestion.option1.message}</span> : null}


                                    <input type="text" name="option2" id="option2" className="form-control col-11 my-2 " value={options[1]} onChange={OptionsChange} />
                                    <input className="form-control col-1  my-3" id="status2" type="radio" name="status" value={status[1]} onChange={StatusChange} />
                                    {errorQuestion.option2 ? <span className="text-danger">{errorQuestion.option2.message}</span> : null}

                                    <input type="text" name="option3" id="option3" className="form-control col-11 my-2 " value={options[2]} onChange={OptionsChange} />
                                    <input className="form-control col-1  my-3" id="status3" type="radio" name="status" value={status[2]} onChange={StatusChange} />
                                    {errorQuestion.option3 ? <span className="text-danger">{errorQuestion.option3.message}</span> : null}


                                </div>
                                {errorQuestion.status ? <span className="text-danger">{errorQuestion.status.message}</span> : null}
                                {/* {status === [false, false, false] ? <span className="text-danger">debes escoger la respuesta correcta</span> : null} */}

                                <div id="morequestions">

                                </div>

                            </div>



                            <input type="submit" value="Guardar" className="btn btn-primary" />
                        </form>
                    </div>



                </div> 
                </>
            }
            </div>
        </div>









    </div>

)

}


export default TheQuiz;
