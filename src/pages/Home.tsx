import React from 'react';
import { Converter } from 'showdown';
import Header from '../Header';

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

function Home() {
  const [content, setContent] = React.useState('# Markdown Generator');

  const convertedContent = React.useMemo(() => {
    return {
      __html: converter.makeHtml(content)
    }
  }, [content]);

    return (
        <>
            <Header />
            <section className="flex flex-col flex-grow editor">
                <h2 className='mb-8 text-2xl font-bold'>Editor</h2>
                <div className="grid flex-grow grid-cols-2 gap-8">
                    <div className="flex flex-col p-6 pt-4 bg-white rounded-lg dark:bg-dark-lighter">
                    <div className="p-1 px-2 mb-4 rounded bg-tint w-fit">Editor</div>
                    <textarea className="flex-grow p-6 w-full rounded-lg resize-none bg-tint" onChange={e => setContent(e.target.value)} defaultValue={content} />
                    </div>
                    <div className="flex flex-col p-6 pt-4 bg-white rounded-lg dark:bg-dark-lighter">
                    <div className="p-1 px-2 mb-4 rounded bg-tint w-fit">Preview</div>
                    <div className="flex-grow p-6 w-full rounded-lg bg-tint">
                        <div className="converted" dangerouslySetInnerHTML={convertedContent}></div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
