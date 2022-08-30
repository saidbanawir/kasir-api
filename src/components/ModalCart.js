import { faMinus, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

const ModalCart = ({ showModal, handleClose, cartDetail, jumlah, tambah, kurang, handleSubmit, totalHarga, hapusPesanan }) => {
    if (cartDetail) {

        return (
            <div>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{cartDetail.product.nama} <strong>Rp. {numberWithCommas(cartDetail.product.harga)}</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Jumlah :</Form.Label>
        <Button variant="primary" size="sm" onClick={()=>kurang()}>
            <FontAwesomeIcon icon={faMinus} />
        </Button>
        <strong>{" "}{jumlah}{" "}</strong>
        <Button variant="primary" size="sm" onClick={()=>tambah()}>
            <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Form.Group>
      <Form.Group><h4>
      <strong style={{ float:"right" }}>Rp. {numberWithCommas(totalHarga)}</strong>
      </h4>
      </Form.Group>
      <Button variant="primary" type="submit">
                Simpan
            </Button>
    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={()=>hapusPesanan(cartDetail.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                            Hapus
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ModalCart