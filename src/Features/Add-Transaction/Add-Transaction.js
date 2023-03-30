import React, { Component, useState } from "react";
import { useEffect } from "react";
import './Add-Transaction.css'

class Add_Transaction extends React.Component{
    constructor(props) {
        super(props)
        this.setBalance = this.props.setBalance;
        this.balance = this.props.balance;
        this.addBalance = this.props.addBalance;
        this.addTransaction = this.props.addTransaction;
        this.removeBalance = this.props.removeBalance;
        this.addMonthlyBalance = this.props.addMonthlyBalance;
        this.removeMonthlyBalance = this.props.removeMonthlyBalance;
        this.localStorageMonthlyBalance = this.props.localStorageMonthlyBalance;
        this.state = {
            active: 'first'
        }
    }


    onSubmitGain = (event) => {
        event.preventDefault()
        let date = new Date();
        this.title = event.target.title.value
        this.description = event.target.description.value
        this.ammount = event.target.ammount.value
        this.time = date.toUTCString()
        this.id = Math.random() * 1000000
        this.addBalance(this.ammount)
        this.addMonthlyBalance(this.ammount)
        this.addTransaction(this.id, this.title, this.description, this.ammount, this.time)
        this.localStorageMonthlyBalance(this.ammount)
        event.target.title.value = ''
        event.target.description.value = ''
        event.target.ammount.value = ''
    };

    onSubmitSpent = (event) => {
        event.preventDefault()
        let date = new Date();
        this.title = event.target.title.value
        this.description = event.target.description.value
        this.negativeAmmount = event.target.ammount.value
        this.time = date.toUTCString()
        this.removeBalance(this.negativeAmmount)
        this.id = Math.random() * 1000000
        this.addTransaction(this.id, this.title, this.description, -this.negativeAmmount, this.time)
        this.removeMonthlyBalance(this.negativeAmmount)
        event.target.title.value = ''
        event.target.description.value = ''
        event.target.ammount.value = ''
    };


    closeTab = () => {
        document.getElementById('tab').style.display = 'none';
    }

    addActiveClass(e){
        const clicked = e.target.id
        if(this.state.active === clicked) { 
            this.setState({active: ''});
        } else {
            this.setState({active: clicked})
       }
    }


    // will activate one depending on the choice that the user makes
    // first one is the gained Section
    firstActive() {
            return(
            <form onSubmit={this.onSubmitGain}>
                <label htmlFor='title'>Title:</label>
                <input id='form' name='title' className='form-title' type='text' placeholder="Title" ref={node => (this.inputNode = node)} required></input><br/>
                <label htmlFor='description'>Description:</label>
                <input id='form' name='description' className='form-description' type='text' placeholder="Description" required></input><br/>
                <label htmlFor="ammount">Ammount:</label>
                <input id='form' name='ammount' className="form-ammount" type='float' placeholder="Ammount" required></input>
                <button type="submit">Submit</button>
            </form>
            )
            
    }
    // second one is the spent Section
    secondActive() {
        return(
            <form onSubmit={this.onSubmitSpent}>
                <label htmlFor='title'>Title:</label>
                <input id='form' name='title' className='form-title' type='text' placeholder="Title" ref={node => (this.inputNode = node)} required></input><br/>
                <label htmlFor='description'>Description:</label>
                <input id='form' name='description' className='form-description' type='text' placeholder="Description" required></input><br/>
                <label htmlFor="ammount">Ammount:</label>
                <input id='form' name='ammount' className="form-ammount" type='float' placeholder="Ammount" required></input>
                <button type="submit">Submit</button>
                
            </form>
        )
    }
        // third one is the transfer Section(have to work on the different category money first)
        // thirdActive() {
        //     return(
        //         <form onSubmit={this.onSubmitTransaction}>
        //             <label htmlFor='title'>Title:</label>
        //             <input id='form' name='title' className='form-title' type='text' placeholder="Title" ref={node => (this.inputNode = node)} required></input><br/>
        //             <label htmlFor='description'>Description:</label>
        //             <input id='form' name='description' className='form-description' type='text' placeholder="Description" required></input><br/>
        //             <label htmlFor="ammount">Ammount:</label>
        //             <input id='form' name='ammount' className="form-ammount" type='float' placeholder="Ammount" required></input>
        //             <button type="submit">Submit</button>
                    
        //         </form>
        //     )
        // }



    
    render(){
            return(
            <div className="steps" id="tab">
                <ul className="choices-list">
                    <li className={`choice ${this.state.active === "first"? 'active': ''}`} id='first' onClick={e => this.addActiveClass(e)}>Gained</li>
                    <li className={`choice ${this.state.active === "second"? 'active': ''}`} id='second' onClick={e => this.addActiveClass(e)} >Spent</li>
                    {/* <li className={`choice ${this.state.active === "third"? 'active': ''}`} id='third' onClick={e => this.addActiveClass(e)} >Transfer</li> */}
                </ul>
                {this.state.active === 'first' ? <div className="form">{this.firstActive()}</div> : ''}
                {this.state.active === 'second' ? <div className="form">{this.secondActive()}</div> : ''}
                {/* {this.state.active === 'third' ? <div className="form">{this.firstActive()}</div> : ''} */}
                <p className="close" onClick={this.closeTab}>x</p>
            </div>
            
        )}
}

export default Add_Transaction;