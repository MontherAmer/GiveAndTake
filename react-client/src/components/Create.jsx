import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import {Modal} from 'react-bootstrap';

class Create extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className ='row'>
        <div className="col-md-3"></div> 
        <div className="col-md-6">
          <div className="row outerBorder">
            <h4 style={{"color": "#078b8f", "margin": "initial", "marginBottom":"10px"}}>Sign Up Now</h4>
            <form action="/create" method="post" style={{"width": '100%'}}>
              <div className="input-group margin-bottom-20">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user mycolor"></i></span>
                <input size="60" className="form-control" placeholder="User Name" name="username" id="UserRegistration_username" type="text" />
              </div>
              <div className="input-group margin-bottom-20">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-lock mycolor"></i></span>
                  <input size="60" className="form-control" placeholder="Password" name="password" id="UserRegistration_password" type="password" />                                    
              </div>
              <div className="input-group margin-bottom-20">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user mycolor"></i></span>
                  <input size="60" className="form-control" placeholder="First Name" name="firstName" id="UserRegistration_fname" type="text"/>                                    
              </div>
              <div className="input-group margin-bottom-20">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user mycolor"></i></span>
                  <input size="60" className="form-control" placeholder="Last Name" name="lastName" id="UserRegistration_lname" type="text"/>                                    
              </div>
              <div className="input-group margin-bottom-20">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-envelope mycolor"></i></span>
                  <input size="60" className="form-control" placeholder="Email" name="email" id="UserRegistration_address" type="text"/>                                    
              </div>
              <div className="input-group margin-bottom-20">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-phone mycolor"></i></span>
                  <input size="60" className="form-control" placeholder="Phone Number" name="phone" id="UserRegistration_phone" type="text"/>                                    
              </div>
              <div className="input-group margin-bottom-20">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-picture mycolor"></i></span>
                  <input className="form-control" placeholder="image" name="imgUrl" id="UserRegistration_Image" type="text"/>                                    
              </div>
              <div className="input-group margin-bottom-20">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-question-sign mycolor"></i></span>
                  <input size="60" className="form-control" placeholder="About" name="about" id="UserRegistration_contactnumber" type="text"/>                                    
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <button className="btn btn-u pull-left" type="submit">Sign Up</button>
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>                                                                   
    );
  }
}

export default Create