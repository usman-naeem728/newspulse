import React, { useEffect, useState } from 'react'
import Newsitem from './newsitem'
import Spinner from './spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResult, setTotalResult] = useState(0)
  const mode = props.mode
  // const query = props.searchquery

  const captalizedFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  document.title = `${captalizedFirstLetter(props.category)} - News Pulse`

  const updateNews = async (pageNo) => {
    props.setProgress(10);
    if(props.searchquery == ""){
    var url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    }else{
    var url =  `https://newsapi.org/v2/top-headlines?q=${props.searchquery}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    }
    
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(70)
    let parsedData = await data.json()
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResult(parsedData.totalResult)
    setLoading(false)
    props.setProgress(100)
  }


  useEffect(() => {
    updateNews();
  }, [props.searchquery])


  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // }
  // handlePrevClick = async () => {

  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // }

  const fetchMoreData = async () => {
    if(props.searchquery == ""){
      var url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    }else{
      var url =  `https://newsapi.org/v2/top-headlines?q=${props.searchquery}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
    }
    setPage(page+1)
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResult(parsedData.totalResults)
    setLoading(false)
  };

  return (
    <div>

      <div className='container my-3'>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResult}
          loader={loading && <Spinner />}
        >

          <div className='container'>


            <div className='row'>
              {articles.map((element) => {
                return (
                  <div className='col-md-4 my-3'>
                    <Newsitem title={element.title ? element.title.slice(0, 45) : " "} description={element.description ? element.description.slice(0, 88) : " "}
                      imgUrl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} isMode={mode} />
                  </div>
                )
              })}
            </div>
          </div>
          {/* 
          pervious next buttons

          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &larr;
              Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>
          </div> */}
        </InfiniteScroll>
      </div>

    </div>
  )

}

News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
export default News