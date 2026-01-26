import { type RecordData } from '.././types/record';

export function deleteRecordFromList(records: RecordData[], index: number): RecordData[] {
  return records.filter((_, i) => i !== index);
}

