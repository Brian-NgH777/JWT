import RatioView from '../../models/ratio/RatioView';
import RatioCreate from '../../models/ratio/RatioCreate';
import ResultList from '../../models/common/ResultList';

interface IRatioBusiness {
    findRatios(keyword?: string, skip?: number, limit?: number): Promise<ResultList<RatioView>>;

    getRatio(id: number): Promise<RatioView | undefined>;

    createRatio(data: RatioCreate): Promise<RatioView | undefined>;

    initialRatio(data: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean>;
}

export default IRatioBusiness;
