
import React, {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";


const CreateQuestions = () => {

    //Para Formulario Quiz
    
    const [Question, setQuestion] = useState("");

    const [Options0, setOptions0] = useState("");
    const [Options1, setOptions1] = useState("");
    const [Options2, setOptions2] = useState("");
    const [Options3, setOptions3] = useState("");
    const [options, setOptions] = useState(["","","",""]);
    const [status, setStatus] = useState(false);
    const Answers = ["","","",""];
    // let opciones =[Options0,Options1,Options2,Options3];
    let a = 0;



    const [errorRegistro, setErrorRegistro] = useState({});

    const history = useHistory();

    const newPlayer = e => {
        e.preventDefault();


        // console.log(opciones);

        // setOptions=(opciones);

        

        let data ={
            options,
            status
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
                <form onSubmit={newPlayer} className="my-3" >
                <div id="question">
<div className="form-group">
    <label htmlFor="Question">Haz tu Pregunta</label>
    <input Question="text" name="Question" id="Question" className="form-control" value={Question} onChange={e=> setQuestion(e.target.value)}  />
        {errorRegistro.Question ? <span className="text-danger">{errorRegistro.Question.message}</span> : null} 
</div>
<p>Opciones</p>
<div className=" form-group mx-1 row text-center">
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




    <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={options[0]} onChange={e=> setOptions[0](e.target.value)}  />
    <input  className="form-control col-1  my-3" id="status" type="radio" name="status"  value=""  onChange={e=> setStatus(e.target.value)} /> 
    

    <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={options[1]} onChange={e=> setOptions[1](e.target.value,1)}  />
    <input  className="form-control col-1  my-3" id="status" type="radio" name="status"  value=""  />

    <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={options[2]} onChange={e=> setOptions[2](e.target.value,2)}  />
    <input  className="form-control col-1  my-3" id="status" type="radio" name="status"  value=""  />

    <input type="text" name="Options" id="Options" className="form-control col-11 my-2 " value={options[3]} onChange={e=> setOptions[3](e.target.value,3)}  />
    <input  className="form-control col-1  my-3" id="status" type="radio" name="status"  value=""  />
    
</div>

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

        </div>
    )

}

export default CreateQuestions;



