import { Container, Service, Inject } from 'typedi';
import { Repository } from 'typeorm';
import { Validator } from 'class-validator';
import { InjectRepository } from 'typeorm-typedi-extensions';
import ITemplateBusiness from './interfaces/ITemplateBusiness'; // eslint-disable-line
import Template from '../entities/Template';
import TemplateView from '../models/template/TemplateView';
import TemplateCreate from '../models/template/TemplateCreate';
import TemplateUpdate from '../models/template/TemplateUpdate';
import ScreenView from '../models/screen/ScreenView'; // eslint-disable-line
import ScreenBusiness from './ScreenBusiness';
import IScreenBusiness from './interfaces/IScreenBusiness';
import CategoryBusiness from './CategoryBusiness';
import ICategoryBusiness from './interfaces/ICategoryBusiness';
import { CommonError } from '../models/common/Error';
import ResultList from '../models/common/ResultList';
import DataHelper from '../../helpers/DataHelper';
// import Ratio from '../entities/Ratio';
const validator = Container.get(Validator);

@Service()
export default class TemplateBusiness implements ITemplateBusiness {
    @InjectRepository(Template)
    private TemplateRepository: Repository<Template>;

    @Inject(() => ScreenBusiness)
    private screenBusiness: IScreenBusiness;

    @Inject(() => CategoryBusiness)
    private categoryBusiness: ICategoryBusiness;


    async findTemplates(keyword?: string, categoryId?: number, ratioId?: number, ratioType?: number, skip?: number, limit?: number): Promise<ResultList<TemplateView>> {
        const resultList = new ResultList<TemplateView>(skip, limit);

        let query = this.TemplateRepository.createQueryBuilder('template')
            .leftJoinAndSelect('template.ratio', 'ratio', 'ratio.deletedAt IS NULL')
            .leftJoinAndSelect('template.category', 'category', 'category.deletedAt IS NULL')
            .where('template.deletedAt IS NULL');

        if (keyword && keyword.trim())
            query = query.andWhere('template.name ilike :keyword', { keyword: `%${keyword.trim()}%` });

        if (ratioId)
            query.andWhere(`ratio.id = ${ratioId}`);

        if (ratioType)
            query.andWhere(`ratio.type = ${ratioType}`);

        if (categoryId)
            query.andWhere(`category.id = ${categoryId}`);

        let [templates, count] = await query
            .skip(resultList.pagination.skip)
            .take(resultList.pagination.limit)
            .getManyAndCount();

        resultList.results = TemplateView.parseArray(templates);
        resultList.pagination.total = count;
        return resultList;
    }

    async getTemplate(id: number): Promise<TemplateView | undefined> {
        DataHelper.validateId(id);
        console.log('id', id);

        const template = await this.TemplateRepository.createQueryBuilder('template')
            .leftJoinAndSelect('template.ratio', 'ratio', 'ratio.deletedAt IS NULL')
            .leftJoinAndSelect('template.category', 'category', 'category.deletedAt IS NULL')
            .whereInIds([id])
            .andWhere('template.deletedAt IS NULL')
            .getOne();

        return template && new TemplateView(template);
    }

    async getTemplateByScreen(screenId: number): Promise<ScreenView | undefined> {
        DataHelper.validateId(screenId);

        const screen = await this.screenBusiness.getScreen(screenId);
        return screen || undefined;
    }

    async getTemplateByCode(code: number): Promise<TemplateView | undefined> {
        if (!code)
            throw new CommonError(101, 'code');
        if (!validator.isInt(code))
            throw new CommonError(102, 'code');

        const template = await this.TemplateRepository.createQueryBuilder('template')
            .where('template.code = :code', { code })
            .andWhere('template.deletedAt IS NULL')
            .getOne();

        return template && new TemplateView(template);
    }

    private async getTemplateByName(name: string, excludeId?: number): Promise<TemplateView | undefined> {
        if (!name)
            throw new CommonError(101, 'name');

        let query = this.TemplateRepository.createQueryBuilder('template')
            .where('lower(template.name) = :name', { name: name.trim().toLowerCase() })
            .andWhere('template.deletedAt IS NULL');

        if (excludeId)
            query = query.andWhere('template.id != :id', { id: excludeId });

        const template = await query.getOne();
        return template && new TemplateView(template);
    }

    async createTemplate(data: TemplateCreate): Promise<TemplateView | undefined> {
        let category: any;
        if (data.categoryId)
            category = await this.categoryBusiness.getCategory(data.categoryId);

        let slug = `/${category && category.value ? category.value : 'all'}/${DataHelper.slugify(data.name)}`;
        data.slug = slug;

        await DataHelper.validateDataModel(data);

        // if (await this.getTemplateByCode(data.code))
        //     throw new CommonError(105, 'code');

        const templateExists = await this.getTemplateByName(data.name);
        if (templateExists)
            throw new CommonError(105, 'name');


        const result = await this.TemplateRepository.insert(data);

        let template;
        if (result.raw && result.raw.length)
            template = await this.getTemplate(result.raw[0].id);
        return template;
    }

    async updateTemplate(id: number, data: TemplateUpdate): Promise<boolean> {
        await DataHelper.validateModel(id, data);

        const template = await this.TemplateRepository.createQueryBuilder('template')
            .whereInIds([id])
            .leftJoinAndSelect('template.category', 'category', 'category.deletedAt IS NULL')
            .andWhere('template.deletedAt IS NULL')
            .getOne();

        if (!template)
            throw new CommonError(104, 'template');

        const templateExists = await this.getTemplateByName(data.name, id);
        if (templateExists)
            throw new CommonError(105, 'name');

        let category: any;
        if (data.categoryId)
            category = await this.categoryBusiness.getCategory(data.categoryId);

        let slug = `/${category && category.value ? category.value : 'all'}/${DataHelper.slugify(data.name)}`;
        data.slug = slug;

        await this.TemplateRepository.update(id, data);
        return true;
    }

    async updateTemplateScreen(id: number, data: any): Promise<boolean> {
        let category: any;
        if (data.categoryId)
            category = await this.categoryBusiness.getCategory(data.categoryId);

        let slug = `/${category && category.value ? category.value : 'all'}/${DataHelper.slugify(data.name)}`;
        data.slug = slug;
        let dataUpdate = { name: data.name, slug: data.slug, template: data.template, ratioId: data.ratioId, categoryId: data.categoryId };
        const updateScreen = await this.screenBusiness.updateScreen(id, dataUpdate);
        return updateScreen;
    }

    async deleteTemplate(id: number): Promise<boolean> {
        DataHelper.validateId(id);

        const template = await this.TemplateRepository.createQueryBuilder('template')
            .whereInIds([id])
            .andWhere('template.deletedAt IS NULL')
            .getOne();

        if (!template)
            throw new CommonError(104, 'template');

        await this.TemplateRepository.update(id, { deletedAt: new Date() });
        return true;
    }

    async initialTemplates(list: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean> {
        if (!list || !Array.isArray(list))
            throw new CommonError();

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item.isRequired || isRequired) {
                const template = await this.getTemplateByCode(item.data.code);
                if (!template) {
                    const templateCreate = new TemplateCreate();
                    templateCreate.code = item.data.code;
                    templateCreate.name = item.data.name;

                    await this.createTemplate(templateCreate);
                }
            }
        }
        return true;
    }
};
