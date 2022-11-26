
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


const CreateQuestions = ({ id }) => {


    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState("");
    const [status, setStatus] = useState([false, false, false]);
    let a = 0;




    const [errorQuestion, setErrorQuestion] = useState({});

    const history = useHistory();

    const OptionsChange = ({ target }) => {
        setOptions({
            ...options,
            [target.id]: target.value
        });
    }

    const StatusChange = ({ target }) => {

        // let prueba = true 
        // if(target.id == "status1" ){

        //     setStatus([true,false,false]);
        // }else if(target.id == "status2" ){

        //     setStatus([false,true,false]);
        // }else if(target.id == "status3" ){

        //     setStatus([false,false,false]);
        // }



        // let status1 = false;
        // let status2=false;
        // let status3=false;
        // if(target.id == "status1" ){
        //     status1=true;
        // }else if(target.id == "status2" ){
        //     status2=true;
        // }else if(target.id == "status3" ){
        //     status3=true;
        // }
        // setStatus([status1,status2,status3]);

        setStatus([target.id == "status1", target.id == "status2", 
        target.id == "status3"]);


        // if(target.id == "status1" ){
        //     setStatus[0](prueba);
        // }else if(target.id == "status2" ){
        //     setStatus[1](prueba);
        // }else if(target.id == "status3" ){
        //     setStatus[2](prueba);
        // }


        // setStatus();
        // setStatus({

        //     ...status,
        //     [target.id]: target.value =='on'?true:false
        // });
        // console.log(status, 'los values');
    }


    const newQuestion = e => {
        e.preventDefault();
        console.log('status');

        let data = {
            question,
            option1: options.option1,
            option2: options.option2,
            option3: options.option3,
            status1: status[0],
            status2: status[1],
            status3: status[2],
            quiz: id
        }
        console.log(data);


        axios.post('http://localhost:8000/api/question/save',
        data
        , { withCredentials: true })
            .then(res => {
                console.log("aqui post");
                setOptions("");
                setStatus([false, false, false]);
                setQuestion("");
                let idQuestion = res.data._id;

                axios.put('http://localhost:8000/api/quiz/update/' + id, {
                    questions: idQuestion
                }, { withCredentials: true })
                .then(res => {
                    console.log("aqui update");
        
                })

                
            })
            .catch(err => setErrorQuestion(err.response.data.errors)); 
    }

    // const agreeQuestion = () => {

    //         a++;
    //         var div = document.createElement('div');
    //         div.setAttribute('classNAme', 'form-inline');
    //             div.innerHTML = '<div style="clear:both" class="cancion_'+a+' col-md-offset-1 col-md-6"><input class="form-control" name="cancion_'+a+'" type="text"/></div><div class="cancion_'+a+' col-md-2""><input class="form-control" name="duracion_'+a+'" type="text"/></div>';
    //             document.getElementById('morequestions').appendChild(div);document.getElementById('morequestions').appendChild(div);


    // }





    return (
        <div className="row container mx-5 masterbck">
            <div className="col-10 my-3 ">
                <h2 className="">Preguntas</h2>
                <form onSubmit={newQuestion} className="my-3" >
                    <div id="question">
                        <div className="form-group">
                            <label htmlFor="Question">Haz tu Pregunta</label>
                            {/* <input type="hidden" value={id} name="id"/> */}

                            <input type="text" name="Question" id="Question" className="form-control" value={question} onChange={e => setQuestion(e.target.value)} />
                            {errorQuestion.Question ? <span className="text-danger">{errorQuestion.Question.message}</span> : null}
                        </div>
                        <p>Opciones</p>
                        <div className=" form-group mx-1 row text-center">


                            <input type="text" name="option1" id="option1" className="form-control col-11 my-2 " onChange={OptionsChange} />
                            <input className="form-control col-1  my-3" id="status1" type="radio" name="status" onChange={StatusChange} />


                            <input type="text" name="option2" id="option2" className="form-control col-11 my-2 " onChange={OptionsChange} />
                            <input className="form-control col-1  my-3" id="status2" type="radio" name="status" onChange={StatusChange} />

                            <input type="text" name="option3" id="option3" className="form-control col-11 my-2 " onChange={OptionsChange} />
                            <input className="form-control col-1  my-3" id="status3" type="radio" name="status" onChange={StatusChange} />


                        </div>
                        {status === [false, false, false] ? <span className="text-danger">debes escoger la respuesta correcta</span> : null}

                        <div id="morequestions">

                        </div>

                    </div>
                    {/* <div className="row my-5">
<button className="col-1 btn btn-success" onClick={agreeQuestion}>+</button>
<p  className="col-5">Agregar mas preguntas</p>



</div>    */}


                    <input type="submit" value="Guardar" className="btn btn-primary" />
                </form>
            </div>

            {/* <div className=" form-group mx-1 row text-center">
                        <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={Options0} onChange={e => setOptions0(e.target.value)} />
                        <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" onChange={e => setStatus(e.target.value)} />


                        <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={Options1} onChange={e => setOptions1(e.target.value, 1)} />
                        <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" />

                        <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={Options2} onChange={e => setOptions2(e.target.value, 2)} />
                        <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" />

                    </div> */}

            {/*                <div className="form-group">
                        <label htmlFor="Question">Haz tu Pregunta</label>
                        <input Question="text" name="Question" id="Question" className="form-control" value={Question} onChange={e => setQuestion(e.target.value)} />
                        {errorQuiz.Question ? <span className="text-danger">{errorQuiz.Question.message}</span> : null}
                        <p>Opciones</p>
                        <div className=" form-group mx-1 row text-center">
                            <input type="text" name="Options" id="Option0" className="form-control col-11 my-2 " onChange={handleChange} />
                            <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" onChange={e => setStatus(e.target.value)} />


                            <input type="text" name="Options" id="Option1" className="form-control col-11 my-2 " onChange={handleChange} />
                            <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" />

                            {/* <input type="text" name="Options" id="Option2" className="form-control col-11 my-2 " value={Options2} onChange={e => setOptions2(e.target.value, 2)} /> 
                            <input className="form-control col-1  my-3" id="status" type="radio" name="status" value="" />

                        </div>

                    </div> */}

            {/* {Answers.map(elemento =>(<>
                    <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={options} onChange={e=> setOptions(e.target.value)}  />
                    <input  className="form-control col-1  my-3" id="status" type="radio" name="status"  value=""  onChange={e=> setStatus(e.target.value)} /> 
                    </>       
        )

        )
        } */}
            {/* 
    <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={Options0} onChange={e=> setOptions0(e.target.value)}  />
    <input  className="form-control col-1  my-3" id="status" type="radio" name="status"  value=""  onChange={e=> setStatus(e.target.value)} /> 
    

    <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={Options1} onChange={e=> setOptions1(e.target.value,1)}  />
    <input  className="form-control col-1  my-3" id="status" type="radio" name="status"  value=""  />

    <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={Options2} onChange={e=> setOptions2(e.target.value,2)}  />
    <input  className="form-control col-1  my-3" id="status" type="radio" name="status"  value=""  />

    <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={Options3} onChange={e=> setOptions3(e.target.value,3)}  />
    <input  className="form-control col-1  my-3" id="status" type="radio" name="status"  value=""  />
     */}


        </div>
    )

}

export default CreateQuestions;



