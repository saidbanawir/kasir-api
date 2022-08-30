import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/constants';

export default class Sukses extends Component {

    componentDidMount(){
        axios
        .get(API_URL+"carts")
        .then((res)=>{
            const carts = res.data;
            carts.map(function(item){
                return axios
                .delete(API_URL+"carts/"+item.id)
                .then((res)=>console.log(res))
                .catch((error)=>console.log(error))
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }

  render() {
    return (
      <div className="text-center">
      <div>Sukses</div>
      <Button variant="primary" as={Link} to="/">Back</Button>
      </div>
    )
  }
}
