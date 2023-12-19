import { Document, Schema, model } from 'mongoose';

export interface IHistoryData  {
    machineId: string;
    userId: string;
    timestamp: Date;
    score: string;
    dataPoints: RecursiveDataPoints;
}

interface RecursiveDataPoints {
    [key: string]: string | RecursiveDataPoints;
}

const historyDataSchema = new Schema({
    machineId: { type: String, required: true },
    userId: { type: String, required: true , default:'Admin'},
    score: { type: String },
    timestamp: { type: Date, default: Date.now },
    dataPoints: { type: Schema.Types.Mixed }
});

export const historyDataModel = model<IHistoryData>('DataPoints', historyDataSchema);
