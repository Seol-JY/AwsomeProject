import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { setCorrectchr } from '../redux/correct/actions'
import {setWrongchr} from '../redux/wrong/actions'
import getFilecontents from '../filecontents'


function Text(props) {
    //const colormap = file.colormap
    const [textSplit, setTextSplit] = useState([]);
    const [themeColor, setThemeColor] = useState("");
    let wrong = 0, correct = 0;
    const user  = props.userInput;
    const userSplit = user.split(''); 
    
    useEffect(()=>{
        setTextSplit(getFilecontents(props.file).content);
    },[props.file]);

    useEffect(()=>{
        const len = textSplit.length;
        props.setFileLength(len);
    },[textSplit])

    useEffect(()=>{
        if(props.daynight%2===1) setThemeColor("#585858");
        else setThemeColor("#BEBEBE");
    }, [props.daynight])

    useEffect(() => {
        props.setCorrectchr(correct);
        props.setWrongchr(wrong);
    })

    return (   
        <div className="textdisplay">
            {
                textSplit.map((s,i) => {
                    let color;  
                    let colortxt;

                    if (i < user.length) {  
                        if (s === userSplit[i]) {   //correct
                            color = '';
                            colortxt = themeColor;
                            correct++;
                        } else {                    //wrong
                            color = '#ff5c5c';
                            colortxt = "white";
                            wrong++;
                        }
                    }
                    return (<pre key={i} style={{display: "inline", backgroundColor: color, color: colortxt}}>{user.length===i?<div className="cursor">_</div>:""}{s}</pre>);
                })

            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        Correctchr: state.correct.Correctchr,
        Wrongchr: state.wrong.Wrongchr,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCorrectchr: (cor)=>dispatch(setCorrectchr(cor)),
        setWrongchr: (wr)=>dispatch(setWrongchr(wr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Text)
