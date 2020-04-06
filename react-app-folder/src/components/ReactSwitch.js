import React from 'react'
import Switch from "react-switch";

class ReactSwitch extends React.Component {
    constructor() {
      super()
      if(localStorage.getItem('switchCheckedStatus')!=null)
      {
        this.state = { checked: (localStorage.getItem('switchCheckedStatus')=="checked")?true:false }
      }
      else
      {
        this.state={checked: true}
        localStorage.setItem('switchCheckedStatus',"checked")
        console.log(localStorage.getItem('switchCheckedStatus'))
      }
      
      this.handleChange = this.handleChange.bind(this)
    }
   
    handleChange(checked) {
      this.setState({ checked });
      localStorage.setItem('switchChangedStatus',"changed")
      console.log(localStorage.getItem('switchChangedStatus'))
      localStorage.setItem('switchCheckedStatus',checked==true?"checked":"unchecked")
      this.props.handleSwitchStateChange()
    }
   
    render() {
      return (
        <label style={{marginBottom:"0"}} htmlFor="material-switch">
            <span style={{color:"white"}}>NY Times  </span>
            <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                offColor="#bac2ba"
                onColor="#1e7ee6"
                onHandleColor="#ffffff"
                // handleDiameter={20}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                // height={25}
                // width={48}
                className="react-switch"
                id="material-switch"
            />
            <span style={{color:"white"}}>  Guardian</span>
        </label>
      );
    }
  }

  export default ReactSwitch