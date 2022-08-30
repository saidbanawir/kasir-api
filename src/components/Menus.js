import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

const Menus = ({ menu, addCart }) => {
    return (
        <Col md={4} xs={6} className="mb-3">
            <Card className="shadow" onClick={()=>addCart(menu)} style={{ cursor:'pointer' }}>
                <Card.Img variant="top" src={"assets/images/" + menu.categories.nama.toLowerCase() + "/" + menu.gambar} />
                <Card.Body>
                    <Card.Title>{menu.nama}</Card.Title>
                    <Card.Text>
                        Rp. {numberWithCommas(menu.harga)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Menus