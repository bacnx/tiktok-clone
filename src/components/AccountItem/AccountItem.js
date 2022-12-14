import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './AccountItem.module.scss';
import Avatar from '~/components/Avatar';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return (
    <Link className={cx('wrapper')} to={`/@${data.nickname}`}>
      <Avatar src={data.avatar} alt={data.full_name} className={cx('avatar')} />
      <div className={cx('info')}>
        <h4 className={cx('username')}>
          {data.nickname}
          {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
        </h4>
        <span className={cx('name')}>{data.full_name}</span>
      </div>
    </Link>
  );
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
