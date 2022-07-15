import { useEffect } from 'react';

import { useSubmitCheckResults } from './api';
import ChecksForm from './components/ChecksForm/ChecksForm';
import { OPTIONS } from './components/OptionSelect/OptionSelect';

import './styles.css';

export default function App() {
  const submit = useSubmitCheckResults();

  const handleSubmit = (inputs: { checkId: string; value: OPTIONS }[]) => {
    return submit.mutate(inputs);
  };

  useEffect(() => {
    if (submit.isError) {
      alert('Error submitting form. Try again.');
    }

    if (submit.isSuccess) {
      alert('Success!');
    }
  }, [submit.isError, submit.isSuccess]);

  return (
    <div className="App">
      <ChecksForm onSubmit={handleSubmit} disabled={submit.isLoading} />
    </div>
  );
}
