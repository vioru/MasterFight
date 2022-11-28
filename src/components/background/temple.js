
import templo from "../img/fondo intro.jpg"
import mastergif from '../img/maestrointro.gif'
import aprendiz from '../img/male.gif'




const TempleIntro = () => {







    return (
        <div className="">

                            
                <img src={templo} className="img-fluid col-12   " width="1300px" alt="templo" />

                <img src={mastergif} className="img-fluid col-12 masterintro" width="50px" alt="master" />

                <img src={aprendiz} className="img-fluid col-12 aprendiz" width="50px" alt="aprendiz" />







        </div>

    )

}


export default TempleIntro;