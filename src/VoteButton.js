import React from 'react';

class VoteButton extends React.Component {
    
  state = { 
      count: 0 
    }

    componentDidMount() {
        this.setState({
            count:this.props.answer.votes
        })
    }

    increment = () => {
        this.setState({
            count: this.state.count + 1
        },
        ()=> {
            this.voteOnAnswer()
        }
        );
    }

    decrement = () => {
        this.setState({
            count: this.state.count - 1
        },
        ()=> {
            this.voteOnAnswer()
        }
        );
    }

    voteOnAnswer() {
        let { answer, id } = this.props
        fetch('https://thenewstackoverflow.herokuapp.com/votes/' + id, {
            method: 'post',
            body: JSON.stringify({
               answerId: answer._id,
                count: this.state.count

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

    render() {
        return (
            <div>
                <div class="vote-box">
                <h5>Antal stemmer:</h5>
                    <button onClick={this.increment}>+</button>
                    <button onClick={this.decrement}>-</button>
                    <div class="count-number">{this.state.count}</div>            
                </div>
            </div>
        )
    }
}

export default VoteButton;