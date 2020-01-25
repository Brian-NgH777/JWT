import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import IRatioBusiness from './interfaces/IRatioBusiness'; // eslint-disable-line
import Ratio from '../entities/Ratio';
import RatioView from '../models/ratio/RatioView';
import RatioCreate from '../models/ratio/RatioCreate';
import ResultList from '../models/common/ResultList';
import { CommonError } from '../models/common/Error';
import DataHelper from '../../helpers/DataHelper';

@Service()
export default class RatioBusiness implements IRatioBusiness {
    @InjectRepository(Ratio)
    private ratioRepository: Repository<Ratio>;

    async findRatios(keyword?: string, skip?: number, limit?: number): Promise<ResultList<RatioView>> {
        const resultList = new ResultList<RatioView>(skip, limit);
        let query = this.ratioRepository.createQueryBuilder('ratio')
            .where('ratio.deletedAt IS NULL');

        if (keyword && keyword.trim()) {
            keyword = `%${keyword.trim()}%`;
            query = query.andWhere('ratio.name ilike :keyword', { keyword });
        }
        let [roles, count] = await query
            // .orderBy({
            //     name: 'ASC'
            // })
            .skip(resultList.pagination.skip)
            .take(resultList.pagination.limit)
            .getManyAndCount();

        resultList.results = RatioView.parseArray(roles);
        resultList.pagination.total = count;
        return resultList;
    }

    async getRatio(id: number): Promise<RatioView | undefined> {
        DataHelper.validateId(id);

        const ratio = await this.ratioRepository.createQueryBuilder('ratio')
            .where('ratio.deletedAt IS NULL')
            .andWhereInIds([id])
            .getOne();

        return ratio && new RatioView(ratio);
    }


    async createRatio(data: RatioCreate): Promise<RatioView | undefined> {
        await DataHelper.validateDataModel(data);

        const result = await this.ratioRepository.insert(data);

        let ratio;
        if (result.raw && result.raw.length)
            ratio = await this.getRatio(result.raw[0].id);
        return ratio;
    }

    async initialRatio(list: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean> {
        if (!list || !Array.isArray(list))
            throw new CommonError();

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (item.isRequired || isRequired) {
                const ratioCreate = new RatioCreate();
                ratioCreate.description = item.data.description;
                ratioCreate.name = item.data.name;
                ratioCreate.value = item.data.value;
                ratioCreate.type = item.data.type;

                await this.createRatio(ratioCreate);
            }
        }
        return true;
    }
};
