import React from 'react'
import img from './imgnotfound.jpg'
import moment from 'moment/moment';

const Newsitem = (props) => {

  let { title, description, imgUrl, url, author, date, isMode } = props

  return (
    
    <div >
      <div className="card" style={{
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        backgroundColor: isMode ? "white" : "black",
        color: isMode ? "black" : "white"
      }}>
        <img src={!imgUrl ? img : imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">published by {!author ? "unkown" : author} on {moment(date).format('MMMM Do YYYY, h:mm a')}</small></p>
          <a href={url} target='-blank' className="btn btn-success">Read more</a>
        </div>

      </div>
    </div>
  )

}
export default Newsitem
