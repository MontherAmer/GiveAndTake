import React from 'react';
import Comments from './comments.jsx';
import ItemDisplay from './ItemDisplay.jsx';
import { Button,  Panel, ListGroupItem, PanelGroup, FormControl, FormGroup } from 'react-bootstrap';

class ShowItem extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      value:'',
      sItem:[]
    }
    this.handleChange=this.handleChange.bind(this);
    this.getItem=this.getItem.bind(this);
  }

  handleSelect(activeKey){
    this.setState({activeKey});
  }

  handleChange(e){
    this.setState({value:e.target.value})
  }

  componentDidMount() {
    var that = this;
    $.ajax({
      url: '/item',
      method: 'GET',
    })
    .done (function (data) {
      that.setState({
        sItem: data
      });
    })
    .fail(function( jqXHR, textStatus ) {
      alert( "no Items found");
    });
  }

  getItem(){
    var that=this;
    $.ajax({
      type:'GET',
      url:'/item',
      success:function(data){
        var x=[];
        for(var i=0;i<data.length;i++){
          if(data[i].name===that.state.value){
            x.push(data[i])
          }
         
        }
         that.setState({sItem:x})
      }
    })
  }

  render(){
    var r=this;
  	return(
  		<div>
        <h1> search </h1>
        <FormGroup bsSize="large">
          <FormControl
            value={this.state.value}
            placeholder="Search"
            onChange={this.handleChange}
          />
        </FormGroup>
      <Button  onClick={this.getItem} bsStyle='primary'>SEARCH</Button>
      <div>
       <PanelGroup activeKey={this.state.activeKey}
        onSelect={this.handleSelect} id="panelForItems">
      {this.state.sItem.map(function(y){
        return(
          <div>
            <ItemDisplay id={y._id} username={y.username} />
          </div>  
        )
      }
      )}
      </PanelGroup>
      </div>
  		</div>
  	)
  }

}
export default ShowItem;