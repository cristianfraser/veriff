import classNames from 'classnames';
import React from 'react';

import styles from './OptionSelect.module.css';

export enum OPTIONS {
  yes = 'yes',
  no = 'no',
}

const OptionSelect = ({
  value,
  onChange,
  disabled,
}: {
  value?: string;
  onChange: (value: OPTIONS) => void;
  disabled?: boolean;
}) => {
  return (
    <div
      className={classNames(styles.container, { [styles.disabled]: disabled })}
    >
      <button
        type="button"
        className={classNames(styles.button, {
          [styles.selected]: value === OPTIONS.yes,
          [styles.disabled]: disabled,
        })}
        onClick={() => {
          onChange(OPTIONS.yes);
        }}
      >
        Yes
      </button>
      <button
        type="button"
        className={classNames(styles.button, {
          [styles.selected]: value === OPTIONS.no,
          [styles.disabled]: disabled,
        })}
        onClick={() => {
          onChange(OPTIONS.no);
        }}
      >
        No
      </button>
    </div>
  );
};

export default OptionSelect;
