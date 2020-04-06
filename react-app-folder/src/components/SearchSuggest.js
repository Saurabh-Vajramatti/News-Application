import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';
// import { colourOptions } from '../data';
import {
  withRouter
} from 'react-router-dom'


const loadOptions = async (inputValue) => {

    // console.log(inputValue)
    try {
        if(inputValue!=null && inputValue!=""){
            const response = await fetch(
                `https://saurabh-vajramatti.cognitiveservices.azure.com/bing/v7.0/suggestions?q=${inputValue}`,
                {
                  headers: {
                    "Ocp-Apim-Subscription-Key": "21c8a2f1dd4745e3952ca7b3616fb908"
                  }
                }
              );
              const data = await response.json();
              const resultsRaw = data.suggestionGroups[0].searchSuggestions;
              const results = resultsRaw.map(result => ({value:result.displayText, label: result.displayText}));
              // this.setState({ results });
              console.log(inputValue)
              console.log(results)
              return results
              // return results.filter(i =>
              //     i.title.toLowerCase().includes(inputValue.toLowerCase())
              //   );
        }
        

      } catch (error) {
        console.error(`Error fetching search ${inputValue}`);
      }
};

 class SearchSuggest extends React.Component {

    constructor(){
        super()
        //Initial value of my state
        this.state = { inputValue: '' };
        this.handleChange=this.handleChange.bind(this)
        // this.handleInputChange=this.handleInputChange.bind(this)
    }
  
    handleChange(keyword)
    {
      console.log(keyword)
      let newsBrandForSearch
      if(localStorage.getItem('switchCheckedStatus')!=null)
      {
        if(localStorage.getItem('switchCheckedStatus')=="checked")
        {
          newsBrandForSearch="guardian"
        }
        else
        {
          newsBrandForSearch="nytimes"
        }
      }

      this.props.history.push({
        pathname: '/search',
        search: '?q='+keyword.value,
        state: {
          searchNewsBrand:newsBrandForSearch,
          keyword:keyword.value
        }
      })
      this.props.navSwitchHiderFunction()
    }

  // handleInputChange = (newValue) => {
  //   const inputValue = newValue.replace(/\W/g, '');
  //   this.setState({ inputValue });
  //   return inputValue;
  // };

  render() {
    return (
        <AsyncSelect
        className="styleSearchSuggest"
          placeholder="Enter keyword .."
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          onChange={this.handleChange}
          // onInputChange={this.handleInputChange}
        />
    );
  }
}
export default withRouter(SearchSuggest)
