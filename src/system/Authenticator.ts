import { Container, Service } from 'typedi';
import { Action, UnauthorizedError } from 'routing-controllers';
import * as jwt from 'jsonwebtoken';
import IUserBusiness from '../application/businesses/interfaces/IUserBusiness';
import UserBusiness from '../application/businesses/UserBusiness';
import IPermissionBusiness from '../application/businesses/interfaces/IPermissionBusiness';
import PermissionBusiness from '../application/businesses/PermissionBusiness';
import UserView from '../application/models/user/UserView';
import ISocket from '../application/models/socket/ISocket';
import { CommonError } from '../application/models/common/Error';

@Service()
export default class Authenticator {
    private static async authenticateUser(token: string, claims?: number[]): Promise<UserView> {
        if (!token) throw new UnauthorizedError();
        let user = await jwt.verify(token, process.env.SECRETKEY, async (err, authData) => {
            if (err)
                throw new CommonError(2);

            else {
                // const userBusiness: IUserBusiness = Container.get(UserBusiness);
                const permissionBusiness: IPermissionBusiness = Container.get(PermissionBusiness);
                // const user = await userBusiness.getUserByToken(token).catch(() => undefined);
                // if (!user || !user.role) throw new UnauthorizedError();

                if (!claims || !claims.length)
                    return authData;

                const result = await permissionBusiness.checkPermission(authData.user.role.id, claims).catch(() => false);
                if (!result)
                    throw new CommonError(2);
                return authData;
            }
        });
        return user;
    };

    async authenticateBySocket(socket: ISocket): Promise<UserView | undefined> {
        const token = socket.handshake.query && socket.handshake.query.token;
        return await Authenticator.authenticateUser(token).catch(() => undefined);
    }

    async authorizationHttpChecker(action: Action, claims: number[]): Promise<boolean> {
        const token = action.request.headers['authorization'];
        action.request.user = await Authenticator.authenticateUser(token, claims);
        return !!action.request.user;
    }

    currentUserChecker(action: Action) {
        return action.request.user;
    }
};
