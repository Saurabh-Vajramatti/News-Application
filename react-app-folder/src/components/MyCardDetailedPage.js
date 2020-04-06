import React from 'react'
import Card from 'react-bootstrap/Card'
import BounceLoader from "react-spinners/BounceLoader";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from "react-share"
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip'
import {FaBookmark, FaRegBookmark} from 'react-icons/fa';
import {MdKeyboardArrowDown,MdKeyboardArrowUp} from 'react-icons/md';
import {Zoom} from 'react-toastify'
import Truncate from 'react-truncate';

import commentBox from 'commentbox.io';

import {Link} from "react-router-dom";

class MyCardDetailsPage extends React.Component {
  constructor()
  {
    super()
    this.state={
      detailedData:"",
      detailedNewsLinkForCheck:"",
      isLoading:true,
      bookMarkClicked:false,
      expanded: false,
      truncated: false
    }


    
    this.handleBookmark=this.handleBookmark.bind(this)
    this.handleTruncate = this.handleTruncate.bind(this);
    this.toggleLines = this.toggleLines.bind(this);
    this.removeFavorite=this.removeFavorite.bind(this)
  }

  handleTruncate(truncated) 
  {
      if (this.state.truncated !== truncated) {
          this.setState({
              truncated
          });
      }
  }

  toggleLines(event) 
  {
      event.preventDefault();
      console.log("DOWNNNNNNNNNNNNNN")

      this.setState({
          expanded: !this.state.expanded
      });
  }

  removeFavorite(array,element) 
  { 
    return array.filter(function(ele){ return ele != element; });
  }
    
  handleBookmark()
  {
    let bookmarkedInPast=false
    if(localStorage.getItem("favoritesArray"))
    {
      let tempArray = JSON.parse(localStorage.getItem("favoritesArray"));
      if(tempArray.indexOf(this.state.detailedNewsLinkForCheck)>-1)
      {
        bookmarkedInPast=true
      } 
    }

    console.log("this.state.bookMarkClicked")
    console.log(this.state.bookMarkClicked)
    if(this.state.bookMarkClicked==false && bookmarkedInPast==false)
    {
      toast(<span style={{color:"black"}}>Saving {this.state.detailedNewsLinkForCheck.includes("https://content.guardianapis.com")?this.state.detailedData.response.content.webTitle: this.state.detailedData.response.docs[0].headline.main}</span>, {
        transition: Zoom,
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true
      });

      if(localStorage.getItem("favoritesArray"))
      {
        let tempArray = JSON.parse(localStorage.getItem("favoritesArray"));
        tempArray.push(this.state.detailedNewsLinkForCheck)
        localStorage.setItem("favoritesArray", JSON.stringify(tempArray));
        console.log(tempArray)
      }
      else
      {
        let tempArray = [this.state.detailedNewsLinkForCheck]
        localStorage.setItem("favoritesArray", JSON.stringify(tempArray));
        console.log(tempArray)
      }
    }

    else
    {
      toast(<span style={{color:"black"}}>Removing - {this.state.detailedNewsLinkForCheck.includes("https://content.guardianapis.com")?this.state.detailedData.response.content.webTitle:this.state.detailedData.response.docs[0].headline.main}</span>, {
        transition: Zoom,
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true
      });
      let tempArray = JSON.parse(localStorage.getItem("favoritesArray"));
      tempArray=this.removeFavorite(tempArray,this.state.detailedNewsLinkForCheck)
      localStorage.setItem("favoritesArray", JSON.stringify(tempArray));
      console.log(tempArray)
    }

    this.setState(previousState=>{
      return {
        bookMarkClicked:!previousState.bookMarkClicked  
      }
    })
    
  }

  componentDidMount()
  {
    this.props.navSwitchHiderFunction()
    console.log("DETAILEDNNNNNNNNNNNNNNNNNN")
    console.log(this.props)
    let para="detailedPageLink="+this.props.location.newsCardInfo.linkToData
    let detailedNewsLink=this.props.location.newsCardInfo.linkToData

    console.log(this.props.location.newsCardInfo.linkToData)
    fetch("http://localhost:3002/getMyCardDetailedPage?"+para)
        .then(response => {return response.json()})
        .then(data=> {
            this.setState({
            detailedData:data,
            detailedNewsLinkForCheck:detailedNewsLink,
            isLoading:false
            })
            this.removeCommentBox = commentBox('5652298076258304-proj');
        })
  }

  componentWillUnmount() {

    this.removeCommentBox();
  }

