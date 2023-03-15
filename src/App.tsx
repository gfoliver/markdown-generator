import React from 'react';
import {Sun, Moon} from 'react-feather';
import { Converter } from 'showdown';

const converter = new Converter({
  tasklists: true,
  ghCompatibleHeaderId: true,
  tables: true,
  strikethrough: true,
  smoothLivePreview: true,
  requireSpaceBeforeHeadingText: true,
  ghMentions: true,
  ghCodeBlocks: true,
  emoji: true,
});

converter.setFlavor('github');

function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    const isDarkMode = localStorage.getItem('isDarkMode');
    if (isDarkMode !== undefined)
      return isDarkMode === 'true';

    return true;
  });

  React.useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode.toString());
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [content, setContent] = React.useState('# Markdown Generator');

  const convertedContent = React.useMemo(() => {
    return {
      __html: converter.makeHtml(content)
    }
  }, [content]);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="bg-light dark:bg-dark min-h-screen w-full text-text dark:text-text-dark flex flex-col">
        <div className="container mx-auto py-12 flex-grow flex flex-col">
          <header className="flex justify-between mb-12">
            <h1 className='font-bold text-3xl'>Markdown Generator</h1>
            <div className="flex items-center">
              <div className="group mr-8">
                <button className="bg-primary text-text-dark py-2 px-6 rounded">Editor</button>
                <button className="bg-white dark:bg-dark-lighter py-2 px-6 rounded">Templates</button>
              </div>
              <button className="p-2 px-3 rounded bg-white dark:bg-primary" onClick={toggleDarkMode}>
                {isDarkMode ? <Sun width="1rem" /> : <Moon width="1rem" />}
              </button>
            </div>
          </header>
          <section className="editor flex-grow flex flex-col">
            <h2 className='text-2xl mb-8 font-bold'>Editor</h2>
            <div className="grid grid-cols-2 gap-8 flex-grow">
              <div className="bg-white dark:bg-dark-lighter rounded-lg pt-4 p-6 flex flex-col">
                <div className="bg-tint rounded w-fit p-1 px-2 mb-4">Editor</div>
                <textarea className="bg-tint rounded-lg p-6 w-full flex-grow resize-none" onChange={e => setContent(e.target.value)}>{content}</textarea>
              </div>
              <div className="bg-white dark:bg-dark-lighter rounded-lg pt-4 p-6 flex flex-col">
                <div className="bg-tint rounded w-fit p-1 px-2 mb-4">Preview</div>
                <div className="bg-tint rounded-lg p-6 w-full flex-grow">
                  <div className="converted" dangerouslySetInnerHTML={convertedContent}></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
