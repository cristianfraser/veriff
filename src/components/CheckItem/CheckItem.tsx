import classNames from 'classnames';
import React from 'react';
import OptionSelect from '../OptionSelect/OptionSelect';

import styles from './CheckItem.module.css';

const CheckItem = ({
  check,
  disabled,
  onChange,
  value,
  setActive,
  isActive,
}: {
  check: any;
  disabled: boolean;
  onChange: (name: string, value: string) => void;
  setActive: () => void;
  value?: string;
  isActive: boolean;
}) => {
  return (
    <fieldset
      className={classNames(styles.container, {
        [styles.active]: isActive,
        [styles.disabled]: disabled,
      })}
      onClick={setActive}
    >
      <p className={styles.description}>{check.description}</p>
      <div>
        <OptionSelect
          onChange={(value) => {
            onChange(check.id, value);
          }}
          value={value}
          disabled={disabled}
        />
      </div>
    </fieldset>
  );
};

export default CheckItem;
