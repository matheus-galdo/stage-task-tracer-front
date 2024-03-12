import { Process } from "../pages/Areas/ViewArea";
import { api } from "./axiosService";

function getProcesses() {
    return api.get(`/areas/processes`);
}

function createProcess(payload: Omit<Process,'id'>) {
    return api.post(`/processes`, payload);
}

function updateProcess(id: string, payload: Omit<Process,'id'>) {
    return api.put(`/processes/${id}`, payload);
}

function deleteProcess(id: string) {
    return api.delete(`/processes/${id}`);
}

const processesService = {
    getProcesses,
    createProcess,
    updateProcess,
    deleteProcess,
}

export default processesService;