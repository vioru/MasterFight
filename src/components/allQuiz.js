import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import CreateQuiz from "./createQuiz";

const AllQuiz = () => {

    const [quiz, setQuiz] = useState([]);
    const [user, setUser] = useState({});
    const [ currentPage, setCurrentPage ] = useState(0)
    const [ PageQuiz, setPageQuiz ] = useState('');

    // console.log('soy el quiz '+quiz);
    

    const history = useHistory()


    useEffect(() => {
        axios.get("http://localhost:8000/api/allQuiz", {withCredentials: true})
            .then(res => {
            setQuiz(res.data);

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


    const filteredQuiz = () => {

        // return quiz.slice( currentPage, currentPage + 5);

        // // setPageQuiz(quiz);
        // // console.log(PageQuiz);
    }
    const nextPage = () =>

            setCurrentPage( currentPage + 5 );


    const prevPage = () => {
        if ( currentPage > 0 )
            setCurrentPage( currentPage - 5 );
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
                    <button
                        className="btn btn-primary"
                        onClick={prevPage}
                    >
                        Anteriores
                    </button>
                    &nbsp;
                    <button
                        className="btn btn-primary"
                        onClick={nextPage}
                    >
                        Siguientes
                    </button>
                    {
                    quiz.map((element, index) => (<>
                        <h5 key ={index} id={"pquiz"+index}> {element.name}</h5>

                        <button className="btn btn-primary" onClick={()=>AgreeQuestion(element._id)} >ver</button>
                        </>
                    ))
                    }

                </div>
            
            
            
            </div>

            


        </div>

    )

}


export default AllQuiz;
