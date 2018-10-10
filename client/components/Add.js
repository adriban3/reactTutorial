import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-Modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');
class Add extends React.Component {
    constructor() {
        super();
    this.state = {
        author: '',
        title: '',
        description: '',
        asset: '',
        date: '',
        messageFromServer: '',
        modalIsOpen: false
    }
this.handlSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handlTextChange = this.handleTextChange.bind(this);
    this.insertNewTicket = this.insertNewTicket.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    }
openModal() {
    this.setState({
        modalIsOpen: true
    });
    }
closeModal() {
    this.setState({
        modalIsOpen: false,
        author: '',
        title: '',
        description:'',
        asset: '',
        date: '',
        messageFromServer:''
    });
}
componentDidMount() {
    this.setState({
        date: this.props.selectedDate
    });
}
handleSelectChange(e) {
    if (e.target.name === "date") {
        this.setState({
            month: e.target.value
        });
    }
}
onClick(e) {
    this.insertNewTicket(this);
}   

insertNewTicket(e) {
    axios.post('/insert', 
        queryString.stringify({
            author: e.state.author,
            title: e.state.title,
            desc: e.state.description,
            asset: e.state.asset,
            date: e.state.date
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function(response) {
        e.setState({
            messageFromServer: response.data
        });
    });
}
handleTextChange(e) {
    if (e.target.name == "author") {
        this.setState({
            author: e.target.value
        });
    }
    if (e.target.name == "title") {
        this.setState({
            title: e.target.value
        });
    } 
    if(e.target.name == "description") {
        this.setState({
            description: e.target.value
        });
    }
}

render() {
    if (this.state.messageFromServer == '') {
        return(
            <div>
                <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
                    <span className="glyphicon glyphyicon-plus"></span>
                </Button>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Add Ticket" className="Modal"/>
                <Link to={{pathname: '/', search: ''}} style={{ textDecoration: 'none'}}>
                    <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}>
                        <span className="closebtn glyphicon glyphicon-remove"></span>
                    </Button>
                </Link>
                <br/>
                
            </div>
        )
    }
}