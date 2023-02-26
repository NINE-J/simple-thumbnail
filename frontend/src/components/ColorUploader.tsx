import { useState } from 'react';
import ColorGradation from './ColorGradation';
import ColorSingle from './ColorSingle';

const ColorUploader = () => {
  const [tab, setTab] = useState('1');
  const tabChanger = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const currentTab = (e.target as HTMLInputElement).value;
    setTab(currentTab);
  };
  return (
    <div>
      <div className="flex">
        <button
          className={`text-sm ${tab === '1' ? 'text-darken' : 'text-muted'}`}
          value="1"
          onClick={(e) => tabChanger(e)}
        >
          단색 배경
        </button>
        <button
          className={`text-sm ml-3 ${tab === '2' ? 'text-darken' : 'text-muted'}`}
          value="2"
          onClick={(e) => tabChanger(e)}
        >
          그라데이션 배경
        </button>
      </div>
      <div className="py-3">
        {tab === '1' && <ColorSingle />}
        {tab === '2' && <ColorGradation />}
      </div>
    </div>
  );
};
export default ColorUploader;
