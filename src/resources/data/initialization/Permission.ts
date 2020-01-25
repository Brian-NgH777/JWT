import { RoleCode } from '../../../application/models/common/Enum';
import SystemClaim from '../../permissions/SystemClaim';
import RoleClaim from '../../permissions/RoleClaim';
import UserClaim from '../../permissions/UserClaim';
import MediaClaim from '../../permissions/MediaClaim';
import TemplateClaim from '../../permissions/TemplateClaim';
import ScreenClaim from '../../permissions/ScreenClaim';
import PlaylistClaim from '../../permissions/PlaylistClaim';
import RatioClaim from '../../permissions/RatioClaim';
import CategoryClaim from '../../permissions/CategoryClaim';

/**
 * Get init permission list
 * @returns {*} Permission list
 */
export default function getPermissions(): {isRequired?: boolean, data: any}[] {
    return [
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: SystemClaim.INIT_DATA } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: RoleClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: RoleClaim.CREATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: RoleClaim.UPDATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: RoleClaim.DELETE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: UserClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: UserClaim.CREATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: UserClaim.UPDATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: UserClaim.UPDATE_ROLE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: UserClaim.DELETE } },
        // Media
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: MediaClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: MediaClaim.CREATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: MediaClaim.UPDATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: MediaClaim.DELETE } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: MediaClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: MediaClaim.CREATE } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: MediaClaim.UPDATE } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: MediaClaim.DELETE } },
        // Template
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: TemplateClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: TemplateClaim.CREATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: TemplateClaim.UPDATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: TemplateClaim.DELETE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: TemplateClaim.USER_UPDATE } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: TemplateClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: TemplateClaim.USER_UPDATE } },
        // Screen
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: ScreenClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: ScreenClaim.CREATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: ScreenClaim.UPDATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: ScreenClaim.DELETE } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: ScreenClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: ScreenClaim.CREATE } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: ScreenClaim.UPDATE } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: ScreenClaim.DELETE } },
        // Playlist
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: PlaylistClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: PlaylistClaim.CREATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: PlaylistClaim.UPDATE } },
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: PlaylistClaim.DELETE } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: PlaylistClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: PlaylistClaim.CREATE } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: PlaylistClaim.UPDATE } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: PlaylistClaim.DELETE } },
        // Ratio
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: RatioClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: RatioClaim.GET } },
        // Category
        { isRequired: true, data: { roleCode: RoleCode.Administrator, claim: CategoryClaim.GET } },
        { isRequired: true, data: { roleCode: RoleCode.UserCommon, claim: CategoryClaim.GET } }
    ];
}
