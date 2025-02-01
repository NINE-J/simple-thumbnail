import { useLqip } from 'context/LqipContext';

const CodeBlock = () => {
  const { lqip } = useLqip();

  return (
    <>
      <textarea value={lqip} readOnly style={{ resize: 'none', width: '100%', height: '200px' }} />
    </>
  );
};

export default CodeBlock;
