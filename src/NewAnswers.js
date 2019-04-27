import React, { Component } from 'react';
import Question from "./Question";

 class NewAnswers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            answers: "",
            input: "",

        };

        this.handleInput = this.handleInput.bind(this);
        this.onChangeAnswers = this.onChangeAnswers.bind(this);


    }


    onChangeAnswers(event) {
        this.setState({
            answers: event.target.value
        });
    }

    handleInput(event) {
        this.props.addAnswers(this.state.answers, this.props.id);
        this.setState({
        })
    }
    render() {
        return (

                <div className="front-new-question-box">
                    <form>
                        <div className="form-group">
                            <h2> Tilføj en ny comment</h2>
                            <br />
                            <textarea type="text" id={Question.id} onChange={this.onChangeAnswers} ></textarea>

                            <button onClick={this.handleInput}
                                    type="submit" id="submitButton" className="btn btn-primary"> Tilføj dit svar
                            </button>
                            {this.state.onSucess} 
                        </div>
                    </form>               
                </div>
        )
    }
}

export default NewAnswers;