import { historyDataModel } from '../backend/netlify/functions/api/historyData';
import { format } from 'date-fns';

export const syncToCloud = (requestBody: any, result: any) => {
    const machinesData = requestBody.machines;
    const scoresData = result.machineScores;

    // Mapping machines data
    const machineIds = Object.keys(machinesData);
    const machinesHistoryData = machineIds.map((machineId) => {
        const scoreValue = scoresData[machineId] ;
        const today = format(new Date(), 'yyyy-MM-dd');

        return new historyDataModel({
            machineId: machineId,
            userId: 'role2',
            timestamp: today,  
            score: scoreValue,
            dataPoints: {
                [machineId]: machinesData[machineId]
            }
        });
    });



    return machinesHistoryData;
};
