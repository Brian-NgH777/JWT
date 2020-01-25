import { Service, Inject } from 'typedi';
import { JsonController, Authorized, Param, QueryParam, Body, Get, Post, Put, Delete } from 'routing-controllers';
import ITemplateBusiness from '../application/businesses/interfaces/ITemplateBusiness';
import TemplateBusiness from '../application/businesses/TemplateBusiness';
import TemplateClaim from '../resources/permissions/TemplateClaim';
import TemplateCreate from '../application/models/template/TemplateCreate';
import TemplateUpdate from '../application/models/template/TemplateUpdate';

@Service()
@JsonController('/template')
export default class TemplateController {
    @Inject(() => TemplateBusiness)
    private templateBusiness: ITemplateBusiness;

    @Get('/')
    @Authorized(TemplateClaim.GET)
    findTemplates(@QueryParam('keyword') keyword: string, @QueryParam('categoryId') categoryId: number, @QueryParam('ratioId') ratioId: number, @QueryParam('ratioType') ratioType: number, @QueryParam('skip') skip: number, @QueryParam('limit') limit: number) {
        return this.templateBusiness.findTemplates(keyword, categoryId, ratioId, ratioType, skip, limit);
    }

    @Get('/:id([0-9]+)')
    @Authorized(TemplateClaim.GET)
    getTemplate(@Param('id') id: number) {
        return this.templateBusiness.getTemplate(id);
    }

    @Get('/template-by-screen')
    @Authorized(TemplateClaim.GET)
    getTemplateByScreen(@QueryParam('screenId') screenId: number) {
        return this.templateBusiness.getTemplateByScreen(screenId);
    }

    @Get('/template-by-code')
    @Authorized(TemplateClaim.GET)
    getTemplateByCode(@QueryParam('code') code: number) {
        return this.templateBusiness.getTemplateByCode(code);
    }

    @Post('/')
    @Authorized(TemplateClaim.CREATE)
    createTemplate(@Body() data: TemplateCreate) {
        return this.templateBusiness.createTemplate(data);
    }

    @Put('/:id([0-9]+)')
    @Authorized(TemplateClaim.UPDATE)
    updateTemplate(@Param('id') id: number, @Body() data: TemplateUpdate) {
        return this.templateBusiness.updateTemplate(id, data);
    }

    @Put('/screen')
    @Authorized(TemplateClaim.USER_UPDATE)
    updateTemplateScreen(@QueryParam('screenId') screenId: number, @Body() data: any) {
        return this.templateBusiness.updateTemplateScreen(screenId, data);
    }

    @Delete('/:id([0-9]+)')
    @Authorized(TemplateClaim.DELETE)
    deleteTemplate(@Param('id') id: number) {
        return this.templateBusiness.deleteTemplate(id);
    }
};
