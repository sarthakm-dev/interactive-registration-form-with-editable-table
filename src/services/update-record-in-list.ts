import { type RecordData } from '.././types/record';

export function updateRecordInList(
  records: RecordData[],
  index: number,
  updatedRecord: RecordData,
): RecordData[] {
  const newRecords = [...records];
  newRecords[index] = updatedRecord;
  return newRecords;
}
