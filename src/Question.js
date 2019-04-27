import React, {Component} from 'react';
import {Link} from "react-router-dom";
import NewAnswers from "./NewAnswers";
import VoteButton from "./VoteButton";


class Question extends Component {

   
    render() {
        let question = this.props.questions;
        let answerList = [];
        
        console.log(this.props)
        if(!question) return (
        <div>
            Indlæser ...
        </div>)
        question.answers.forEach((elm) => {
            answerList.push(
            <li>
              <p>{elm.answers}</p> 
              <VoteButton answer={elm} id={this.props.match.params.id} />        
            </li>)
        });


        return (
            <div>
            <div class="question-box">
                <h2>{question.name}</h2>
                <p>{question.questions}</p>
                <b><Link to={'/'}>Gå til forsiden</Link></b>
            </div>
     
              <NewAnswers addAnswers={this.props.addAnswers}   id={this.props.match.params.id} />
                   
                    <h2>Svar</h2>
                    <ul class="answer-list">
                        {answerList}
                    </ul>
            </div>
        );
    }
}

export default Question;

