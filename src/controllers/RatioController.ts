import { Service, Inject } from 'typedi';
import { JsonController, Authorized, Param, QueryParam, Get } from 'routing-controllers';
import IRatioBusiness from '../application/businesses/interfaces/IRatioBusiness';
import RatioBusiness from '../application/businesses/RatioBusiness';
import RatioClaim from '../resources/permissions/RatioClaim';

@Service()
@JsonController('/ratio')
export default class RatioController {
    @Inject(() => RatioBusiness)
    private ratioBusiness: IRatioBusiness;

    @Get('/')
    @Authorized(RatioClaim.GET)
    findRatios(@QueryParam('keyword') keyword: string, @QueryParam('skip') skip: number, @QueryParam('limit') limit: number) {
        return this.ratioBusiness.findRatios(keyword, skip, limit);
    }

    @Get('/:id([0-9]+)')
    @Authorized(RatioClaim.GET)
    getRatio(@Param('id') id: number) {
        return this.ratioBusiness.getRatio(id);
    }
};
