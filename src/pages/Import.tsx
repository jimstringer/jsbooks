import { importInto } from 'dexie-export-import';
import { db } from '../models/db';

export const Import = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Import</h1>
      <p className='text-gray-600'>Import your book list from a json file.</p>
      <input
        type='file'
        accept='.json'
        className='mt-4'
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
              const content = e.target?.result;
              if (content) {
                // Logic to import the book list from json
                try {
                  //const json = JSON.parse(content as string);
                  // Assuming you have a function to handle the import
                  // handleImport(json);
                  const blob = new Blob([content], {
                    type: 'application/json'
                  });
                  await db.delete({ disableAutoOpen: false });
                  await importInto(db, blob, {
                    progressCallback: (progress) => {
                      console.log('Import progress:', progress);
                      return true;
                    }
                  });
                  console.log('Imported data:');
                } catch (error) {
                  console.error('Error parsing JSON:', error);
                }
              }
            };
            reader.readAsText(file);
          }
        }}
      />
    </div>
  );
};
