import React from 'react';
import ItemProfileDisplay from './itemprofiledisplay.jsx';
import { PanelGroup, Panel, Button, Well, FormControl } from 'react-bootstrap';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:[],
      firstName:"",
      lastName:"",
      about:"",
      editing:false

    }
    this.renderStart=this.renderStart.bind(this);
     this.renderedit=this.renderedit.bind(this);
     this.edit=this.edit.bind(this);
     this.save=this.save.bind(this);
     this.handelChange=this.handelChange.bind(this);
     this.handelChange2=this.handelChange2.bind(this);
     this.handelChange3=this.handelChange3.bind(this);
     this.getUser=this.getUser.bind(this);
  }
  edit(){
    this.setState({
      editing:true
    })
  }
  save(){
    var that=this
    this.state.user.firstName=this.state.firstName;
    this.state.user.lastName=this.state.lastName;
    this.state.user.about=this.state.about;
    var user=this.state.user.username
    $.ajax({
      url: `/user/${user}` ,
      type: 'PUT',    
      data: JSON.stringify(this.state),
      contentType: 'application/json',
      success: function(result) {
          alert("Successful updated");
      }
    })
  }
 
  handelChange(e){
    this.setState({
      firstName:e.target.value
    })
  }

  handelChange2(e){
    this.setState({
      lastName:e.target.value
    })
  }
  handelChange3(e){
    this.setState({
      about:e.target.value
    })
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    var that = this;
    var user = this.props.username
    $.ajax({
      url: `/user/${user}`,
      method: 'GET',
    })
    .done (function (data) {
      that.setState({
        user: data
      });
    })
    .fail(function( jqXHR, textStatus ) {
      alert( "No user Found");
    });
  }

  renderStart(){
    var user = this.state.user;
    var firstName = user.firstName;
    var lastName = user.lastName;
    var imgUrl = user.imgUrl;
    var about = user.about;
    var items = user.items
    var arr = []
    if (user.length === 0) {
      return (
        <div>
          <h1> Please Login </h1>
        </div>
      )
    }
    var that = this;
    items.forEach(function (item, index) {
      arr.push(<ItemProfileDisplay id={item} eveKey={index} key={index} />)
    })
    return(
      <div>
        <div className="row">
          <div className="col-md-3" style={{'paddingLeft':'20px'}}>
            <img src={imgUrl}  width = '250px' className="img-thumbnail"/>
          </div>
          <div className='col-md-9'>
            <Well>{firstName} {lastName} Profile</Well>
              <Well>{about}</Well>
               <Well>click her to Edit    <Button bsStyle="link" onClick={this.edit}>Edit</Button></Well>
          </div>
        </div>
        <div className="row">
          <PanelGroup accordion id="User-Items" defaultActiveKey="1">
            {arr}
          </PanelGroup>
        </div>
      </div>
    )
  }

  renderedit(){
    var user = this.state.user;
    var imgUrl = user.imgUrl;
    return(
      <div className="row">
        <div className="col-md-3" style={{'paddingLeft':'20px'}}>
          <img src={imgUrl}  width = '250px' className="img-thumbnail"/>
        </div>
        <div className='col-md-9'>
          <FormControl
            bsSize="large"
            value={this.state.firstName}
            placeholder="First Name"
            onChange={this.handelChange}
          />
          <hr></hr>
          <FormControl
            bsSize="large"
            value={this.state.lastName}
            placeholder="Last name"
            onChange={this.handelChange2}
          />
          <hr></hr>
          <FormControl
            bsSize="large"
            value={this.state.about}
            placeholder="About"
            onChange={this.handelChange3}
          />
          <hr></hr>
          <Button bsStyle="success" onClick={this.save}> save</Button>
        </div>
      </div>
    )
  }

  render() {
    if(this.state.editing){
      return(
        this.renderedit()
      )
    }
    else {
      return(
        this.renderStart ()
      )
    }
  }
}
export default Profile;