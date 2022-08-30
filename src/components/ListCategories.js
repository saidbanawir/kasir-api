import { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookQuran } from '@fortawesome/free-solid-svg-icons';

const Icon = ({ nama }) => {
    if (nama === "Alat Tulis") return <FontAwesomeIcon icon={faBook} className="mt-2" />
    if (nama === "Kitab") return <FontAwesomeIcon icon={faBookQuran} className="mt-2" />
}

export default class ListCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        axios
            .get(API_URL + "categories")
            .then((res) => {
                const categories = res.data;
                this.setState({ categories });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { categories } = this.state
        const { changeCategory, categorySelect } = this.props
        return (
            <Col md={2} mt="2">
                <h4><strong>List Categories</strong></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item 
                        key={category.id} 
                        onClick={() => changeCategory(category.nama)}
                        className={categorySelect === category.nama && "category-active"}
                        style={{ cursor:'pointer' }}
                        >
                            <h5>
                                <Icon nama={category.nama} /> {category.nama}
                            </h5>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        )
    }
}