import React,{Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import Header from './header'
import Footer from './footer'
import Home from './Home'
import StudentsList from './StudentsList'
import Attendance from './Attendance'

class App extends Component{
    render(){
        return (
            <BrowserRouter>
            <div>
                <Header/>
                <Route exact path='/' component={Home}/>
                <Route exact path='/StudentsList' component={StudentsList}/>
                <Route exact path='/Attendance' component={Attendance}/>
                <Footer/>
            </div>
            </BrowserRouter>
            
        )
    }
}
export default App