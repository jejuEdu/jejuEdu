import { useRef } from "react";
import styled from "styled-components";

const Input = (props) => {
    const inputRef = useRef();
    return (
        <InputContainer style={props?.style}>
            <label>{props?.label}</label>
            <input
                type={props.password ? "password":"text"}
                name={props?.name}
                placeholder={props?.placeholder}
                ref={inputRef}
                maxLength={props.maxLength}
                value={props.value}
                onChange={(e)=>props.setValue(e.target.value)}
            />
            <p style={{color:descMappingColor(props?.desc?.type)}}>{props?.desc?.text}</p>
        </InputContainer>
    );
};

const InputWithBtn = (props) => {
    const inputRef = useRef();

    return (
        <InputWithBtnContainer style={props?.style}>
            <label>{props?.label}</label>
            <div>
                <input
                    className="input"
                    name={props?.name}
                    placeholder={props?.placeholder}
                    ref={inputRef}
                    value={props.value}
                    onChange={(e)=>props.setValue(e.target.value)}
                />
                <input
                    className="btn-sm"
                    type="button"
                    onClick={props.onClick}
                    value={props.btnTitle}
                />
            </div>
            <p style={{color:descMappingColor(props?.desc?.type)}}>{props?.desc?.text}</p>
        </InputWithBtnContainer>
    );
};

const Checkbox = (props) => {
    return (
        <CheckboxContainer style={props.style}>
            <CustomCheckbox>
                <input type="checkbox" checked={props.value} readOnly/>
                <span className="checkmark" onClick={()=>props.setValue(!props.value)}></span>
            </CustomCheckbox>
            <label dangerouslySetInnerHTML={{__html:props?.label}} />
        </CheckboxContainer>
    );
};

const Button = (props) => {
    return (
        <CustomButton style={props.style} marginTop={props.marginTop} disabled={props.disabled}>{props?.text}</CustomButton>
    );
};

const descMappingColor = (type) => {
    let color = "black";
    switch (type) {
        case "DEFAULT" :
            color="light-gray";
            break;
        case "WARN" :
            color="red";
            break;
        case "SUCCESS" :
            color="green";
            break;
    }
    return color;
};

const InputWithBtnContainer = styled.div`
    
    div {
        display: flex;
        flex-direction: row;
        margin-top:7px;
        height: 42px;
    }

    label {
        margin-left:11px;
        margin-bottom:10px;
        /* font-weight:bold; */
    }

    .input {
        padding-left:11px;
        border-radius: 21px;
        border: none;
        flex:1;
        margin-right: 5px;
    }

    .btn-sm {
        border-radius: 21px;
        width: 80px;
        float:right;
        background:black;
        color:white;
        border: none;
    }

    p {
        padding-left:11px;
        color:#8E8E8E;
        font-size:12px;
        margin-top:9px;
    }
`

const InputContainer = styled.div`
    label {
        margin-left:11px;
        margin-bottom:10px;
        /* font-weight:bold; */
    }
    input {
        padding-left:11px;
        margin-top:7px;
        width: 100%;
        height: 42px;
        border-radius: 21px;
        border: none;
    }
    p {
        padding-left:11px;
        color:#8E8E8E;
        font-size:12px;
        margin-top:9px;
    }  
`;

const CheckboxContainer = styled.div`
    display:flex;
    label {
        margin-left:20px;
    }
`;

const CustomButton = styled.button`
    ${props => props.style}
    width: 100%;
    height: 36px;
    border-radius: 25px;
    border: 1px solid ${props=> `${props.disabled ? 'lightgray' : '#e47b00'}`};
    color: ${props=> `${props.disabled ? 'lightgray' : '#e47b00'}`};
    margin-top: ${props=> `${props.marginTop}`};
`;

const CustomCheckbox = styled.div`
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 30px;
        width: 30px;
        background-color: white;
        border-radius:50%;
    }

    /* When the checkbox is checked, add a blue background */
        input:checked ~ .checkmark {
        background-color: #2196F3;
    }
      
    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }
      
    /* Show the checkmark when checked */
    input:checked ~ .checkmark:after {
        display: block;
    }
      
    /* Style the checkmark/indicator */
    .checkmark:after {
        left: 12px;
        top: 5px;
        width: 5px;
        height: 12px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
`


export {Input, InputWithBtn, Checkbox, Button, InputWithBtnContainer};