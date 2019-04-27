import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class QuestionList extends Component {

    render() {
        let questionList = [];

        this.props.qas.forEach((elm) => {
            questionList.push(
                <div class="front-question-box">
                    <li>
                        <h3>{elm.name}</h3>
                        <p>{elm.questions}</p>
                    <Link to={`/question/${elm._id}`}>Læs mere...</Link>
                    </li>
                </div>)
        });

        return (
            <div>
                <h3>{this.props.header}</h3>
                <ul>
                    {questionList}
                </ul>
            </div>

        );
    }
}

export default QuestionList;
