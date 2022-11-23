import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import CreateQuiz from "./createQuiz";
import CreateQuestions from "./questions";

const AllQuiz = () => {

    const [quiz, setQuiz] = useState([]);
    const [user, setUser] = useState({});
    
    // console.log(autores);
    

    const history = useHistory()


    useEffect(() => {
        axios.get("http://localhost:8000/api/allQuiz", {withCredentials: true})
            .then(res => setQuiz(res.data))
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




    return (
        <div>
            <h1>Bienvenido</h1>
            <Link to="/" className="  btn btn-success  my-5 "> Atras </Link>
            
            <div className="row"> 
                <div className="col-6">
                <CreateQuiz/>
                </div>

                <div className="col-6">
                    <h1>Tus Examenes</h1>

                </div>
            
            
            
            </div>
      

            
            {/* <Link to="/new" className="btn btn-success">Nuevo Autor</Link>
            <button className="btn btn-danger float-right" onClick={cerrarSesion}>Cerrar Sesión</button>
            
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Imagen</th>
                        <th>Frase celebre</th>
                        <th>Libros</th>
                        <th>Cuentos</th>
                        <th>Artículos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        autores.map((autor, index) => (
                            <tr key={index}>
                                <td>{autor.nombre}</td>
                                <td>
                                    <img src={autor.imagen} alt="autor" className="img-fluid"  width="200px"/>
                                </td>
                                <td>{autor.cita}</td>
                                <td>
                                    {
                                        autor.libros ? <span className="bi bi-check text-success"></span> : <span className="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                    {
                                        autor.cuentos ? <span className="bi bi-check text-success"></span> : <span className="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                    {
                                        autor.articulos ? <span className="bi bi-check text-success"></span> : <span className="bi bi-x text-danger"></span>
                                    }
                                </td>
                                <td>
                                <Link className="btn btn-warning" to={`/edit/${autor._id}`}>Editar</Link>
                                <button className="btn btn-danger" onClick={()=>DeleteAutor(autor._id)} >Eliminar</button>


                                </td>

                            </tr>

                        ))
                    }
                </tbody>

            </table> */}

        </div>

    )

}


export default AllQuiz;
