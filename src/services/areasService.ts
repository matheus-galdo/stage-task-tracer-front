import { Area } from "../pages/Areas/ViewArea";
import { api } from "./axiosService";

function createArea(payload: Omit<Area, 'id'>) {
    return api.post('/areas', payload);
}

function getAreas() {
    return api.get('/areas');
}

function getAreaProcesses(areaId: string) {
    return api.get(`/areas/${areaId}/processes`);
}

const areasService = {
    createArea,
    getAreas,
    getAreaProcesses,
}

export default areasService;