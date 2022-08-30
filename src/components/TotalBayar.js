import { faMoneyBill1Wave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';

export default class TotalBayar extends Component {
    submitTotalBayar=(totalBayar)=>{
        const histori={
            total_price:totalBayar,
            menus:this.props.carts
        }
        axios.post(API_URL+"historys",histori)
        
    };

    render() {
        const totalBayar = this.props.carts.reduce(function (result, item) {
            return result + item.total_price;
        }, 0);

        return (
            <>
            {/* web */}
                <div className="fixed-bottom d-none d-md-block">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h5>Total Harga : <strong style={{ float:"right" }}>Rp. {numberWithCommas(totalBayar)}</strong></h5>
                        <Button variant="success" className="mb-2" style={{ display:"block" }}
                        onClick={()=>this.submitTotalBayar(totalBayar)}
                        as={Link}
                        to="/sukses"
                        ><FontAwesomeIcon icon={faMoneyBill1Wave} /> Bayar</Button>
                    </Col>
                </Row>
            </div>

            {/* mobile */}
            <div className="d-sm-block d-md-none">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h5>Total Harga : <strong style={{ float:"right" }}>Rp. {numberWithCommas(totalBayar)}</strong></h5>
                        <Button variant="success" className="mb-2" style={{ display:"block" }}
                        onClick={()=>this.submitTotalBayar(totalBayar)}
                        as={Link}
                        to="/sukses"
                        ><FontAwesomeIcon icon={faMoneyBill1Wave} /> Bayar</Button>
                    </Col>
                </Row>
            </div>
            </>
        )
    }
}
