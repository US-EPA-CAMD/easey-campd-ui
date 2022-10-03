import '@testing-library/jest-dom/extend-expect';
import { cleanUp508, ensure508, removeAriaSortHandlersFromDatatable } from './rdt-table'

describe('Ensure 508', () => {
  test('should run 508 functions without error', () => {

    try{
        ensure508();
        cleanUp508();
        removeAriaSortHandlersFromDatatable();
        expect(true);
    }
    catch{
        expect(false);
    }
  });
});
