import axios from 'axios';
import React, { Component } from 'react';
import { Badge, Col, ListGroup, Row, Card } from 'react-bootstrap';
import swal from 'sweetalert';
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';
import ModalCart from './ModalCart';
import TotalBayar from './TotalBayar';

export default class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            cartDetail: false,
            jumlah: 0,
            totalHarga:0,
        };
    }

    handleShow = (menuCart) => {
        this.setState({
            showModal: true,
            cartDetail: menuCart,
            jumlah: menuCart.qty,
            totalHarga: menuCart.total_price,
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    tambah=()=>{
        this.setState({
            jumlah:this.state.jumlah+1,
            totalHarga:this.state.cartDetail.product.harga*(this.state.jumlah+1)
        })
    }

    kurang=()=>{
        if(this.state.jumlah !== 1){
            this.setState({
                jumlah:this.state.jumlah-1,
                totalHarga:this.state.cartDetail.product.harga*(this.state.jumlah-1)
            })
        }
    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.handleClose();
        const data = {
            qty:this.state.jumlah,
            total_price:this.state.totalHarga,
            product:this.state.cartDetail.product,
        };
        axios
        .put(API_URL+"carts/"+this.state.cartDetail.id, data)
        .then((res)=>{
            this.props.getListCart();
            swal({
                title: "Sucess",
                text: data.product.nama + " has been updated.",
                icon: "success",
                button: "Ok",
                timer:2500,
            });
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    hapusPesanan=(id)=>{
        this.handleClose();
        axios
        .delete(API_URL+"carts/"+id)
        .then((res)=>{
            this.props.getListCart();
            swal({
                title:"Deleted",
                text:this.state.cartDetail.product.nama +" has been deleted.",
                icon:"error",
                button:"Ok",
                timer:2500,
            });
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    render() {
        const { carts } = this.props;
        return (
            <Col md={3}>
                <h4><strong>List Harga</strong></h4>
                <hr />
                {carts.length !== null && (
                    <Card className="overflow-auto hasil">
                        <ListGroup variant="flush" as="ol">
                        {carts.map((menuCart) => (
                            <ListGroup.Item as="li" key={menuCart.id} onClick={() => this.handleShow(menuCart)}>
                                <Row xs={2}>
                                    <Col><Badge pill bg="success">{menuCart.qty}</Badge></Col>
                                    <Col><strong>{menuCart.product.nama}</strong><br />
                                        Rp. {numberWithCommas((menuCart.product.harga))}</Col>
                                    <Col className="float-right">Rp. {numberWithCommas((menuCart.total_price))}</Col>
                                </Row>
                            </ListGroup.Item>
                        ))}

                        <ModalCart 
                        handleClose={this.handleClose} 
                        {...this.state} 
                        tambah={this.tambah} 
                        kurang={this.kurang} 
                        handleSubmit={this.handleSubmit} 
                        hapusPesanan={this.hapusPesanan}
                        />
                    </ListGroup>
                    </Card>
                    
                )}
                <TotalBayar carts={carts} {...this.props} />
            </Col>
        );
    }
}
