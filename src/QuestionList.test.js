import React from 'react';
import {render, fireEvent} from 'react-testing-library';
import QuestionList from './QuestionList';
import {BrowserRouter as Router} from "react-router-dom";


it('renders App with header text', () => {
    const comp =
        <Router>
            <QuestionList qas={questionsTestData}/>
        </Router>;
    const {getByText} = render(comp);
    expect(getByText('Lars Fadøl')).toBeInTheDocument();

});

