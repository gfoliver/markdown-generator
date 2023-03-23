import React from 'react';
import { Download } from 'react-feather';
import Header from '../components/Header';
import { useTemplates } from '../context/Templates';

function Templates() {
    const { templates } = useTemplates();

    return (
        <>
            <Header />
            <section className="flex flex-col flex-grow editor">
                <h2 className='mb-8 text-2xl font-bold'>Templates</h2>
				<div className="grid grid-cols-4">
					{templates.map(template => (
						<div key={template.id} className="p-4 bg-white rounded rounded-lg dark:bg-dark-lighter">
							<h3 className="mb-2 text-xl font-bold">{template.title}</h3>
							<p>{template.description}</p>
							<div className="flex mt-8">
								<button className="flex-grow p-2 mr-2 font-bold leading-none rounded bg-primary">Use</button>
								<button className="flex-grow p-2 mr-2 font-bold leading-none rounded bg-primary">Edit</button>
								<button className="px-2 leading-none rounded bg-primary"><Download width={16} /></button>
							</div>
						</div>
					))}
				</div>
            </section>
        </>
    );
}

export default Templates;
