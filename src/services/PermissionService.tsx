import { Permission, PermissionType, PermissionRequest } from '../models/index';
import api from '../services/ConfigService';

export const PermissionService = () => {
    const getAllPermissions = async (): Promise<Permission[]> => {
        let permissions: Permission[] = [];
        await api.get('Permissions/GetPermissions')
        .then(response => {
            permissions = response.data.data;
        }).catch(error => {
            return;
        });
        return permissions;
    }

    const getAllPermissionTypes = async (): Promise<PermissionType[]> => {
        let permissionTypes: PermissionType[] = [];
        await api.get('Permissions/GetPermissionTypes')
        .then(response => {
            permissionTypes = response.data.data;
        }).catch(error => {
            return;
        });
        return permissionTypes;
    }

    const createPermission = async (permissionRequest: PermissionRequest): Promise<Permission> => {
        let permission: Permission = {} as Permission;
        await api.post('Permissions/RequestPermission', permissionRequest)
        .then(response => {
            permission = response.data.data;
        }).catch(error => {
            return;
        });
        return permission;
    }

    const updatePermission = async (permissionRequest: PermissionRequest): Promise<Permission> => {
        let permission: Permission = {} as Permission;
        await api.put('Permissions/ModifyPermission', permissionRequest)
        .then(response => {
            return response.data.data;
        }).catch(error => {
            return;
        });
        return permission;
    }

    const deletePermission = async (id: number): Promise<Boolean> => {
        let flat: Boolean = false;
        api.delete(`Permissions/DeletePermission/${id}`)
        .then(response => {
            flat = response.data.data;
        }).catch(error => {
            return false;
        });
        return flat;
    }

    return {
        getAllPermissions,
        getAllPermissionTypes,
        createPermission,
        updatePermission,
        deletePermission
    }
}
