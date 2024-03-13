import { Area } from "../pages/Areas/ViewArea";
import { api } from "./axiosService";

function createArea(payload: Omit<Area, 'id'>) {
    return api.post<Area>('/areas', payload);
}

function getAreas() {
    return api.get('/areas');
}

function updateArea(areaId: string, payload: Omit<Area, 'id'>) {
    return api.put(`/areas/${areaId}`, payload);
}

function getAreaProcesses(areaId: string) {
    return api.get(`/areas/${areaId}/processes`);
}

function deleteArea(areaId: number) {
    return api.delete(`/areas/${areaId}`);
}

const areasService = {
    createArea,
    getAreas,
    updateArea,
    getAreaProcesses,
    deleteArea,
}

export default areasService;