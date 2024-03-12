import { api } from "./axiosService";


function getAreas() {
    return api.get('/areas');
}

function getAreaProcesses(areaId: string) {
    return api.get(`/areas/${areaId}/processes`);
}

const areasService = {
    getAreas,
    getAreaProcesses,
}

export default areasService;