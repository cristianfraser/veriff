import React, { useCallback, useEffect, useState } from 'react';

import { useFetchChecksQuery } from '../../api';
import Button from '../Button/Button';
import CheckItem from '../../components/CheckItem/CheckItem';
import { OPTIONS } from '../../components/OptionSelect/OptionSelect';

import styles from './ChecksForm.module.css';

export default function ChecksForm({
  onSubmit,
  disabled,
}: {
  onSubmit: (inputs: any) => void;
  disabled: boolean;
}) {
  const { checks, isLoading } = useFetchChecksQuery();
  const [inputs, setInputs] = useState({} as { [x: string]: any });
  const [activeIndex, setActive] = useState(-1);

  const sortedChecks = [...checks].sort(
    (checkA, checkB) => checkA.priority - checkB.priority
  );

  const handleOptionSelect = (name: string, value: string) => {
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const enabledChecks = sortedChecks.filter((check) => {
    const disabled = checks
      .filter((c) => c.priority < check.priority)
      .some((c) => inputs[c.id] !== OPTIONS.yes);
    return !disabled;
  });

  const handleKeyPress = useCallback(
    (event: any) => {
      if (event.key === 'ArrowDown') {
        setActive((prev) => (prev < enabledChecks.length - 1 ? prev + 1 : 0));
      } else if (event.key === 'ArrowUp') {
        setActive((prev) => (prev > 0 ? prev - 1 : enabledChecks.length - 1));
      } else if (event.keyCode === 49) {
        // press 1
        handleOptionSelect(
          sortedChecks[activeIndex].id.toString(),
          OPTIONS.yes
        );
      } else if (event.keyCode === 50) {
        // press 2
        handleOptionSelect(sortedChecks[activeIndex].id.toString(), OPTIONS.no);
      }
    },
    [setActive, enabledChecks, activeIndex, sortedChecks]
  );

  useEffect(() => setActive(-1), [checks.length]);
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [checks.length, activeIndex, handleKeyPress]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    onSubmit(inputs);
  };

  const enableSubmit =
    !disabled &&
    (checks.some((c) => inputs[c.id] === OPTIONS.no) ||
      checks.every((c) => inputs[c.id] === OPTIONS.yes));

  return isLoading ? (
    <>Loading</>
  ) : (
    <form onSubmit={handleSubmit}>
      {sortedChecks.map((check, index) => {
        const disabled = checks
          .filter((c) => c.priority < check.priority)
          .some((c) => inputs[c.id] !== OPTIONS.yes);
        return (
          <CheckItem
            key={check.id}
            value={inputs[check.id]}
            onChange={handleOptionSelect}
            disabled={disabled}
            check={check}
            setActive={() => setActive(index)}
            isActive={index === activeIndex}
          />
        );
      })}
      <div className={styles.submitContainer}>
        <Button className={styles.submit} disabled={!enableSubmit}>
          Submit
        </Button>
      </div>
    </form>
  );
}
