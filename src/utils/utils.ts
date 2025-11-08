import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

export default class Utils {
  static readCsv(filename: string, hasHeader = true): SharedArray<any> {
    const filePath = `../../resources/csv/${filename}`;
    try {
      const retorno = new SharedArray(filename, function () {
        const fileContent = open(filePath);
        const data = papaparse.parse(fileContent, {
          header: hasHeader,
          skipEmptyLines: true,
        });
        return data.data;
      });
      return retorno;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Error reading CSV file: ${filePath}. Error: ${errorMessage}`);
      throw error;
    }
  }

  static readTxt(filename: string): SharedArray<string> {
    const filePath = `../../resources/txt/${filename}`;
    try {
      const retorno = new SharedArray(filename, function () {
        const fileContent = open(filePath);
        return fileContent.split('\n').map(line => line.trim()).filter(line => line !== '');
      });
      return retorno;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error(`Error reading TXT file: ${filePath}. Error: ${errorMessage}`);
      return new SharedArray('empty', function () { return []; });
    }
  }
}
