import { Process } from "../pages/Areas/ViewArea";
import { api } from "./axiosService";

function getProcesses() {
    return api.get(`/areas/processes`);
}

function getProcess(id: number) {
    return api.get(`/processes/${id}`);
}

export type PartialProcess = Omit<Process, 'id' | 'childProcessOrder' | 'isProcessRoot'>;

function createProcess(payload: PartialProcess) {
    return api.post(`/processes`, payload);
}

function updateProcess(id: string, payload: PartialProcess) {
    return api.put(`/processes/${id}`, payload);
}

function deleteProcess(id: number) {
    return api.delete(`/processes/${id}`);
}

function createSubProcess(id: number, payload: PartialProcess) {
    return api.post(`/processes/${id}/sub-processes`, payload);
}

function updateSubProcess(id: number, payload: PartialProcess) {
    return api.put(`/processes/${id}/sub-processes`, payload);
}

const processesService = {
    getProcesses,
    getProcess,
    createSubProcess,
    updateSubProcess,
    createProcess,
    updateProcess,
    deleteProcess,
}

export default processesService;