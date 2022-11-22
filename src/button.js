import "./button.css"

function Button ({onClickFunction, text}) {
    return (
        <div className="btn" onClick={onClickFunction}>
            <p>
                {text}
            </p>
        </div>
    )
}

export default Button