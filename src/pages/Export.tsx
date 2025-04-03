// This file exports the book list to a json file
// Should change it to so user can enter the name of the file
// and the file will be saved with that name

import { exportDB } from 'dexie-export-import';
import { db } from '../models/db';

export const Export = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold'>Export</h1>
      <p className='text-gray-600'>Export your book list to a json file.</p>
      <button
        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded'
        onClick={async () => {
          // Logic to export the book list to json
          // Configure exportLink

          try {
            const blob = await exportDB(db, {
              prettyJson: true,
              progressCallback: (progress) => {
                console.log('Export progress:', progress);
                return true;
              }
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'dexie-export.json';
            a.click();
            URL.revokeObjectURL(url);
          } catch (error) {
            console.error('Error exporting database:', error);
          }
        }}
      >
        Export to JSON
      </button>
    </div>
  );
};
