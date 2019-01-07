import React,{Component} from 'react'


const BASE_URL = 'http://localhost:2610/studentslist'
class StudentsList extends Component{
    constructor(props){
        super(props)
        this.state={
            StudentsList:'',
            keyword:''
        }
    }
    fetchStudentNames() {
        fetch(`${BASE_URL}`,{method: 'GET'})
        .then(response => response.json()
        )
        .then(json =>{
            this.setState({
                StudentsList: json,
                filtered:json
            })
        })
    }
    componentDidMount(){
        this.fetchStudentNames()
    }
    searchName= (event)=>{
        const keyword = event.target.value
        if(keyword !== ''){
             const list = this.state.StudentsList.filter((student)=>{
                return student.name.toLowerCase().indexOf(keyword.toLowerCase())>-1
            })
            this.setState({
                filtered:list,
                keyword:event.target.value
            })
        }
        else {
            this.setState({
                filtered: this.state.StudentsList,
                keyword: event.target.value
            })
    }
}
    renderNames ({filtered}){
        if (filtered){
            return filtered.map((student)=>{
                return(
                    <tr>
      <th scope="row">{student.id}</th>
      <td>{student.rollno}</td>
      <td>{student.name}</td>
      <td>{student.mail}</td>
      <td>{student.Branch}</td>
      
    </tr>
                    
                )
            }

            )
        }
    }



    render(){
        return (
           < div className="container home_poll">
            <h3>Student details</h3>
            <input className= "form-control" type="text" value={this.state.keyword} onChange={(e)=> this.searchName(e)}/>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                    <th scope="col">id</th>
                    <th scope="col">Rollno</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Branch</th>
                    </tr>
                    </thead>
                {this.renderNames(this.state)}
                </table>
            </div>
           </div>
        
        )  
      }
}

export default StudentsList