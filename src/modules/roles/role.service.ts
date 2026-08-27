import { RoleModel } from '../auth/models/role.model.js';
import { PermissionModel } from '../auth/models/permission.model.js';
import { NotFoundError, ConflictError, BadRequestError } from '../../common/errors/app-error.js';

export class RoleService {
  async listRoles() {
    return RoleModel.find().sort({ name: 1 });
  }

  async listPermissions() {
    return PermissionModel.find().sort({ module: 1, name: 1 });
  }

  async getRoleById(id: string) {
    const role = await RoleModel.findById(id);
    if (!role) throw new NotFoundError('Role not found');
    return role;
  }

  async createRole(data: { name: string; displayName: string; description?: string; permissions?: string[] }) {
    const existing = await RoleModel.findOne({ name: data.name });
    if (existing) throw new ConflictError(`Role '${data.name}' already exists`);

    const role = new RoleModel({
      name: data.name,
      displayName: data.displayName,
      description: data.description || '',
      permissions: data.permissions || [],
      isSystemRole: false,
    });
    await role.save();
    return role;
  }

  async updateRole(id: string, data: { displayName?: string; description?: string; permissions?: string[] }) {
    const role = await RoleModel.findById(id);
    if (!role) throw new NotFoundError('Role not found');

    if (data.displayName) role.displayName = data.displayName;
    if (data.description !== undefined) role.description = data.description;
    if (data.permissions) role.permissions = data.permissions;

    await role.save();
    return role;
  }

  async deleteRole(id: string) {
    const role = await RoleModel.findById(id);
    if (!role) throw new NotFoundError('Role not found');
    if (role.isSystemRole) {
      throw new BadRequestError('System default roles cannot be deleted');
    }
    await RoleModel.findByIdAndDelete(id);
    return { message: 'Role deleted successfully' };
  }
}

export const roleService = new RoleService();

