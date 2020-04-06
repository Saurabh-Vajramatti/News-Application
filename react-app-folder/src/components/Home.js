import React from "react"
import MyNewsCard from './MyNewsCard'
import MyNYNewsCard from './MyNYNewsCard'


class Home extends React.Component
{
    constructor(){
        super()
        //Initial value of my state
        this.state={
          allCards:[],
          newsBrand:"",
          ch:"kk"
        }
        this.handleSwitchStateChange=this.handleSwitchStateChange.bind(this)
    }

    componentDidMount()
    {
        this.props.navSwitchShowFunction()
        // fetch("http://localhost:3002/hello")
        // .then(response => {return response.text()})
        // .then(data=> {
        //     this.setState({
        //     isLoading:false,
        //     character:data
        //     })
        // })

        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")

        if(localStorage.getItem('switchCheckedStatus')!=null)
        {
        // console.log(localStorage.getItem('switchCheckedStatus'))
        if(localStorage.getItem('switchCheckedStatus')=="checked")
        {
            // console.log(localStorage.getItem('switchCheckedStatus'))
            this.setState({
            newsBrand:"Guardian"
            })  
        }
        else
        {
            this.setState({
            newsBrand:"NYTimes"
            })
        }
        }

        else
        {
        this.setState({
            newsBrand:"Guardian"
        })
        }
        
        // console.log("ccccc")
        // console.log(this.state.newsBrand)
        // console.log("ccccc")
        if(localStorage.getItem('switchCheckedStatus')=="checked")
        {
        console.log(localStorage.getItem('switchCheckedStatus'))
        console.log("HERE I am Glink")
            fetch("http://localhost:3002/getHomepageGuardianCardNews")
        .then(response => {return response.json()})
        .then(data=> {
            this.setState({
            allCards:data.response.results
            })
            console.log(this.state.allCards)
        })
        }

        else if(localStorage.getItem('switchCheckedStatus')=="unchecked")
        {
        console.log("HERE I am NYlink")
        fetch("http://localhost:3002/getHomepageNYCardNews")
        .then(response => {return response.json()})
        .then(data=> {
            this.setState({
            allCards:data.results
            })
            console.log(this.state.allCards)
        })
        }
    }

    handleSwitchStateChange() {
        // Typical usage (don't forget to compare props):

        console.log("OOOOOOOOOOOOOOOOOOOOO")
        if (localStorage.getItem('switchCheckedStatus')=="checked") 
        {
          if(this.state.newsBrand!="Guardian")
          {
            
            fetch("http://localhost:3002/getHomepageGuardianCardNews")
          .then(response => {return response.json()})
          .then(data=> {
            this.setState({
              allCards:data.response.results,
              newsBrand:"Guardian"
            })
            console.log(this.state.allCards)
          })
          // this.setState({
          //   newsBrand:"Guardian"
          // })
          }
        }
        else if(localStorage.getItem('switchCheckedStatus')=="unchecked")
        {
          if(this.state.newsBrand!="NYTimes")
          {
            fetch("http://localhost:3002/getHomepageNYCardNews")
            .then(response => {return response.json()})
            .then(data=> {
              this.setState({
                allCards:data.results,
                newsBrand:"NYTimes"
              })
              console.log(this.state.allCards)
            })
    
            // console.log("HERE I am NYlink")
          }
        }
        // this.setState({
        //     ch:"NYTimes"
        //   })
    }

    render()
    {
        if(localStorage.getItem('switchChangedStatus')=="changed")
        {
            this.handleSwitchStateChange()
            // console.log("plll")
            localStorage.setItem('switchChangedStatus',"unchanged")
        }

        console.log("IIIIIIIIIIIIIIIIIIIIIIIIII")
        var currentKey=0
        let newsCards
        console.log(this.state.newsBrand)
        console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPP")
        console.log(this.props.p)
        if(this.state.newsBrand=="Guardian")
        {
        newsCards=this.state.allCards.map(newsCard=>
            <MyNewsCard key={newsCard.id} newsCard={newsCard}/>)
        }
        else if(this.state.newsBrand=="NYTimes")
        {
        newsCards=this.state.allCards.map(newsCard=>
            <MyNYNewsCard key={currentKey++} newsCard={newsCard}/>)
        }

        return(
            <div style={{width:"100%", padding:"20px"}}>
                {newsCards}
            </div>
        )
    }
}


export default Home