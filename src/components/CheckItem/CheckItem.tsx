import classNames from 'classnames';
import { Check } from '../../types';
import OptionSelect, { OPTIONS } from '../OptionSelect/OptionSelect';

import styles from './CheckItem.module.css';

const CheckItem = ({
  check,
  disabled,
  onChange,
  value,
  setActive,
  isActive,
}: {
  check: Check;
  disabled: boolean;
  onChange: (name: string, value: OPTIONS) => void;
  setActive: () => void;
  value?: string;
  isActive: boolean;
}) => {
  return (
    <fieldset
      data-testid="check-item"
      className={classNames(styles.container, {
        [styles.active]: isActive,
        [styles.disabled]: disabled,
      })}
      onClick={setActive}
    >
      <label className={styles.description}>{check.description}</label>
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
