import { SubProcess } from "../pages/ViewProcess/Index";
import { api } from "./axiosService";

function createProcess(payload: Omit<SubProcess, 'id'>) {
    return api.post(`/sub-processes`, payload);
}

function updateProcess(id: string, payload: Omit<SubProcess, 'id'>) {
    return api.put(`/sub-processes/${id}`, payload);
}

function deleteProcess(id: string) {
    return api.delete(`/sub-processes/${id}`);
}

const subProcessesService = {
    createProcess,
    updateProcess,
    deleteProcess,
}

export default subProcessesService;