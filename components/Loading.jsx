import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

const Loading = ({ data }) => {
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    if (data) setLoader(false);
  }, [data]);

  return <>{loading ? <Spinner animation="grow" variant="warning" /> : null}</>;
};

Loading.propTypes = {
  // eslint-disable-next-line react/require-default-props
  data: PropTypes.shape({}),
};

export default Loading;
