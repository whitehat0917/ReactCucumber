import * as Papa from 'papaparse';

export const parse = (file) => new Promise((resolve) => {
  Papa.parse(file, {
    header: true,
    complete: resolve,
    skipEmptyLines: true,
  });
});

export const unparse = (data) => Papa.unparse(data, {
  header: true,
});
