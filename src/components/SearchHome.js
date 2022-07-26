import React, {Component, Fragment} from "react";
import './../App.css';
import axios from 'axios'
import $ from 'jquery'

class SearchHome extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            search_text: '',
            p_id: '',
            dataList: [],
            postList: [],
            current_page: 1,
            post_per_page: 12,
        }

    }
    componentDidMount() {
        this.getPostDataResult()
    }

    handleChange = (e) => {
        const {postList} = this.state
        const { value } = e.target
        console.log('value', value)
        const filterItem = postList.filter((currentElm)=> {
            return currentElm.title === value
        })

        this.setState({postList: filterItem})
    };
    getPostDataResult =()=> {
        const {post_id} = this.state
        this.setState({ loading: true })
        let url = `${`https://jsonplaceholder.typicode.com/posts`}`
        axios.get(url)
            .then((response)=>{
                const {data} = response
                const {children} = data
                this.setState({postList: data, loading: false })
            })
            .catch(errors => console.log('Not found'))
    }
    getSearchData =({search})=> {
        this.setState({ loading: true })
        let url = `${`http://hn.algolia.com/api/v1/search`}`
        if (search) {
            url += `?query=${search}/`
        }
        axios.get(url)
            .then((response)=>{
                const {data} = response
                const {hits} = data
                this.setState({dataList: hits, p_id: hits[0].objectID})
            })
            .catch(errors => console.log('Not found'))
    }
     pageChange =(page)=>{
            this.setState({current_page: page})
     }
    render(){
        const {postList, p_id, counter, loading, current_page, post_per_page} = this.state
        const indexOfLastPost = current_page * post_per_page
        const indexOfFirstPost = indexOfLastPost - post_per_page
        const currentPost = postList.slice(indexOfFirstPost, indexOfLastPost)
        let pageNumber = []
        for(let i = 1; i <= Math.ceil(postList.length / post_per_page); i++){
            pageNumber.push(i)
        }
        console.log('pageNumber', pageNumber)
        return(
            <div className="container p-5">
                {loading &&
                <div className="d-flex justify-content-center form-box">
                    <div className="spinner-grow text-danger" role="status" style={{width:'60px', height:'60px'}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                }
                {/*<div className="row">*/}
                    {/*<div className="col-xl-6 m-auto">*/}
                        {/*<div className="mb-5">*/}
                            {/*<div className="input-group mb-3 mt-4">*/}
                                {/*<input type="text" className="form-control" placeholder="Type keyword here..."*/}
                                       {/*aria-label="Recipient's username" aria-describedby="basic-addon2"*/}
                                {/*onChange={(e)=> {this.handleChange(e)}}*/}
                                       {/*onKeyDown={(e)=> {this.handleChange(e)}}*/}
                                {/*/>*/}
                                {/*<button className="btn btn-primary"*/}
                                        {/*onClick={() => {*/}
                                            {/*this.props.history.push({*/}
                                                {/*pathname: `${`/search-result`}/`,*/}
                                                {/*state: {post_id: p_id}*/}
                                            {/*})*/}
                                        {/*}}*/}
                                {/*>Search</button>*/}
                            {/*</div>*/}

                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <div className="row">
                    <div className="col-xl-12">
                        <h1 className="text-center mb-4">Post List</h1>
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                            {currentPost.map((singalPost, i)=>{
                            const {id, userId, body, title} = singalPost
                            return(
                                <div className="col">
                                <div className="card shadow mb-4 h-100" key={id} style={{cursor:'pointer'}}
                                     onClick={() => {
                                         this.props.history.push({
                                             pathname: `${`/post-result`}/${id}`,
                                             state: {post_id: id}
                                         })
                                     }}
                                >
                                    <div className="card-body">
                                        <img src={`https://wizcounsel.s3.amazonaws.com/product_photo/182/Backend-development.jpg`} className="card-img-top" alt={title}/>
                                        <span className="badge bg-success">#{id}</span>
                                        <h5 className="card-title text-capitalize text-info post-title">{title}</h5>
                                        <p className="card-text post-description">{body}</p>
                                    </div>
                                    <div className="card-footer" style={{background:'white'}}>
                                        <a className="card-link">Read Post</a>
                                    </div>
                                </div>
                                </div>

                            )
                        })}
                        </div>
                        <p className="card-title text-muted text-center  mt-5">You are on page  {current_page}</p>
                        <div className="d-flex justify-content-center">

                            <nav>
                                <ul className="pagination m-auto">
                                    {pageNumber.map((page, i)=>{
                                        return(
                                            <li className={`page-item ${current_page === page ? 'active' : ''}`} key={i}><a className="page-link" onClick={()=> this.pageChange(page)} style={{cursor: 'pointer'}}>{page}</a></li>
                                        )
                                    })}


                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default SearchHome
