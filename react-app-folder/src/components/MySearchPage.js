import React from "react"
import {
    withRouter
  } from 'react-router-dom'
  
import BounceLoader from "react-spinners/BounceLoader";
import MySearchNYTimesNewsCard from "./MySearchNYTimesNewsCard"
import MySearchGuardianNewsCard from "./MySearchGuardianNewsCard"

class MySearchPage extends React.Component {
    constructor(props)
    {
        // this.handleReflow=this.handleReflow.bind(this)
        super(props);
        this.state = {
            allCards:"",
            isLoading:true,
            newsBrand:""
        }

        // this.handleModalClose=this.handleModalClose.bind(this)
    }

    componentDidMount()
    {
        let para="q="+this.props.location.state.keyword+"&brand="+this.props.location.state.searchNewsBrand
        console.log(para)
        fetch("http://localhost:3002/getMySearchResults?"+para)
        .then(response => {return response.json()})
        .then(data=> {
            this.setState({
            allCards:data,
            newsBrand:this.props.location.state.searchNewsBrand,
            isLoading:false
            })
            console.log(data)
        })
    }

    
    render()
    {
        console.log("RENDEREDDDDDDDDD")
        console.log(this.state.allCards)
        let content
        let newsCards
        if(this.state.isLoading==true)
        {
            content=<div style={{margin:"auto"}}><BounceLoader color={"#123abc"}/><p>Loading</p></div>
        }
        else
        {
            console.log("MMMMMMMMMMMMMMMMMMMM")
            let newsTitle
            let newsImageUrl
            let newsSection
            let newsDate
            
            if(this.state.newsBrand=="guardian")
            {
                newsCards=this.state.allCards.map(newsCard=>
                <MySearchGuardianNewsCard key={newsCard.id} newsCard={newsCard}/>)
                console.log("GGGGGGGGGGGGGG")
                console.log(newsCards)
            }
            else if(this.state.newsBrand=="nytimes")
            {
                newsCards=this.state.allCards.map(newsCard=>
                <MySearchNYTimesNewsCard key={newsCard.web_url} newsCard={newsCard}/>)
                console.log("NYTTTTTTTTTTTTTTT")
                console.log(newsCards)
            }
            content=newsCards
        }

        return(
            <div style={{padding:"20px"}}>
                <h3>Results</h3>
                <div class="d-flex flex-wrap" style={{width:"100%"}}>
                {content}
                </div>
            </div>
        )
    }
}

export default MySearchPage