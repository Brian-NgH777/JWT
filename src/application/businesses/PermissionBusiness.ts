import * as path from 'path';
import { Container, Service } from 'typedi';
import { Repository } from 'typeorm';
import { Validator } from 'class-validator';
import { InjectRepository } from 'typeorm-typedi-extensions';
import DataAccess from '../dataAccess';
import IRoleBusiness from './interfaces/IRoleBusiness'; // eslint-disable-line
import IPermissionBusiness from './interfaces/IPermissionBusiness'; // eslint-disable-line
import Role from '../entities/Role';
import Permission from '../entities/Permission';
import RoleView from '../models/role/RoleView';
import RoleLookup from '../models/role/RoleLookup';
import RoleCreate from '../models/role/RoleCreate';
import RoleUpdate from '../models/role/RoleUpdate';
import ClaimView from '../models/permission/ClaimView';
import PermissionView from '../models/permission/PermissionView';
import PermissionCreate from '../models/permission/PermissionCreate';
import ClaimItem from '../models/permission/ClaimItem';
import ResultList from '../models/common/ResultList';
import { CommonError } from '../models/common/Error';
import DataHelper from '../../helpers/DataHelper';
import FileHelper from '../../helpers/FileHelper';
const validator = Container.get(Validator);

@Service()
export default class PermissionBusiness implements IRoleBusiness, IPermissionBusiness {
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>;

    @InjectRepository(Role)
    private roleRepository: Repository<Role>;

    private claimPermissions: ClaimView[];

    async getClaimPermissions(): Promise<ClaimView[]> {
        if (this.claimPermissions && this.claimPermissions.length)
            return this.claimPermissions;

        this.claimPermissions = [];
        const dir = path.join(__dirname, '../../resources/permissions');
        const files = await FileHelper.getFiles(dir).then(files => files.map(file => dir + '/' + file));

        files.filter(file => !file.endsWith('.map')).forEach(file => {
            let name = path.basename(file, path.extname(file));
            name = name.substr(0, name.toLowerCase().lastIndexOf('claim'));

            const claimView = new ClaimView(name);
            this.claimPermissions.push(claimView);

            const claimObj = require(file).default;
            Object.keys(claimObj).forEach(name => {
                claimView.items.push(new ClaimItem({
                    code: claimObj[name],
                    name
                }));
            });
        });
        return this.claimPermissions;
    }

    async findRoles(keyword?: string, skip?: number, limit?: number): Promise<ResultList<RoleView>> {
        const resultList = new ResultList<RoleView>(skip, limit);
        let query = this.roleRepository.createQueryBuilder('role')
            .where('role.deletedAt IS NULL');

        if (keyword && keyword.trim()) {
            keyword = `%${keyword.trim()}%`;
            query = query.andWhere('role.name ilike :keyword', { keyword });
        }
        let [roles, count] = await query
            .orderBy({
                level: 'ASC',
                name: 'ASC'
            })
            .skip(resultList.pagination.skip)
            .take(resultList.pagination.limit)
            .getManyAndCount();

        resultList.results = RoleView.parseArray(roles);
        resultList.pagination.total = count;
        return resultList;
    }

    async lookupRoles(keyword?: string, skip?: number, limit?: number): Promise<ResultList<RoleLookup>> {
        const resultList = new ResultList<RoleLookup>(skip, limit);
        let query = this.roleRepository.createQueryBuilder('role')
            .where('role.deletedAt IS NULL');

        if (keyword && keyword.trim()) {
            keyword = `%${keyword.trim()}%`;
            query = query.andWhere('role.name ilike :keyword', { keyword });
        }
        let [roles, count] = await query
            .orderBy({
                level: 'ASC',
                name: 'ASC'
            })
            .skip(resultList.pagination.skip)
            .take(resultList.pagination.limit)
            .getManyAndCount();

        resultList.results = RoleLookup.parseArray(roles);
        resultList.pagination.total = count;
        return resultList;
    }

    async getRole(id: number): Promise<RoleView | undefined> {
        DataHelper.validateId(id);

        const role = await this.roleRepository.createQueryBuilder('role')
            .whereInIds([id])
            .andWhere('role.deletedAt IS NULL')
            .getOne();

        return role && new RoleView(role);
    }

    async getRoleByCode(code: number): Promise<RoleView | undefined> {
        if (!code)
            throw new CommonError(101, 'code');
        if (!validator.isInt(code))
            throw new CommonError(102, 'code');

        const role = await this.roleRepository.createQueryBuilder('role')
            .where('role.code = :code', { code })
            .andWhere('role.deletedAt IS NULL')
            .getOne();

        return role && new RoleView(role);
    }

    private async getRoleByName(name: string, excludeId?: number): Promise<RoleView | undefined> {
        if (!name)
            throw new CommonError(101, 'name');

        let query = this.roleRepository.createQueryBuilder('role')
            .where('lower(role.name) = :name', { name: name.trim().toLowerCase() })
            .andWhere('role.deletedAt IS NULL');

        if (excludeId)
            query = query.andWhere('role.id != :id', { id: excludeId });

        const role = await query.getOne();
        return role && new RoleView(role);
    }

