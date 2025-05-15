import { useCallback, useState } from 'react';
import download from 'downloadjs';
import { toPng } from 'html-to-image';
import Loading from './Loading';
import { useLqip } from 'context/LqipContext';

interface Props {
  previewRef: React.RefObject<HTMLDivElement>;
}

function DownloadButton({ previewRef }: Props) {
  const [isLoad, setIsLoad] = useState(false);
  const { setLqip } = useLqip();

  const handleClick = useCallback(async () => {
    if (previewRef.current) {
      setIsLoad(true);
      const scaleFactor = 2;
      const canvasWidth = previewRef.current.offsetWidth * scaleFactor;
      const canvasHeight = previewRef.current.offsetHeight * scaleFactor;
      const options = {
        canvasWidth,
        canvasHeight,
      };
      const dataUrl = await toPng(previewRef.current, options);
      download(dataUrl, 'thumbnail.png');

      // Convert dataUrl to Blob
      const blob = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append('image', blob, 'thumbnail.png');

      // Upload image to server and get lqip
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setLqip(result.lqip);

      setIsLoad(false);
    }
  }, [previewRef?.current]);

  return (
    <>
      <button
        className="bg-primary-100 text-lighten text-md2 px-[20px] py-[10px] rounded-[100px] w-full flex flex-row justify-center gap-[5px] items-center mt-24 mb-16"
        onClick={handleClick}
      >
        {isLoad ? <Loading /> : null}
        이미지 다운로드
      </button>
    </>
  );
}

export default DownloadButton;
