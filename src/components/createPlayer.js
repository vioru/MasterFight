import React, {useState} from "react";
import axios from "axios";
import {useHistory, Link} from "react-router-dom";

import male from './img/male.png'
import female from './img/female.png'
import they from './img/they.png'

const CreatePlayer = () => {

    //Para Formulario de Registro

    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Avatar, setAvatar] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const Gender = ["male","female","they"];

    //Para Formulario de Inicio de Sesión
    const [emailLogin, setEmailLogin] = useState("");
    const [passwordLogin, setPasswordLogin] = useState("");

    const [errorRegistro, setErrorRegistro] = useState({});

    const [errorLogin, setErrorLogin] = useState("");

    const history = useHistory();



    const newPlayer = e => {
        e.preventDefault();

        let data ={
            Name,
            Email,
            Avatar,
            Password,
            ConfirmPassword
        }
        console.log(data);

        
        axios.post('http://localhost:8000/api/registerPlayer',{
            Name,
            Email,
            Avatar,
            Password,
            ConfirmPassword
        }
        , {withCredentials: true}
        )
            .then(res => history.push('/'))
            .catch(err => setErrorRegistro(err.response.data.errors)); //setErrorRegistro(err.response.data.errors)
    }

    const login = e => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/loginPlayer', {
            email: emailLogin,
            password: passwordLogin
        }, {withCredentials: true})
            .then(res => {
                if(res.data.error) {
                    setErrorLogin(res.data.message);
                } else {
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    }




    return (
        <div className="container mx-5 ">
            <Link to="/" className="  btn btn-success  my-5 "> Atras </Link>
            <div className="row">
                <div className="col-6 my-3 ">
                    <h2 className="">Registro</h2>
                    <form onSubmit={newPlayer} className="my-3" >
                        <div className="form-group">
                            <label htmlFor="Name">Usuario</label>
                            <input  type="text" 
                                    name="Name" 
                                    id="Name" 
                                    className="form-control" 
                                    value={Name} 
                                    onChange={e=> setName(e.target.value)}  />
                            {errorRegistro.Name ? <span className="text-danger">{errorRegistro.Name.message}</span> : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email">E-mail</label>
                            <input type="Email" name="Email" id="Email" className="form-control" value={Email} onChange={e=> setEmail(e.target.value)}  />
                            {errorRegistro.Email ? <span className="text-danger">{errorRegistro.Email.message}</span> : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input type="Password" name="Password" id="Password" className="form-control" value={Password} onChange={e=> setPassword(e.target.value)}  />
                            {errorRegistro.Password ? <span className="text-danger">{errorRegistro.Password.message}</span> : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="ConfirmPassword">Confirmación</label>
                            <input type="password" name="ConfirmPassword" id="ConfirmPassword" className="form-control" value={ConfirmPassword} onChange={e=> setConfirmPassword(e.target.value)}  />
                            {errorRegistro.ConfirmPassword ? <span className="text-danger">{errorRegistro.ConfirmPassword.message}</span> : null}
                        </div>
                        <div className='col-md-6 d-flex '>
                        {Gender.map(elemento =>
                            <>
                            <div className="mx-4">
                                <input  id="Avatar" type="radio" name="Avatar"  value={elemento} onChange={e=>setAvatar(e.target.value)} />
                                <label className="" htmlFor="Avatar" >
                                    <img src= {male} className="img-responsive" alt="avatar" width="80px" />
                                    {/* {`./img/${elemento}.png`}    key={elemento} */}
                                </label>
                            </div>
                            </>
                            )}
                        </div>

                        <input type="submit" value="Registarme" className="btn btn-primary" />
                    </form>
                </div>
                <div className="col-6 my-3">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={login} className="my-3">
                        <div className="form-group">
                            <label htmlFor="emailLogin">Usuario</label>
                            <input type="email" name="emailLogin" id="emailLogin" className="form-control" value={emailLogin} onChange={e=>setEmailLogin(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordLogin">Password</label>
                            <input type="password" name="passwordLogin" id="passwordLogin" className="form-control" value={passwordLogin} onChange={e=>setPasswordLogin(e.target.value)} />
                        </div>
                        <div>
                            {errorLogin !== "" ? <span className="text-danger">{errorLogin}</span> : null }
                        </div>



                        <input type="submit" value="Iniciar Sesión" className="btn btn-info" />
                    </form>
                </div>
            </div>

            <Link to="/admi" className="col-12  btn btn-success my-5">Ser Maestro </Link>
        </div>
    )

}

export default CreatePlayer;
