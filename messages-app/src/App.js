/* main component for messager app */
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
       message : '',
       messageList : [],
       //max length of message
       maxlength : 10
    }
    this.handlechange = this.handlechange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.configMessageBeforeShow = this.configMessageBeforeShow.bind(this)
    this.sliceMessage =  this.sliceMessage.bind(this)
    this.findNextIndex = this.findNextIndex.bind(this)
  }
  // change value input
  handlechange(event){
    this.setState({message : event.target.value})
  }
  // submit value form to add message list
  handleSubmit(event){  
    //message will be send
     let message = this.configMessageBeforeShow(this.state.message)
    let value = {id:'me',message:message,time: new Date().toString()}
    //message will be auto reply
    let reply = {id:'someone',message:'reply',time: new Date().toString()}
    this.setState({messageList:[...this.state.messageList,value,reply]})
    event.preventDefault();
  }
  /*
    characters longer than 50 characters, display an error,
    split it into chunks that each is less than or equal to 50 characters
   */
  configMessageBeforeShow(message){
    let array ;
    if(message.length > this.state.maxlength){
      array = this.sliceMessage(message)
    }
    return array
  }
  /*
  arr is result of list message,
  start is start cut position
  end is end cut position
   */
  sliceMessage(message){
    let arr = []
    let start = 0 
    let end  = this.state.maxlength
    //loop of cut
    do{
      let new_messege = message.slice(start, end+1)
      let index = this.findNextIndex(new_messege)
      //cut corect messge
      let result_messege = message.slice(start, start+index)
      //
      arr.push(result_messege)
      start += index+1;
      end = start + this.state.maxlength
    }while(start < message.length)
    //end loop
    return arr
  }
  /*find corect index for cut message */
  findNextIndex(message){
    if(message.lastIndexOf(' ') != -1){
      //return space closest
      return message.lastIndexOf(' ')
    }else{
      return message.length
    }
  }
  render() {
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
                  {item.message.map((items,index) =>{
                    return<p key={index}><span>{index+1}/{item.message.length}</span>{items}</p>
                  })}
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
