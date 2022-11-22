import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import CreateQuestions from "./questions";


const CreateQuiz = () => {

    //Para Formulario Quiz

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [scoreToWin, setScoreToWin] = useState("");
    const [questions, setQuestions] = useState([""]);
    let a = 0;



    const [errorQuiz, setErrorQuiz] = useState({});

    const history = useHistory();

    const newQuiz = e => {
        e.preventDefault();

        let data ={
            name,
            type,
            scoreToWin
        }
        console.log(data);

        
        axios.post('http://localhost:8000/api/quiz/save',{
            name,
            type,
            scoreToWin,
        }, {withCredentials: true})
            .then(res => history.push('/'))
            .catch(err => setErrorQuiz(err.response.data.errors)); //setErrorQerrorQuiz(err.response.data.errors)
    }

    // const agreeQuestion = () => {

    //         a++;
    //         var div = document.createElement('div');
    //         div.setAttribute('classNAme', 'form-inline');
    //             div.innerHTML = '<div style="clear:both" class="cancion_'+a+' col-md-offset-1 col-md-6"><input class="form-control" name="cancion_'+a+'" type="text"/></div><div class="cancion_'+a+' col-md-2""><input class="form-control" name="duracion_'+a+'" type="text"/></div>';
    //             document.getElementById('morequestions').appendChild(div);document.getElementById('morequestions').appendChild(div);
    

    // }





    return (
        <div className="row  mx-5 masterbck">
            <div className="col-12 my-3 ">
                <h2 className="">Nuevo Examen</h2>
                <form onSubmit={newQuiz} className="my-3" >
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input  type="text" name="name" id="name" className="form-control" 
                        value={name} onChange={e=> setName(e.target.value)}  />

                        {errorQuiz.name ? <span className="text-danger">{errorQuiz.name.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Materia</label>
                        <input type="text" name="type" id="type" className="form-control" value={type} onChange={e=> setType(e.target.value)}  />
                        {errorQuiz.type ? <span className="text-danger">{errorQuiz.type.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="scoreToWin">Puntaje Minimo </label>
                        <input type="number" name="scoreToWin" id="scoreToWin" className="form-control" value={scoreToWin} onChange={e=> setScoreToWin(e.target.value)}  />
                        {errorQuiz.scoreToWin ? <span className="text-danger">{errorQuiz.scoreToWin.message}</span> : null}
                    </div>
                    
                    <input type="submit" value="Guardar" className="btn btn-primary" />
                </form>
                
            </div>
            {/* <div className="col-7">
            <CreateQuestions ></CreateQuestions>

            </div>
             */}
            

        </div>
    )

}

export default CreateQuiz;
