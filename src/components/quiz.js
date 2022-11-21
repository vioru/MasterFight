import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";


const CreateQuiz = () => {

    //Para Formulario Quiz

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [scoreToWin, setScoreToWin] = useState("");
    const [questions, setQuestions] = useState([""]);



    const [errorRegistro, setErrorRegistro] = useState({});

    const history = useHistory();

    const newPlayer = e => {
        e.preventDefault();

        let data ={
            name,
            type,
            scoreToWin,
            questions
        }
        console.log(data);

        
        // axios.post('http://localhost:8000/api/registerP',{
        //     name,
        //     type,
        //     scoreToWin,
        //     questions
        // }, {withCredentials: true})
        //     .then(res => history.push('/'))
        //     .catch(err => console.log(err)); //setErrorRegistro(err.response.data.errors)
    }






    return (
        <div className="row container mx-5 masterbck">
            <div className="col-6 my-3 ">
                <h2 className="">Registro</h2>
                <form onSubmit={newPlayer} className="my-3" >
                    <div className="form-group">
                        <label htmlFor="name">Usuario</label>
                        <input  type="text" name="name" id="name" className="form-control" 
                        value={name} onChange={e=> setName(e.target.value)}  />

                        {errorRegistro.name ? <span className="text-danger">{errorRegistro.name.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="type">Materia</label>
                        <input type="text" name="type" id="type" className="form-control" value={type} onChange={e=> settype(e.target.value)}  />
                        {errorRegistro.type ? <span className="text-danger">{errorRegistro.type.message}</span> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="scoreToWin">Puntaje Minimo para ganar</label>
                        <input type="number" name="scoreToWin" id="scoreToWin" className="form-control" value={scoreToWin} onChange={e=> setScoreToWin(e.target.value)}  />
                        {errorRegistro.scoreToWin ? <span className="text-danger">{errorRegistro.scoreToWin.message}</span> : null}
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="ConfirmPassword">Confirmación</label>
                        <input type="password" name="ConfirmPassword" id="ConfirmPassword" className="form-control" value={ConfirmPassword} onChange={e=> setConfirmPassword(e.target.value)}  />
                        {errorRegistro.ConfirmPassword ? <span className="text-danger">{errorRegistro.ConfirmPassword.message}</span> : null}
                    </div> */}


                    <input type="submit" value="Registarme" className="btn btn-primary" />
                </form>
            </div>

        </div>
    )

}

export default CreateQuiz;
