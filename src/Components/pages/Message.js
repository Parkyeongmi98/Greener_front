import React from "react";
import axios from 'axios';

class Message extends React.Component{
    state ={
        chat:[],
        msg:''
    }

    handleChange = (e)=>{
        this.setState({msg:e.target.value})
    }

    handleSend = (e)=>{
        if(this.state.msg != '')
        {
            axios.defaults.headers.common['accessToken'] = `Bearer ${localStorage.getItem("access")}`;
            axios.post('/user',{user_input:this.state.msg}
            
            )
            .then(res=>{
                let ch = this.state.chat;
                ch.push({from:'our',msag:this.state.msg});
                ch.push({from:'cb',msag:res.data});
                this.setState({chat:ch,msg:''});
                console.log(this.state);
                
            })
            .catch(err=>{
                console.log(err);


            });
            let interval = window.setInterval(function(){
                var elem = document.getElementById('chatt');
                elem.scrollTop = elem.scrollHeight;
                window.clearInterval(interval);
            },1000);
            this.forceUpdate();
        }
    }

    render() {
        return(
            <div className="Message" >
                <div id='chatt' style={{overflow:'scroll', overflowY: 'auto', overflowX:'hidden',height:'63vh',  
                    backgroundImage : "url("+"img/chatbot.jpg"+")",
                    backgroundRepeat : 'no-repeat',
                    backgroundPosition:'center',
                    backgroundsize : 'cover'}}>
                    {
                        this.state.chat.map((msg)=>{
                        if(msg.from =='cb')
                            {
                            return <div style={{flexWrap:'wrap',fontSize:'30px',fontFamily:'Jua',
                            marginBottom:'5%',borderRadius:'25px',marginRight:'500px', marginLeft: '2%',
                            padding : '10px', paddingTop: '10px', paddingLeft: '20px',width:'45%', 
                            backgroundColor:'#c9caca',color:'#424242',float:'left',
                            display:'block'}}> {msg.msag} </div>
                            }
                            else{
                            return <div style={{flexWrap:'wrap',fontSize:'30px',fontFamily:'Jua',
                            borderRadius:'25px',marginLeft:'500px', marginRight:'2%', marginBottom:'5%',
                            padding : '10px', paddingTop: '10px', paddingLeft: '20px', width:'35%',  backgroundColor:'#8bc34a', color: '#424242',
                            float:'right',display:'block'}}>{msg.msag} </div>
                            }
                        })
                    }
                    </div>
                    <div style={{height:'1vh'}}>
                        <input type='text' name='msg'
                            onChange={(e)=>this.handleChange(e)}
                            onKeyPress={(e)=>{e.key === "Enter" && this.handleSend()}}
                            class = "form-control"
                            width='450px'
                            style={{marginLeft: "10%", marginBottom: "5%", width:'70%',float:'left'}}
                            value={this.state.msg} />
                            <button onClick={()=>this.handleSend()}style={{paddingLeft:'25px',paddingRight:'25px'}}class="btn btn-primary">Send</button>
                    </div>

            </div>
        )
    }
}
export default Message;