import React, { useState ,useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import CreateQuestions from "./questions";


const CreateQuiz = () => {

    //Para Formulario Quiz

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [scoreToWin, setScoreToWin] = useState("");
    const [Question, setQuestion] = useState([""]);

    const [inputValues, setInputValues] = useState({})
    // const [Options0, setOptions0] = useState("");
    // const [Options1, setOptions1] = useState("");
    // const [Options2, setOptions2] = useState("");
    const [status, setStatus] = useState(false);
    let numberQuestion = 0;
    let numberOption = 0;



    const handleChange = ({ target }) => {
        setInputValues({
            ...inputValues,
            [target.id]: target.value
        });
        console.log(inputValues, 'los values');
    }


    const [errorQuiz, setErrorQuiz] = useState({});

    const history = useHistory();

    useEffect(() => {

            console.log("recargo");


    }, [])

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
            .then(res => history.go(0))
            .catch(err => setErrorQuiz(err.response.data.errors)); 
    }


    const agreeQuestion = () => {

        numberQuestion++;
        var div = document.createElement('div');
        div.setAttribute('classNAme', 'form-inline');




        div.innerHTML = `
                <label htmlFor="Question'${numberQuestion}'">Haz tu Pregunta</label>
                <input Question="text" name="Question" id="Question'${numberQuestion}'" className="form-control" 
                value="'${Question}'" onChange={e => setQuestion(e.target.value)} />`;
        // '<div style="clear:both" class="cancion_'+a+' col-md-offset-1 col-md-6"><input class="form-control" name="cancion_'+a+'" type="text"/></div><div class="cancion_'+a+' col-md-2""><input class="form-control" name="duracion_'+a+'" type="text"/></div>'
        document.getElementById('morequestions').appendChild(div); document.getElementById('morequestions').appendChild(div);


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


{/* 
                                <div id="morequestions">

                                </div> */}


                                {/* <div className="row my-5">
                                    <button className="col-1 btn btn-success" onClick={agreeQuestion}>+</button>
                                    <p className="col-5">Agregar mas preguntas</p>



                                </div> */}

                    <input type="submit" value="Guardar" className="btn btn-primary" />
                </form>

            </div>


        </div>
    )

}

export default CreateQuiz;