  render()
  {

    // console.log(this.props.location.newsCardInfo.linkToData)
    console.log("aaaa",this.state.detailedData)
    // let content= this.state.isLoading ? <BounceLoader color={"#123abc"}/>:<Card className="shadow mb-5 bg-white rounded">
    //                                                                         <Card.Body>
    //                                                                           <Card.Title>{this.state.response.content.webTitle}</Card.Title>
    //                                                                         </Card.Body>
    //                                                                       </Card>
    
    let commentId=this.state.detailedNewsLinkForCheck
    let content
    if(this.state.isLoading==true)
    {
      content=<div style={{margin:"auto"}}><BounceLoader color={"#123abc"}/><p>Loading</p></div>
    }
    else
    {
      let detailedNewsTitle
      console.log(this.state.detailedNewsLinkForCheck)
      if(this.state.detailedNewsLinkForCheck.includes("https://content.guardianapis.com"))
      {
        detailedNewsTitle=this.state.detailedData.response.content.webTitle
      }
      else
      {
        detailedNewsTitle=this.state.detailedData.response.docs[0].headline.main
      }
      let cardImageUrl
      let flag=-1;
      if(this.state.detailedNewsLinkForCheck.includes("https://content.guardianapis.com"))
      {
        if(this.state.detailedData.response.content.blocks.main)
        {
          let assetsArray=this.state.detailedData.response.content.blocks.main.elements[0].assets;
          if(assetsArray!=null)
          {
            for(var i=0;i<assetsArray.length;i++)
            {
                if(assetsArray[i].typeData.width>=2000)
                {
                    flag=1
                    cardImageUrl=assetsArray[i].file
                    break
                }
            }
          }
        }
      }
      else
      {
        let multimediaArray=this.state.detailedData.response.docs[0].multimedia;
        
        if(multimediaArray!=null)
        {
          for(var i=0;i<multimediaArray.length;i++)
          {
              if(multimediaArray[i].width>=2000)
              {
                  flag=1
                  cardImageUrl="https://www.nytimes.com/"+multimediaArray[i].url
                  break
              }
          }
        }
      }

      let newsDate
      let newsDescription
      let urlForSharing
      let defaultImageUrl
      if(this.state.detailedNewsLinkForCheck.includes("https://content.guardianapis.com"))
      {
        newsDate=this.state.detailedData.response.content.webPublicationDate
        newsDescription=this.state.detailedData.response.content.blocks.body[0].bodyTextSummary
        urlForSharing=this.state.detailedData.response.content.webUrl
        defaultImageUrl="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
      }
      else
      {
        newsDate=this.state.detailedData.response.docs[0].pub_date
        newsDescription=this.state.detailedData.response.docs[0].abstract
        urlForSharing=this.state.detailedData.response.docs[0].web_url
        defaultImageUrl="https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"
      }

      let bookmarkedInPast=false
      console.log("IN RENDER",localStorage.getItem("favoritesArray"))
      if(localStorage.getItem("favoritesArray"))
      {
        let tempArray = JSON.parse(localStorage.getItem("favoritesArray"));
        if(tempArray.indexOf(this.state.detailedNewsLinkForCheck)>-1)
        {
          bookmarkedInPast=true
        } 
      }
     
      let newsBookmark=this.state.bookMarkClicked==false && bookmarkedInPast==false? <a data-tip='Bookmark'><FaRegBookmark data-tip='Bookmark' style={{color:"red"}} onClick={this.handleBookmark}></FaRegBookmark></a> : <a data-tip='Bookmark'><FaBookmark data-tip='Bookmark' style={{color:"red"}} onClick={this.handleBookmark}></FaBookmark></a>
      content=
      <Card className="shadow mb-5 bg-white rounded">
        <Card.Body>
          <h5><i>{detailedNewsTitle}</i></h5>
          <div style={{paddingLeft:"10px", paddingRight:"10px"}}>
          <Row>
              <Col style={{textAlign:"left"}} xs="6" sm="6" md="6" lg="6" xl="6">
                  <p>
                    <i>
                      {
                          newsDate.slice(0,newsDate.indexOf("T"))

                      }
                    </i>
                  </p>
              </Col>
              <Col xs="5" sm="5" md="5" lg="5" xl="5">
                <div style={{textAlign:"right"}}>  
                    <FacebookShareButton url={urlForSharing} hashtag="#CSCI_571_NewsApp">
                        <FacebookIcon data-tip='Facebook' size={22} round={true}/>
                    </FacebookShareButton>
                    <TwitterShareButton data-tip='Twitter' url={urlForSharing} hashtags={["CSCI_571_NewsApp"]}>
                        <TwitterIcon size={22} round={true}/>
                    </TwitterShareButton>
                    <EmailShareButton data-tip='Email' url={urlForSharing} subject="#CSCI_571_NewsApp">
                        <EmailIcon size={22} round={true}/>
                    </EmailShareButton>
                </div>
              </Col>
              <Col style={{textAlign:"right"}} xs="1" sm="1" md="1" lg="1" xl="1">
                {newsBookmark}
                <ToastContainer style={{textAlign:"left"}}/>
              </Col>
          </Row>
          <ReactTooltip />
          </div>
          <Card.Img src={flag==-1 ? defaultImageUrl : cardImageUrl}>
          </Card.Img>
          <Card.Text style={{textAlign:"justify",textJustify: "inter-word"}}>
            <Truncate 
              lines={!this.state.expanded &&6} 
              ellipsis={<div style={{textAlign:"right"}}><br></br><span><MdKeyboardArrowDown onClick={this.toggleLines}/></span></div>}
              onTruncate={this.handleTruncate}
            >
              {newsDescription}
            </Truncate>
            {!this.state.truncated && this.state.expanded && (
                    <div>
                      {newsDescription}
                      <br></br>
                      <div style={{textAlign:"right"}}>
                        <span><MdKeyboardArrowUp onClick={this.toggleLines}/></span>
                      </div>
                    </div>
                )}
          </Card.Text>
          
        </Card.Body>
      </Card>
    }
    console.log(commentId)
    return (
      <div style={{width:"100%",height:"auto", padding:"20px"}}>
        {content}
        <div id={commentId} className="commentbox" />
      </div>
    )
  }
}

export default MyCardDetailsPage