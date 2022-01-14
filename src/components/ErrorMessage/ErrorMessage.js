import PropTypes from 'prop-types';

export default function ErrorMessage({ message }) {
  const style = {
    color: 'red',
    textAlign: 'center',
  };
  return <p style={style}>{message}</p>;
}
ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: null,
};
