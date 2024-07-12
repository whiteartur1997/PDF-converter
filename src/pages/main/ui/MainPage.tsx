import { Button } from '@/shared/ui/Button';
import { FC, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { backendBaseUrl } from '@/shared/api';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

export const MainPage: FC = () => {
  const [_, setNumPages] = useState<number>();
  const [textAreaValue, setTextAreaValue] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [generatedFile, setGeneratedFile] = useState<null | Blob>(null);
  const convertToPDFHandler = async () => {
    if (textAreaValue.length === 0) {
      setError('The textarea is empty');
      return;
    }
    try {
      const res = await fetch(backendBaseUrl, {
        method: 'POST',
        body: JSON.stringify({ text: textAreaValue }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('here', res.ok);
      if (!res.ok) {
        throw new Error(`Unable to Fetch Data, Please check URL or Network connectivity!!`);
      }
      const data = await res.blob();
      console.log('data', data);
      setGeneratedFile(data);
    } catch (err) {
      console.log('err', err);
      setError(err as string);
    }
  };

  const documentLoadSuccessHandler = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="container py-10 grid grid-cols-2 gap-12">
      <div className="flex justify-start flex-col gap-1">
        <textarea
          value={textAreaValue}
          onChange={(event) => setTextAreaValue(event.target.value)}
          className="h-28 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        ></textarea>
        <Button onClick={convertToPDFHandler}>Convert</Button>
      </div>
      <Document file={generatedFile} onLoadSuccess={documentLoadSuccessHandler} options={options}>
        <Page height={300} pageNumber={1} />
      </Document>
      {error && <h1>Error</h1>}
    </div>
  );
};
