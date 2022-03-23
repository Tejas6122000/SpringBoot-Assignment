import { render } from '@testing-library/react'
import React, { Component,useCallback,useState,useEffect } from 'react'
import  { Redirect } from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import ViewArticle from './ViewArticle';
class HomePage extends Component{

  constructor(props) {
    super(props);

    this.state = {
        articles: [],
        DataisLoaded: false
    };
}



  componentDidMount() {

    const reloadCount = sessionStorage.getItem('reloadCount');
    if(reloadCount < 2) {
      sessionStorage.setItem('reloadCount', String(reloadCount + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }

    fetch('http://localhost:8080/blogs', {
      method: 'GET',
      headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
    })
    .then(response=>response.json())
    .then((json) => {
      this.setState({
          articles: json,
          DataisLoaded: true
      });
  })
  
  }
  


  render()
  {
    if(localStorage.getItem('username')){
    const { DataisLoaded, articles } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait </h1> </div> ;
    
    if (articles.length==0) return <div>
        <h1> No Articles Found</h1> </div> ;
  
    return (
    <div>
        <div>
        {articles.map((article) => (
        <ViewArticle
          title={article.title}
          text={article.body}
          author={article.createdby}
        />
      ))}
    </div>
    </div>
    )
    }
    
    else{
      const { DataisLoaded, articles } = this.state;
      if (!DataisLoaded) return <div>
          <h1> Pleses wait </h1> </div> ;
  
    if (articles.length==0) return <div>
      <h1>You are Not logged In</h1> </div> ;
    
    return (<h1 className='login'>You are Not Logged In!</h1>)
    }
  }
}

export default HomePage