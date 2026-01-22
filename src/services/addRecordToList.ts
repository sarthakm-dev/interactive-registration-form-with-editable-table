import { type RecordData } from '.././types/record';

export function addRecordToList(records: RecordData[], record: RecordData): RecordData[] {
  return [...records, record];
}