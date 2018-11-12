import React,{Component} from 'react'


const BASE_URL = 'http://localhost:2610/studentslist'
class StudentsList extends Component{
    constructor(props){
        super(props)
        this.state={
            StudentsList:''
        }
    }
    fetchStudentNames() {
        fetch(`${BASE_URL}`,{method: 'GET'})
        .then(response => response.json()
        )
        .then(json =>{
            this.setState({
                StudentsList: json
            })
        })
    }
    componentDidMount(){
        this.fetchStudentNames()
    }
    renderNames({StudentsList}){
        if (StudentsList){
            return StudentsList.map((student)=>{
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
           < div className="home_poll">
            <h3>Student details</h3>
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