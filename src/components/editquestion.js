import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { set } from "mongoose";




const Editq = ({id,setEdit,reloadQuizData }) => {



    //editar
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [status1, setStatus1] = useState();
    const [status2, setStatus2] = useState();
    const [status3, setStatus3] = useState();
    const [statusCh, setStatusCh] = useState([false, false, false]);
    const [quiz, setQuiz] = useState([]);

    




    const [errorQuestion, setErrorQuestion] = useState({});

    // console.log(errorQuestion);


    const history = useHistory()


    useEffect(() => {
        axios.get("http://localhost:8000/api/question/"+id, { withCredentials: true })
            .then(res => {
            // setAll(res.data);

            setQuestion(res.data.question);
            setOption1(res.data.option1);
            setOption2(res.data.option2);
            setOption3(res.data.option3);
            setStatus1(res.data.status1);
            setStatus2(res.data.status2);
            setStatus3(res.data.status3);
            setQuiz(res.data.quiz);

            console.log("todo el ",res.data);
                        })
            .catch(err => {
                if (err.response.status === 401) {
                    history.push('/login');
                }
            });         

    }, [id])

    

    // const userInSession = () => {
    //     axios.get("http://localhost:8000/api/user", { withCredentials: true })
    //         .then(res => setUser(res.data))
    //         .catch(err => {
    //             if (err.response.status === 401) {
    //                 history.push('/login');
    //             }
    //         });

    // }



    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => history.push('/admi'))
            .catch(err => console.log(err));
    }

    const StatusChange = ({ target }) => {

        setStatusCh([target.id == "status1", target.id == "status2", target.id == "status3"]);
    
    }




const updateQuestion = e => {
    e.preventDefault();
    // console.log(status,'status');

    let data = {
        _id: id,
        question,
        option1,
        option2,
        option3,
        status1: statusCh[0],
        status2: statusCh[1],
        status3: statusCh[2],
        quiz
        
    }
    console.log(data);


    axios.put('http://localhost:8000/api/question/update/'+id,
        data
        , { withCredentials: true })
        .then(res => {console.log(res.data);
            setEdit(false);
            reloadQuizData(id);
            // history.go(0);


        })
        .catch(err => {
            setErrorQuestion(err.response.data.errors)

        }); //setErrorQuestion(err.response.data.errors)
}

const CancelUpdate= () => {
    setQuestion("");
    setEdit(false);

}


return (
        <div>

                        <h2 className="">Edita tu Pregunta</h2>
                        <form onSubmit={updateQuestion} className="my-3" >
                            <div id="question">
                                <div className="form-group">
                                    <label htmlFor="Question">Haz tu Pregunta</label>
                                    {/* <input type="hidden" value={id} name="id"/> */}

                                    <input type="text" name="Question" id="Question" className="form-control" value={question} onChange={e => setQuestion(e.target.value)} />
                                    {errorQuestion.question ? <span className="text-danger">{errorQuestion.question.message}</span> : null}
                                </div>
                                <p>Opciones</p>
                                <div className=" form-group mx-1 row text-center">


                                    <input type="text" name="option1" id="option1" className="form-control col-11 my-2 " 
                                    value={option1} onChange={e => setOption1(e.target.value)} /> 
                                    <input className="form-control col-1  my-3" id="status1" type="radio" name="status" 
                                    value={status1} onChange={StatusChange} defaultChecked={status1} />
                                    {errorQuestion.option1 ? <span className="text-danger">{errorQuestion.option1.message}</span> : null}

                                    <input type="text" name="option2" id="option2" className="form-control col-11 my-2 " 
                                    value={option2} onChange={e => setOption2(e.target.value)} />
                                    <input className="form-control col-1  my-3" id="status2" type="radio" name="status" 
                                    value={status2} onChange={StatusChange} defaultChecked={status2} />
                                    {errorQuestion.option2 ? <span className="text-danger">{errorQuestion.option2.message}</span> : null}

                                    <input type="text" name="option3" id="option3" className="form-control col-11 my-2 " 
                                    value={option3} onChange={e => setOption3(e.target.value)} />
                                    <input className="form-control col-1  my-3" id="status3" type="radio" name="status" 
                                    value={status3} onChange={StatusChange} defaultChecked={status3}/>
                                    {errorQuestion.option3 ? <span className="text-danger">{errorQuestion.option3.message}</span> : null}

                                </div>
                                {errorQuestion.status ? <span className="text-danger">{errorQuestion.status.message}</span> : null}
                            </div>

                            <input type="submit" value="Guardar" className="btn btn-primary" />
                            <button className="btn btn-danger mx-5" onClick={() => CancelUpdate()} >Cancelar</button>
                        </form>


    </div>

)

}


export default Editq;
