import React from "react"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import LinesEllipsis from 'react-lines-ellipsis'
import {MdShare} from 'react-icons/md'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from "react-share"
import Badge from 'react-bootstrap/Badge'
import Truncate from 'react-truncate'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MyNYNewsCard extends React.Component {
    constructor(props)
    {
        // this.handleReflow=this.handleReflow.bind(this)
        super(props);
        this.state = {
            show: false
        };

        this.handleClose=this.handleClose.bind(this)
        this.handleShow=this.handleShow.bind(this)
        this.handleModalClose=this.handleModalClose.bind(this)
    }

    // handleReflow = (rleState) => {
    //     const {
    //       clamped,
    //       text,
    //     } = rleState
    //     // do sth...
    //   }
    handleModalClose(event)
    {
        event.preventDefault()
    }
    handleClose()
    {
        this.setState({show:false})
    }

    handleShow(event)
    {
        event.preventDefault()
        this.setState({show:true})
    }
    render()
    {    
        // console.log(this.props.newsCard.webTitle)
        // const checkCompleted={
        //     fontStyle:"italic",
        //     color: "grey",
        //     textDecoration:"Line-through"
        // }
        //console.log(props)
        
        var newsTag
        if(this.props.newsCard.section.toLowerCase()=="world")
        {
            newsTag=<Badge variant="primary" style={{backgroundColor:"rgb(128, 24, 212)", marginRight:"0px"}}>WORLD</Badge>
        }
        else if(this.props.newsCard.section.toLowerCase()=="politics")
        {
            newsTag=<Badge variant="success" style={{backgroundColor:"rgb(7, 102, 43)",textAlign:"right"}}>POLITICS</Badge>
        }
        else if(this.props.newsCard.section.toLowerCase()=="business")
        {
            newsTag=<Badge variant="info">BUSINESS</Badge>
        }
        else if(this.props.newsCard.section.toLowerCase()=="technology")
        {
            newsTag=<Badge variant="warning" style={{backgroundColor:"rgb(218, 247, 90)"}}>TECHNOLOGY</Badge>
        }
        else if(this.props.newsCard.section.toLowerCase()=="sports")
        {
            newsTag=<Badge variant="warning">SPORTS</Badge>
        }
        else
        {
            newsTag=<Badge variant="secondary">{this.props.newsCard.section.toUpperCase()}</Badge>
        }

        const multiMediaArray=this.props.newsCard.multimedia;
        let cardImageUrl;
        let flag=-1;
        if(multiMediaArray!=null)
        {
            for(var i=0;i<multiMediaArray.length;i++)
            {
                if(multiMediaArray[i].width>=2000)
                {
                    flag=1
                    cardImageUrl=multiMediaArray[i].url
                    break
                }
            }
        }
        
        
        let detailedLink='https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("'+this.props.newsCard.url+'")&api-key=DXNhYbJijwtz5G7wE8vTnLSuljXZPOFk';
        
        return(
            <Link style={{textDecoration:"none", color:"black"}} to={{
                pathname:'/article',
                search:'?id='+this.props.newsCard.url,
                newsCardInfo:{
                    linkToData:detailedLink
                }
            }}>
                <Card className="shadow mb-5 bg-white rounded" >
                    <Card.Body>
                        <Row>
                            <Col xs="12" sm="12" md="3" lg="3" xl="3">
                                {/*  guardian default image:https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png  */}
                                {/*  NYT default image:  https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg  */}
                                <img src={flag==-1 ? "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg" : cardImageUrl} width="100%" height="150px"></img>
                            </Col>
                            <Col  xs="12" sm="12" md="9" lg="9" xl="9">
                                <h5><i><b>{this.props.newsCard.title}<MdShare onClick={this.handleShow}></MdShare></b></i></h5>
                                <div onClick={this.handleModalClose} >
                                <Modal show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                    <Modal.Title>{this.props.newsCard.title}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p style={{textAlign:"center"}}>Share via</p>
                                        <div style={{textAlign:"center"}}>  
                                            <FacebookShareButton style={{marginRight:"10px"}} url={this.props.newsCard.url} hashtag="#CSCI_571_NewsApp">
                                                <FacebookIcon size={32} round={true}/>
                                            </FacebookShareButton>
                                            <TwitterShareButton style={{marginRight:"10px"}} url={this.props.newsCard.url} hashtags={["CSCI_571_NewsApp"]}>
                                                <TwitterIcon size={32} round={true}/>
                                            </TwitterShareButton>
                                            <EmailShareButton url={this.props.newsCard.url} subject="#CSCI_571_NewsApp">
                                                <EmailIcon size={32} round={true}/>
                                            </EmailShareButton>
                                        </div>
                                    </Modal.Body>
                                    {/* <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={this.handleClose}>
                                        Save Changes
                                    </Button>
                                    </Modal.Footer> */}
                                </Modal>
                                </div>
                                <Card.Text>
                                    <Truncate lines={3} ellipsis={<span>...</span>}>
                                        {this.props.newsCard.abstract}
                                    </Truncate>
                                </Card.Text>

                                {/* <LinesEllipsis
                                    text={this.props.newsCard.abstract}
                                    // onReflow={this.handleReflow}
                                    maxLine={3}
                                /> */}
                                {/* <p>{this.props.newsCard.blocks.body[0].bodyTextSummary}</p> */}
                                <Row>
                                    <Col style={{textAlign:"left"}} xs="6" sm="6" md="6" lg="6" xl="6">
                                    <p>
                                        {
                                            this.props.newsCard.published_date.slice(0,this.props.newsCard.published_date.indexOf("T"))

                                        }
                                    </p>
                                    </Col>
                                    {/* <Col xs="2" sm="2" md="8" lg="8" xl="8">
                                    
                                    </Col> */}
                                    <Col style={{textAlign:"right"}} xs="6" sm="6" md="6" lg="6" xl="6">
                                        {newsTag}
                                    </Col>
                                    {/* <Col xs="1" sm="1" md="1" lg="1" xl="1">

                                    </Col> */}
                                </Row>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Link>
            // <div>
            //     <img src={props.contact.imageUrl}/>
            //     <h2 style={props.contact.completed? checkCompleted:null}>{props.contact.name}</h2>
            //     <input 
            //         type="checkbox" 
            //         checked={props.contact.completed} 
            //         onChange={()=> props.handleChange(props.contact.id)}
            //     />
            //     <p style={{display: props.contact.phone ? "blcok":"none"}}>Phone:{props.contact.phone}</p>
            //     <p style={{color: !props.contact.phone && "grey"}}>Email:{props.contact.email}</p>
            // </div>
        )
    }
}

export default MyNYNewsCard