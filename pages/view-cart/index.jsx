import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../../components/Loading';
import PageWrapper from '../../components/PageWrapper';

// use state to update page

const ViewCart = ({ cart, data }) => {
  if (!cart || !data) {
    <div
      style={{ height: '80vh' }}
      className="w-100 d-flex justify-content-center align-items-center"
    >
      <Loading data={cart} />
    </div>;
  }

  const [currentCart, setCurrentCart] = useState(cart);
  const [isCartEmpty, setCartToEmpty] = useState();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    currentCart ? setCartToEmpty(false) : setCartToEmpty(true);
  }, [currentCart]);

  const handleRemoveFromCart = (id) => {
    const updatedCart = currentCart;

    delete updatedCart[id];

    setCurrentCart(updatedCart);

    if (Object.keys(updatedCart).length === 0) {
      sessionStorage.removeItem('cart');
      setCartToEmpty(true);
    } else sessionStorage.setItem('cart', JSON.stringify(currentCart));
  };

  if (currentCart === null || isCartEmpty === true) {
    return (
      <PageWrapper data={data}>
        <div
          style={{ height: '80vh' }}
          className="w-100 d-flex justify-content-center align-items-center"
        >
          <p className="text-light">Nothing in your cart!</p>
        </div>
      </PageWrapper>
    );
  }
  return (
    <PageWrapper data={data}>
      <Container>
        <Row>
          <Col xs={8}>
            <h2 className="text-light">Product</h2>
          </Col>
          <Col xs={2}>
            <h2 className="text-light">Price</h2>
          </Col>
          <Col xs={2} className="d-flex">
            <h2 className="text-light">Qty</h2>
          </Col>
        </Row>
        {Object.keys(currentCart).map((i) => (
          <Row className="d-flex align-items-center justify-content-between">
            <Col xs={3}>
              <div style={{ background: '#fff' }}>
                <img
                  style={{ height: '150px', width: '150px' }}
                  src={currentCart[i].productImages[0]}
                  alt={currentCart[i].productTitle}
                />
              </div>
            </Col>
            <Col xs={5}>
              <h2 className="text-light">{currentCart[i].productTitle}</h2>
            </Col>
            <Col xs={2}>
              <h3 className="text-light">{currentCart[i].productPrice}</h3>
            </Col>
            <Col xs={2} className="d-flex">
              <h3 className="text-light mr-4">{currentCart[i].qty}</h3>
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => {
                  handleRemoveFromCart(i);
                }}
              >
                X
              </button>
            </Col>
          </Row>
        ))}
        <Row>
          <Link className="btn btn-outline-light" href="/checkout">
            <button type="button" className="btn btn-outline-light">
              Checkout
            </button>
          </Link>
        </Row>
      </Container>
    </PageWrapper>
  );
};

ViewCart.propTypes = {
  // eslint-disable-next-line react/require-default-props
  cart: PropTypes.shape({}),
  data: PropTypes.shape({}).isRequired,
};

export default ViewCart;