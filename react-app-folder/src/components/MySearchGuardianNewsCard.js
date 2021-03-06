import React from "react"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import {MdShare} from 'react-icons/md'
import Modal from 'react-bootstrap/Modal'

import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from "react-share"
import Badge from 'react-bootstrap/Badge'
import Truncate from 'react-truncate'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class MySearchGuardianNewsCard extends React.Component {
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
        // const [show, setShow] = useState(false);

        // console.log(this.props.newsCard.webTitle)
        // const checkCompleted={
        //     fontStyle:"italic",
        //     color: "grey",
        //     textDecoration:"Line-through"
        // }
        //console.log(props)
        
        var newsTag
        if(this.props.newsCard.sectionId.toLowerCase()=="world")
        {
            newsTag=<Badge variant="primary" style={{backgroundColor:"rgb(128, 24, 212)"}}>WORLD</Badge>
        }
        else if(this.props.newsCard.sectionId.toLowerCase()=="politics")
        {
            newsTag=<Badge variant="success" style={{backgroundColor:"rgb(7, 102, 43)"}}>POLITICS</Badge>
        }
        else if(this.props.newsCard.sectionId.toLowerCase()=="business")
        {
            newsTag=<Badge variant="info">BUSINESS</Badge>
        }
        else if(this.props.newsCard.sectionId.toLowerCase()=="technology")
        {
            newsTag=<Badge variant="warning" style={{backgroundColor:"rgb(218, 247, 90)"}}>TECHNOLOGY</Badge>
        }
        else if(this.props.newsCard.sectionId.toLowerCase()=="sport")
        {
            newsTag=<Badge variant="warning">SPORTS</Badge>
        }
        else
        {
            newsTag=<Badge variant="secondary">{this.props.newsCard.sectionId.toUpperCase()}</Badge>
        }

        
        let cardImageUrl;
        let flag=-1;
        if(this.props.newsCard.blocks.main)
        {
            const assetsArray=this.props.newsCard.blocks.main.elements[0].assets;
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

        let detailedLink="https://content.guardianapis.com/"+this.props.newsCard.id+"?api-key=5631901b-74bc-475e-8f28-bdf311cb74c9&show-blocks=all"
        return(
            <Col xs="12" sm="12" md="3" lg="3" xl="3">
            <Link style={{textDecoration:"none", color:"black"}} to={{
                pathname:'/article',
                search:'?id='+this.props.newsCard.id,
                newsCardInfo:{
                    linkToData:detailedLink
                }
            }}>
                <Card style={{padding:"12px"}} className="shadow mb-5 bg-white rounded">
                    <Card.Body>
                        <Row>
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card.Title>
                                    <Truncate width={375} ellipsis={<span>...</span>}>
                                        {this.props.newsCard.webTitle}
                                    </Truncate>
                                    <MdShare onClick={this.handleShow}></MdShare>
                                </Card.Title>
                                <div onClick={this.handleModalClose} >
                                    <Modal show={this.state.show} onHide={this.handleClose} >
                                        <Modal.Header closeButton>
                                        <Modal.Title>{this.props.newsCard.webTitle}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p style={{textAlign:"center"}}>Share via</p>
                                            <div style={{textAlign:"center"}}>  
                                                <FacebookShareButton style={{marginRight:"10px"}} url={this.props.newsCard.webUrl} hashtag="#CSCI_571_NewsApp">
                                                    <FacebookIcon size={32} round={true}/>
                                                </FacebookShareButton>
                                                <TwitterShareButton style={{marginRight:"10px"}} url={this.props.newsCard.webUrl} hashtags={["CSCI_571_NewsApp"]}>
                                                    <TwitterIcon size={32} round={true}/>
                                                </TwitterShareButton>
                                                <EmailShareButton url={this.props.newsCard.webUrl} subject="#CSCI_571_NewsApp">
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
                                <img src={flag==-1 ? "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png" : cardImageUrl} width="100%" height="150px"></img>
                                <br></br>
                                <br></br>
                                {/* <Card.Text>
                                    <Truncate lines={3} ellipsis={<span>...</span>}>
                                        {this.props.newsCard.blocks.body[0].bodyTextSummary}
                                    </Truncate>
                                </Card.Text> */}
                                {/* <LinesEllipsis
                                    text={this.props.newsCard.blocks.body[0].bodyTextSummary}
                                    // onReflow={this.handleReflow}
                                    maxLine={3}
                                /> */}
                                
                                {/* <p>{this.props.newsCard.blocks.body[0].bodyTextSummary}</p> */}
                                <Row>
                                    <Col style={{textAlign:"left"}} xs="6" sm="6" md="6" lg="6" xl="6">
                                        <p>
                                            {
                                                this.props.newsCard.webPublicationDate.slice(0,this.props.newsCard.webPublicationDate.indexOf("T"))

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
            </Col>

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

export default MySearchGuardianNewsCard