    async createRole(data: RoleCreate): Promise<RoleView | undefined> {
        await DataHelper.validateDataModel(data);

        if (await this.getRoleByCode(data.code))
            throw new CommonError(105, 'code');

        const roleExists = await this.getRoleByName(data.name);
        if (roleExists)
            throw new CommonError(105, 'name');

        const result = await this.roleRepository.insert(data);

        let role;
        if (result.raw && result.raw.length)
            role = await this.getRole(result.raw[0].id);
        return role;
    }

    async updateRole(id: number, data: RoleUpdate): Promise<boolean> {
        await DataHelper.validateModel(id, data);

        const role = await this.roleRepository.createQueryBuilder('role')
            .whereInIds([id])
            .andWhere('role.deletedAt IS NULL')
            .getOne();

        if (!role)
            throw new CommonError(104, 'role');

        const roleExists = await this.getRoleByName(data.name, id);
        if (roleExists)
            throw new CommonError(105, 'name');

        await this.roleRepository.update(id, data);
        return true;
    }

    async deleteRole(id: number): Promise<boolean> {
        DataHelper.validateId(id);

        const role = await this.roleRepository.createQueryBuilder('role')
            .whereInIds([id])
            .andWhere('role.deletedAt IS NULL')
            .getOne();

        if (!role)
            throw new CommonError(104, 'role');

        await this.roleRepository.update(id, { deletedAt: new Date() });
        return true;
    }

    async initialRoles(list: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean> {
        if (!list || !Array.isArray(list))
            throw new CommonError();

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item.isRequired || isRequired) {
                const role = await this.getRoleByCode(item.data.code);
                if (!role) {
                    const roleCreate = new RoleCreate();
                    roleCreate.code = item.data.code;
                    roleCreate.name = item.data.name;
                    roleCreate.level = item.data.level;

                    await this.createRole(roleCreate);
                }
            }
        }
        return true;
    }

    async getPermission(id: number): Promise<PermissionView | undefined> {
        DataHelper.validateId(id);

        const permission = await this.permissionRepository.createQueryBuilder('permission')
            .innerJoinAndSelect('permission.role', 'role', 'role.deletedAt IS NULL')
            .whereInIds([id])
            .getOne();

        return permission && new PermissionView(permission);
    }

    async getPermissionsByRole(roleId: number): Promise<PermissionView[]> {
        DataHelper.validateId(roleId, 'role');

        const permissions = await this.permissionRepository.createQueryBuilder('permission')
            .innerJoinAndSelect('permission.role', 'role', 'role.deletedAt IS NULL')
            .where('role.id = :roleId', { roleId })
            .getMany();

        return PermissionView.parseArray(permissions);
    }

    async checkPermission(roleId: number, claims: number[]): Promise<boolean> {
        if (!roleId || !validator.isInt(roleId) || !claims || !claims.length || claims.find(claim => !validator.isInt(claim)))
            throw new CommonError();

        const permissions = await this.permissionRepository.createQueryBuilder('permission')
            .cache('permissions', 24 * 60 * 60 * 1000)
            .getMany();

        return !!permissions.find(permission => permission.roleId === roleId && claims.findIndex(claim => permission.claim === claim) !== -1);
    }

    async createPermission(data: PermissionCreate): Promise<PermissionView | undefined> {
        await DataHelper.validateDataModel(data);

        if (await this.checkPermission(data.roleId, [data.claim]))
            throw new CommonError(105, 'permission');

        const result = await this.permissionRepository.insert(data);

        let permission;
        if (result.raw && result.raw.length) {
            await DataAccess.removeCaching('permissions');
            permission = await this.getPermission(result.raw[0].id);
        }
        return permission;
    }

    async deletePermission(id: number): Promise<boolean> {
        DataHelper.validateId(id);

        const permission = await this.permissionRepository.createQueryBuilder('permission')
            .whereInIds([id])
            .getOne();

        if (!permission)
            throw new CommonError(104, 'permission');

        const result = await this.permissionRepository.delete(id);
        if (result.affected)
            await DataAccess.removeCaching('permissions');

        return !!result.affected;
    }

    async initialPermissions(data: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean> {
        if (!data || !Array.isArray(data))
            throw new CommonError();
        const roles = await this.roleRepository.createQueryBuilder('role').getMany();

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (item.isRequired || isRequired) {
                const role = roles.find(role => role.code === item.data.roleCode);
                if (role) {
                    const result = await this.checkPermission(role.id, [item.data.claim]);
                    if (!result) {
                        const permissionCreate = new PermissionCreate();
                        permissionCreate.roleId = role.id;
                        permissionCreate.claim = item.data.claim;

                        await this.createPermission(permissionCreate);
                    }
                }
            }
        }
        return true;
    }
};
