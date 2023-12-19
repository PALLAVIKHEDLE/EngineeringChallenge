import { Document, Schema, model } from 'mongoose';
import { format } from 'date-fns';

//historical data for a machine.
export interface IHistoryData  {
    machineId: string;
    userId: string;
    timestamp: Date;
    score: string;
    dataPoints: RecursiveDataPoints;
}
//recursive data points structure.
interface RecursiveDataPoints {
    [key: string]: string | RecursiveDataPoints;
}

const historyDataSchema = new Schema({
    machineId: { type: String, required: true },
    userId: { type: String, required: true , default:'Admin'},
    score: { type: String },
    timestamp: {   type: String,
    default: () => format(new Date(), 'yyyy-MM-dd'),},
    dataPoints: { type: Schema.Types.Mixed }
});

export const historyDataModel = model<IHistoryData>('DataPoints', historyDataSchema);
