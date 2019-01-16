/* main component for messager app */
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
       message : '',
       messageList : []
    }
    this.handlechange = this.handlechange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // change value input
  handlechange(event){
    this.setState({message : event.target.value})
  }
  // submit value form to add message list
  handleSubmit(event){  
    //message will be send
    let value = {id:'me',message:this.state.message,time: new Date().toString()}
    //message will be auto reply
    let reply = {id:'someone',message:'reply',time: new Date().toString()}

    this.setState({messageList:[...this.state.messageList,value,reply]})
    event.preventDefault();
  }
  render() {
    console.log(this.state.messageList)
    //show message list
    let message_layout = this.state.messageList.map((item,index) =>{
      if(item.id === 'someone')
        return <div key = {index} className="incoming_msg">
                <div className="incoming_msg_img"> <img src="/images/user-profile.png" alt="sunil" /> </div>
                <div className="received_msg">
                  <div className="received_withd_msg">
                    <p>{item.message}</p>
                    <span className="time_date">{item.time}</span></div>
                </div>
              </div>
      else
        return <div key = {index} className="outgoing_msg">
                <div className="sent_msg">
                  <p>{item.message}</p>
                  <span className="time_date">{item.time}</span> </div>
              </div>
    })
    return (
      <div className="container">
        <h3 className=" text-center">Messaging</h3>
        <div className="messaging">
              <div className="inbox_msg">
                <div className="mesgs layout">
                  <div className="msg_history">
                    {message_layout}
                  </div> 
                  <div className="type_msg">
                    <div className="input_msg_write">
                      <form onSubmit ={this.handleSubmit}>
                        <input type="text" className="write_msg" placeholder="Type a message" value={this.state.message} onChange={this.handlechange} />
                        <button className="msg_send_btn" type="submit"><i className="far fa-paper-plane"></i></button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default App;
