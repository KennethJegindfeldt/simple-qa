import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import QuestionList from "./QuestionList";
import Question from "./Question";
import NotFound from "./NotFound";
import NewQuestion from "./NewQuestion";
import NewAnswers from "./NewAnswers";



class App extends Component {



    constructor(props) {
        super(props);

        // TODO: Move this data to the server
        this.state = {
            qas: [
            ],

        };

    }


    componentDidMount(){
        fetch('https://thenewstackoverflow.herokuapp.com/express')
            .then(response => return response.json())
            .then(data => this.setState({qas: data}))
            .catch(err => console.error(err))
    }


    addQuestion(name, questions) {
        fetch('https://thenewstackoverflow.herokuapp.com/NewQuestion', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                questions: questions
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new Question");
                console.log(json);
            });
    }



    addAnswers(answers, id) {
        fetch('https://thenewstackoverflow.herokuapp.com/answers' + id, {
            method: 'post',
            body: JSON.stringify({
                answers: answers,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new Answer");
                console.log(json);
            });
    }




    // GET QUESTION FROM ID
    getQuestionFromId(id) {
        console.log()
        return this.state.qas.find((elm) => elm._id === id);
    }

    // GET ANSWERS FROM ID
    getAnswersFromId(id) {
        return this.state.qas.find((elm) => elm._id === id);
    }


    render() {
        return (
            <Router>
                <div className="container">
                    <Switch>
                        <Route exact path={'/'}
                               render={(props) =>
                                <React.Fragment>
                                <NewQuestion {...props} addQuestion={this.addQuestion}></NewQuestion>
                                   <QuestionList {...props}
                                         qas={this.state.qas}/>
                                </React.Fragment>}
                        />

                        <Route exact path={'/question/:id'}
                               render={(props) =>
                                   <Question {...props}
                               questions={this.getQuestionFromId(props.match.params.id) } addAnswers={this.addAnswers}   answers={this.getAnswersFromId(props.match.params.id)} />

                               }
                        />

                        <Route exact path={'/NewAnswers'}
                               render={(props) =>
                                   <NewAnswers {...props}  addAnswers={this.addAnswers}   answers={this.getAnswersFromId(props.match.params.id)} ></NewAnswers>}/>

                        <Route component={NotFound} />
                    </Switch>

                </div>
            </Router>
        );
    }
}

export default App;
