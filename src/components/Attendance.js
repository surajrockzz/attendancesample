import React,{Component} from 'react'

const BASE_URL = 'http://localhost:2610'
class Attendance extends Component{
    constructor(props){
        super(props)
        this.state={
            present:"true",
            abscent:"false",
            morning:"true",
            afternoon:"false",
            StudentsList:'',
            decision:'present',
            session:'morning',
            list:{
                list:[]
            }
        }
        this.setDecision = this.setDecision.bind(this);
        this.setSession = this.setSession.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitLogic = this.submitLogic.bind(this)
    
    }
    fetchStudentNames() {
        fetch(`${BASE_URL}/studentslist`,{method: 'GET'})
        .then(response => response.json()
        )
        .then(json =>{
            this.setState({
                StudentsList: json
            })
            let dict = {}
            console.log(this.state.StudentsList.length);
            for (let i = 0; i < this.state.StudentsList.length; i++) {
                dict[this.state.StudentsList[i].rollno] = this.state.decision;
            }
            this.setState({
                list: {
                    list: dict
                }
            })
        })
    }
    componentDidMount(){
        this.fetchStudentNames()
    }

     handleInputChange(event) {
         if(event.target.checked===true){
             event.target.checked = true 
            alert(""+event.target.name)
             let someProperty = { ...this.state.list.list }
             someProperty[event.target.name] = this.state.decision==="present"?"abscent":"present";
             console.log(someProperty[event.target.name])
            this.setState({
                list:{
                    list:someProperty
                }
            })
         }
         else{
             alert("false")
             event.target.checked=false
             let someProperty = { ...this.state.list.list }
             someProperty[event.target.name] = this.state.decision === "present" ? "abscent" : "present";
             this.setState({
                 list: {
                     list: someProperty
                 }
             })
         }
     }
     submitLogic(event){
         alert("submitted")
         var obj = {
             type:this.state.decision,
             session:this.state.session,
             list:this.state.list.list
         }
         var jki = JSON.stringify(obj);
         fetch(`${BASE_URL}/attendance`,{
             method: 'post',
             headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({obj})
        }).then(res=> res.json())
        .then(()=>{
            console.log("done")
        })
     }


    renderNames({StudentsList}){
        console.log("rendered")
        if (StudentsList){
            return StudentsList.map((student)=>{
                return(
                    <tr>
      <th scope="row">{student.id}</th>
      <td>{student.rollno}</td>
      <td>{student.name}</td>
      <td>{student.mail}</td>
      <td>{student.Branch}</td>
      <td><input  
                            id={student.rollno}
                            name={student.rollno}
                            type="checkbox"
                            checked={this.state.list.list[student.rollno]==="present"}
                            onChange={this.handleInputChange} /></td>
    </tr>
                    
                )
            })
        }
    }
    setDecision(event){
        if(event.target.id==="present"){
            console.log("present")
            this.setState({
                present:"true",
                abscent:"false",
                decision:event.target.id
            })
            
        }
        else{
            console.log("abscent")
            this.setState({
                present: "false",
                abscent: "true",
                decision: event.target.id
            })

        }
        var promise1 = new Promise(function(resolve,reject){
            let dict = {}
            resolve(dict)
        })
        promise1.then((value)=>{
            for (let i = 0; i < this.state.StudentsList.length; i++) {
                 console.log(this.state.StudentsList);
                value[this.state.StudentsList[i].rollno] = this.state.decision;
            }
                this.setState({
                list: {
                    list: value
                }
            })
        })
    }
    
    setSession(event) {
        if (event.target.id === "morning") {
            this.setState({
                morning: "true",
                    afternoon: "false",
                    session: event.target.id
            })
        }
        else {
            this.setState({
                morning: "false",
                afternoon: "true",
                session: event.target.id
            })


        }
    }

    render(){
        return (
           < div className="home_poll">
            <h3>Student Attendance</h3>
            <div className="form-check">
                <label className="form-check-label">Presentees:</label>
                <input name="decision" className="form-check-input"type="radio"  id="present" checked={this.state.present==="true"} onChange={this.setDecision}/><br/>
                <label className="form-check-label"> Absentees:</label>
                <input name="decision" className="form-check-input" type="radio"  id="abscent" checked={this.state.abscent==="true"}onChange={this.setDecision}/>
            </div>
            <div className="form-check">
                <label className="form-check-label">Morning:
                <input name="session" className="form-check-input" type="radio" id="morning" checked={this.state.morning === "true"} onChange={this.setSession}/>
                </label><br/>
                <label className="form-check-label"> Afternoon:
                <input name="session" className="form-check-input" type="radio" id="afternoon" checked={this.state.afternoon === "true"}onChange={this.setSession}/>
                </label>
            </div>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Rollno</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Present/Abscent</th>
                    </tr>
                    </thead>
                {this.renderNames(this.state)}
                </table>
            </div>
            <button className ="btn btn-primary" onClick={this.submitLogic}>submit</button>
           </div>
        
        )  
      }
}

export default Attendance