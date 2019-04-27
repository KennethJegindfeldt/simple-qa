import React, {Component} from 'react';

class NewQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            questions: "",
            input: "",
            answers: this.props.answers,
        };

        this.onChange = this.onChange.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }

    onChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    onChangeQuestion(event) {
        this.setState({
            questions: event.target.value
        });
    }


    handleInput(event) {
        this.props.addQuestion(this.state.name, this.state.questions);
    }


    render() {
        return (
            <div className="front-new-question-box">
                <form>
                    <label>Dit navn:</label>
                    <br />
                    <input type="text" onChange={this.onChangeName} className="form-control" id="name" placeholder="Dit navn"></input>
                    <br /><br />
                    <label>Dit spørgsmål</label>
                    <textarea onChange={this.onChangeQuestion} className="form-control" id="question" placeholder="Stil dit spørgsmål her"></textarea> 

                    <button onClick={this.handleInput}
                            type="submit" id="submitButton"> Tilføj et spørgsmål
                    </button>
                    <p className="message text-danger">{this.state.message}</p>   
                </form>
            </div>
        );
    }
}
export default NewQuestion;
