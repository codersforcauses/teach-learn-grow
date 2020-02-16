import { Photon } from '@prisma/photon';
import { getUserInfo } from './user';

export const getPrograms = (photon: Photon) => {
    return photon.programs.findMany({
        orderBy: {
            startDate: 'asc',
        }
    });
};
export const getApplicablePrograms = (photon: Photon) => {
    return photon.programs.findMany({
        where: {
            applicationEndDate: {
                gte: new Date().toISOString(),
            }
        },
        orderBy: {
            startDate: 'asc',
        }
    });
};
export const checkIfApplied = async (photon: Photon, programID: string) => {
    //await photon.applications.findOne();
    return "test" + programID;
};