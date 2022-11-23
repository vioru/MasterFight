import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CreateQuestions from "./questions";


const CreateQuiz = () => {

    //Para Formulario Quiz

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [scoreToWin, setScoreToWin] = useState("");
    const [Question, setQuestion] = useState([""]);
    const [Options0, setOptions0] = useState("");
    const [Options1, setOptions1] = useState("");
    const [Options2, setOptions2] = useState("");
    const [status, setStatus] = useState(false);
    let a = 0;



    const [errorQuiz, setErrorQuiz] = useState({});

    const history = useHistory();

    const newQuiz = e => {
        e.preventDefault();
        //guardar las preguntas

        let data = {
            name,
            type,
            scoreToWin

        }
        console.log(data);
        axios.post('http://localhost:8000/api/quiz/save', {
            name,
            type,
            scoreToWin,

        }, { withCredentials: true })
            .then(res => history.push('/'))
            .catch(err => setErrorQuiz(err.response.data.errors)); //setErrorQerrorQuiz(err.response.data.errors)
    }


        const agreeQuestion = () => {

            a++;
            var div = document.createElement('div');
            div.setAttribute('classNAme', 'form-inline');
            <div className="form-group">
                        <label htmlFor="Question">Haz tu Pregunta</label>
                        <input Question="text" name="Question" id="Question" className="form-control" value={Question} onChange={e => setQuestion(e.target.value)} />
                        {errorQuiz.Question ? <span className="text-danger">{errorQuiz.Question.message}</span> : null}
                        <p>Opciones</p>
                        <div className=" form-group mx-1 row text-center">
                                <input type="text" name="Options" id="Option0" className="form-control col-11 my-2 " value={Options0} onChange={e => setOptions0(e.target.value)} />
                                <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" onChange={e => setStatus(e.target.value)} />


                                <input type="text" name="Options" id="Option1" className="form-control col-11 my-2 " value={Options1} onChange={e => setOptions1(e.target.value, 1)} />
                                <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" />

                                <input type="text" name="Options" id="Option2" className="form-control col-11 my-2 " value={Options2} onChange={e => setOptions2(e.target.value, 2)} />
                                <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" />

                        </div> 

                    </div>



                div.innerHTML = `
                <label htmlFor="Question'${a}'">Haz tu Pregunta</label>
                <input Question="text" name="Question" id="Question'${a}'" className="form-control" 
                value="'${Question}'" onChange={e => setQuestion(e.target.value)} />`;
                // '<div style="clear:both" class="cancion_'+a+' col-md-offset-1 col-md-6"><input class="form-control" name="cancion_'+a+'" type="text"/></div><div class="cancion_'+a+' col-md-2""><input class="form-control" name="duracion_'+a+'" type="text"/></div>'
                document.getElementById('morequestions').appendChild(div);document.getElementById('morequestions').appendChild(div);
    

    }


    return (
        <div className="row  mx-5 masterbck">
            <div className="col-12 my-3 ">
                <h2 className="">Nuevo Examen</h2>
                <form onSubmit={newQuiz} className="my-3" >
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" name="name" id="name" className="form-control"
                            value={name} onChange={e => setName(e.target.value)} />

                        {errorQuiz.name ? <span className="text-danger">{errorQuiz.name.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Materia</label>
                        <input type="text" name="type" id="type" className="form-control" value={type} onChange={e => setType(e.target.value)} />
                        {errorQuiz.type ? <span className="text-danger">{errorQuiz.type.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="scoreToWin">Puntaje Minimo </label>
                        <input type="number" name="scoreToWin" id="scoreToWin" className="form-control" value={scoreToWin} onChange={e => setScoreToWin(e.target.value)} />
                        {errorQuiz.scoreToWin ? <span className="text-danger">{errorQuiz.scoreToWin.message}</span> : null}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="Question">Haz tu Pregunta</label>
                        <input Question="text" name="Question" id="Question" className="form-control" value={Question} onChange={e => setQuestion(e.target.value)} />
                        {errorQuiz.Question ? <span className="text-danger">{errorQuiz.Question.message}</span> : null}
                        <p>Opciones</p>
                        <div className=" form-group mx-1 row text-center">
                                <input type="text" name="Options" id="Option0" className="form-control col-11 my-2 " value={Options0} onChange={e => setOptions0(e.target.value)} />
                                <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" onChange={e => setStatus(e.target.value)} />


                                <input type="text" name="Options" id="Option1" className="form-control col-11 my-2 " value={Options1} onChange={e => setOptions1(e.target.value, 1)} />
                                <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" />

                                <input type="text" name="Options" id="Option2" className="form-control col-11 my-2 " value={Options2} onChange={e => setOptions2(e.target.value, 2)} />
                                <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" />

                        </div> 

                    </div>

                    <div id="morequestions">

                    </div>


                    <div className="row my-5">
                        <button className="col-1 btn btn-success" onClick={agreeQuestion}>+</button>
                        <p className="col-5">Agregar mas preguntas</p>



</div> 

                    <input type="submit" value="Guardar" className="btn btn-primary" />
                </form>

            </div>


        </div>
    )

}

export default CreateQuiz;
