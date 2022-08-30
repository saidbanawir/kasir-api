import React, { Component } from "react";
import { Row, Col, Container } from 'react-bootstrap';
import Hasil from "../components/Hasil";
import ListCategories from "../components/ListCategories";
import Menus from "../components/Menus.js";
import { API_URL } from "../utils/constants";
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      categorySelect: [],
      carts:[],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "products")
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(API_URL+"carts")
      .then((res)=>{
        const carts=res.data;
        this.setState({carts});
      })
      .catch((error)=>{
        console.log(error);
      });
  }
  
//   componentDidUpdate(prevState){
//     if(this.state.carts !== prevState.carts){
//       axios
//       .get(API_URL+"carts")
//       .then((res)=>{
//         const carts=res.data;
//         this.setState({carts});
//       })
//       .catch((error)=>{
//         console.log(error);
//       });
//     }
//   }

  getListCart=()=>{
    axios
      .get(API_URL+"carts")
      .then((res)=>{
        const carts=res.data;
        this.setState({carts});
      })
      .catch((error)=>{
        console.log(error);
      });
  }

  changeCategory = (value) => {
    this.setState({
      categorySelect: value,
      menus: [],
    })

    axios
      .get(API_URL + "products?categories.nama=" + value)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  addCart = (value) => {
    axios
      .get(API_URL + "carts?product.id=" + value.id)
      .then(res => {
        if (res.data.length === 0) {
          const menuCart = {
            qty: 1,
            total_price: value.harga,
            product: value,
          };

          axios
            .post(API_URL + "carts", menuCart)
            .then(res => {
                this.getListCart();
              swal({
                title: "Success",
                text: menuCart.product.nama + " add to cart.",
                icon: "success",
                button: "Ok",
                timer:2500,
              });
            })
            .catch((error) => {
              console.log(error);
            })
        } else {
          const menuCart = {
            qty: res.data[0].qty + 1,
            total_price: res.data[0].total_price + value.harga,
            product: value,
          };

          axios
            .put(API_URL + "carts/"+res.data[0].id, menuCart)
            .then((res) => {
                this.getListCart();
              swal({
                title: "Sucess",
                text: menuCart.product.nama + " has been added.",
                icon: "success",
                button: "Ok",
                timer:2500,
              });
            })
            .catch((error) => {
              console.log(error);
            });

        };
      })
  }

  render() {
    const { menus, categorySelect, carts } = this.state
    return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories changeCategory={this.changeCategory} categorySelect={categorySelect} />
              <Col>
                <h4><strong>List Product</strong></h4>
                <hr />
                <Row>
                  {menus && menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      addCart={this.addCart}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil carts={carts} {...this.props} getListCart={this.getListCart} />
            </Row>
          </Container>
        </div>
    )
  }
}
