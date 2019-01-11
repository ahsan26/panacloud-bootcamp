import React from "react";
import List from "../Components/list";
import Indicator from "../Components/Indicator";
import UserNameTakerForm from "../Components/userNameTakerForm";

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usrName: '',
            users: [],
            hideGamesPlayed: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveUserName = this.saveUserName.bind(this);
        this.changeGamesPlayedView = this.changeGamesPlayedView.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    saveUserName(e) {
        e.preventDefault();
        this.setState((oldState) => ({
            users: [...oldState.users, { name: this.state.usrName, gamesPlayed: 0 }],
            usrName: ''
        }));
    }
    changeGamesPlayedView() {
        this.setState((oldState => ({
            hideGamesPlayed: !oldState.hideGamesPlayed
        })));
    }
    render() {
        return (
            <div>
                <Indicator
                    txt="Name Game"
                    center
                />
                <UserNameTakerForm
                    saveUserName={this.saveUserName}
                    handleChange={this.handleChange}
                    usrName={this.state.usrName}
                />
                <button onClick={this.changeGamesPlayedView}>
                    {
                        !this.state.hideGamesPlayed
                            ?
                            "Hide Played Games"
                            :
                            "Show Played Games"
                    }
                </button>
                <List
                    data={this.state.users}
                    hideGamesPlayed={this.state.hideGamesPlayed}
                />
            </div>
        );
    }
}