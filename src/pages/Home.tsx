import React from 'react';
import { Save } from 'react-feather';
import { Converter } from 'showdown';
import Header from '../components/Header';
import Modal, { IModalRef } from '../components/Modal';
import { useTemplates } from '../context/Templates';

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
    const { addTemplate } = useTemplates();

    const convertedContent = React.useMemo(() => {
        return {
        __html: converter.makeHtml(content)
        }
    }, [content]);

    const modalRef = React.useRef<IModalRef>(null);

    const handleSaveTemplate = (data: any) => {
        addTemplate(data);
    }

    return (
        <>
            <Header />
            <Modal ref={modalRef} onSubmit={handleSaveTemplate} />
            <section className="flex flex-col flex-grow editor">
                <h2 className='mb-8 text-2xl font-bold'>Editor</h2>
                <div className="grid flex-grow grid-cols-2 gap-8">
                    <div className="flex flex-col p-6 pt-4 bg-white rounded-lg dark:bg-dark-lighter">
                        <div className="flex justify-between mb-4 w-full">
                            <div className="p-1 px-2 rounded bg-tint w-fit">Editor</div>
                            <button onClick={() => modalRef.current?.open()}>
                                <Save className="text-primary" />
                            </button>
                        </div>
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
