import PropTypes from 'prop-types';
import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message }) {
  return <p className={styles.content}>{message}</p>;
}
ErrorMessage.propTypes = {
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: null,
};
