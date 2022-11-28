import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useHistory} from "react-router-dom";
import CreateQuiz from "./createQuiz";

const AllQuiz = () => {

    const [quiz, setQuiz] = useState([]);
    const [user, setUser] = useState({});
    const ITEMS_BY_PAGE = 5;
    const [ itemsFrom, setItemsFrom ] = useState(0);
    const [ itemsTo, setItemsTo ] = useState(ITEMS_BY_PAGE);

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
            userInSession();
    }, [history])

    const userInSession =()=>{
        axios.get("http://localhost:8000/api/user", {withCredentials: true})
        .then(res => {setUser(res.data);console.log(res.data)})
        .catch(err => {
            if(err.response.status === 401) {
                history.push('/login');
            }
        });

    }

        const AgreeQuestion = (id) => {

            history.push('/thequiz/'+id);
    }



    const nextPage = () =>{
        if(itemsFrom  + ITEMS_BY_PAGE< quiz.length)
        {
            setItemsFrom(itemsFrom + ITEMS_BY_PAGE);
            setItemsTo(itemsTo +ITEMS_BY_PAGE);
        }   
        // logIndexItems();
    }

    const prevPage = () => {
        if ( itemsFrom >= ITEMS_BY_PAGE )
        {
            setItemsFrom(itemsFrom - ITEMS_BY_PAGE);
            setItemsTo(itemsTo-ITEMS_BY_PAGE);            
        }
        // logIndexItems();
    }

    // const logIndexItems=()=>
    // {
    //     console.log("itemsFrom",itemsFrom);
    //     console.log("ItemsTo",itemsTo);
    // }

    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials:true})
            .then(res => history.push('/admi'))
            .catch(err => console.log(err));
    }





    return (
        <div>
            <div className="row">
            <h1 className="col-10">Bienvenido</h1>

            <button className="btn btn-danger float-right my-2" onClick={cerrarSesion}>Cerrar Sesión</button>





            </div>
            
            
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
                    quiz.slice(itemsFrom, itemsTo).map((element, index) => (<>
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
