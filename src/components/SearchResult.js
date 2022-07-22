import React, {Component, Fragment} from "react";
import './../App.css';
import axios from 'axios'
import HTMLRenderer from 'react-html-renderer'

class SearchResult extends Component{
    constructor(props){
        super(props)
        const { history } = this.props
        const { location } = history
        const { post_id } = location.state || {}
        console.log('post_id', post_id)
        this.state = {
            loading: false,
            searched_data: {},
            post_comment: [],
            post_id
        }

    }
    componentDidMount() {
        const {post_id} = this.state
        // if(post_id){
        //     this.getSearchDataResult()
        // }
        this.getSearchDataResult()
    }

    getSearchDataResult =()=> {
        const {post_id} = this.state
        this.setState({ loading: true })
        let url = `${`https://jsonplaceholder.typicode.com/posts/${post_id}`}`
        axios.get(url)
            .then((response)=>{
                const {data} = response
                debugger
                this.setState({searched_data: data, loading: false })
            })
            .catch(errors => console.log('Not found'))
    }

    render(){
        const {searched_data, loading} = this.state
        const {id, userId, body, title} = searched_data || {}
        return(
            <div className="container p-5">
                <div className="row">
                    <div className="col-xl-10 m-auto">
                        {loading &&
                        <div className="d-flex justify-content-center form-box">
                            <div className="spinner-grow text-danger" role="status" style={{width:'60px', height:'60px'}}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        }
                        <h1 className="text-center mb-4">Post Result</h1>
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <img src={`https://wizcounsel.s3.amazonaws.com/product_photo/182/Backend-development.jpg`} className="card-img-top mb-3" alt={title}/>
                                <span className="badge bg-success">#{id}</span>
                                <h5 className="card-title text-capitalize text-info">{title}</h5>
                                <p className="card-text">{body}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default SearchResult
