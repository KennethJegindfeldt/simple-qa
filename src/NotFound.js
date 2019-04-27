import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Recipe extends Component {

    render() {
        return (
            <div>
                <h2>404 Not Found // Siden blev ikke fundet </h2>
                <p>Den valgte side blev desværre ikke fundet </p>

                <Link to={'/'}>Gå tilbage til forsiden...</Link>
            </div>
        );
    }
}

export default Recipe;
