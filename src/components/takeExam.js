import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams} from "react-router-dom";

import f from './img/FONDO QUIZ.jpg'
import ninja from './img/PATADA.gif'
import evil from './img/PATADA-MALO.gif'
import mano from './img/mano.gif'
import lanza from './img/shuriken.gif'



const PlayerExam = () => {

    const{id} = useParams();
    const [quiz, setQuiz] = useState([]);
    const[questions, setquestions]= useState([]);
    const [status, setStatus] = useState([false, false, false]);

    const ITEMS_BY_PAGE = 1;
    const [ itemsFrom, setItemsFrom ] = useState(0);
    const [ itemsTo, setItemsTo ] = useState(ITEMS_BY_PAGE);


    //gifs
    const[Figth, setFigth]= useState(false);
    const[Shuriken, setShuriken]= useState(false);


    const [errorQuiz, setErrorQuiz] = useState({});


    const history = useHistory()

    console.log(id);
    console.log(questions);



    useEffect(() => {
        axios.get("http://localhost:8000/api/Quiz/" +id, { withCredentials: true })
            .then(res => {
                setQuiz(res.data);
                setquestions(res.data.questions);

            })
            .catch(err => {
                if (err.response.status === 401) {

                    // setErrorId("Debes introducir un codigo invalido");
                }
            });
    }, [])

    const gifs = (value) =>{



        if(itemsFrom  + ITEMS_BY_PAGE< questions.length)
        {
            console.log(itemsTo);
            console.log(questions.length);
            if(itemsTo == questions.length){
                setFigth(true);
            
            }
        }   
        // logIndexItems();
    }


    const nextPage = () =>{
        if(itemsFrom  + ITEMS_BY_PAGE< questions.length)
        {
            setItemsFrom(itemsFrom + ITEMS_BY_PAGE);
            setItemsTo(itemsTo +ITEMS_BY_PAGE);
            gifs();

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


    const StatusCheck =(value,id2)=>{
        console.log('este es el chekbox',value);
        let objeto = document.getElementById(id2);
        if(value == true){
            // console.log(objeto.className += ' 8');
            objeto.classList.add("tachar");
            setShuriken(true);

            console.log('ESTE SE TACHO',objeto);

        }else{
            objeto.classList.remove("tachar");
            setShuriken(false);
            // console.log(objeto);
        }
    }







    const cerrarSesion = () => {
        axios.get('http://localhost:8000/api/logout', { withCredentials: true })
            .then(res => history.push('/player'))
            .catch(err => console.log(err));
    }


    return (
        <div className="">
            <Link to="/player/wall" className=" btn btn-danger float-right col-1 m-3 p-1 "> Cancelar </Link>
            <h1>{quiz.name}</h1>



            {
                    questions.slice(itemsFrom, itemsTo).map((element, index) => (<>
                        <h5 key ={index} id={"pquiz"+index} className   >¿{element.question}?</h5>

                        <div className=" form-group mx-5 row ">


                        <input className="form-control col-2  my-3" id="status1" type="checkbox" name="status1" value={status[0]}  onChange={(e)=> StatusCheck(e.target.checked,index)} />
                        <h5 className="col-10 my-2 "   id={index}>{element.option1}</h5>

    
                        <input className="form-control col-2  my-3" id="status2"  type="checkbox" name="status" value={status[1]}  onChange={(e)=> StatusCheck(e.target.checked,index+1)} />
                        <h5 className="col-10 my-2 "  id={index+1}>{element.option2}</h5>        

                        <input className="form-control col-2  my-3" id="status3"  type="checkbox"name="status" value={status[2]} onChange={(e)=> StatusCheck(e.target.checked,index+2)} />
                        <h5 className="col-10 my-2 " id={index+2}>{element.option3}</h5>        

                        </div>


                        </>
                    ))
                    }
                                        <button
                        className="btn btn-primary my-4"
                        onClick={prevPage}
                    >
                        Atras
                    </button>
                    &nbsp;
                    <button
                        className="btn btn-primary my-4"
                        onClick={nextPage}
                    >
                        Siguiente
                    </button>


                    <img src={f} className="back"   alt="master"   />

                    {Shuriken ? <img src={lanza} className="lanza"   width="200px"  alt="master"   />:
                        <img src={mano} className="mano" width="200px"  alt="master"   />

                    }
                    {Figth? <>
                        <img src={ninja} className="ninja" width="200px"  alt="master"   />
                        <img src={evil} className="evil" width="200px"  alt="master"   />
                    </>: null
                    
                }
            {/* <Nigth>
                <div>
                <img src={master} className="" width="200px"  alt="master"   />
                </div>
            </Nigth> */}






        </div>

    )

}


export default PlayerExam;