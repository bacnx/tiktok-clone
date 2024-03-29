import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './Menu.module.scss';
import { Box as PopperBox } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

const defaultFn = () => { };

function Menu({ children, items = [], delay, hideOnClick = false, onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  // useEffect: items change, but history not re-set
  useEffect(() => {
    setHistory([{ data: items }]);
  }, [items]);

  const handleReset = () => {
    setHistory((prev) => [prev[0]]);
  };

  const renderItems = () => {
    return current.data.map((item, index) => (
      <MenuItem
        key={index}
        data={item}
        onClick={() => {
          const isParent = !!item.children;

          if (isParent) {
            setHistory((prev) => [...prev, item.children]);
          } else {
            onChange(item);
          }
        }}
      />
    ));
  };

  const renderMenu = (attrs) => (
    <PopperBox className={cx('menu-list')} tabIndex="-1" {...attrs}>
      {history.length > 1 && (
        <Header
          onBack={() => {
            setHistory((prev) => prev.slice(0, prev.length - 1));
          }}
        >
          {current.title}
        </Header>
      )}

      <div className={cx('menu-body')}>{renderItems()}</div>
    </PopperBox>
  );

  return (
    <Tippy
      interactive
      delay={delay && [0, 500]}
      offset={[16, 4]}
      hideOnClick={hideOnClick}
      placement="bottom-end"
      onHide={handleReset}
      render={renderMenu}
    >
      {children}
    </Tippy>
  );
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired,
  delay: PropTypes.bool,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Menu;
