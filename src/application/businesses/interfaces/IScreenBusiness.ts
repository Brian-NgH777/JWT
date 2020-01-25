import ScreenView from '../../models/screen/ScreenView';
import ScreenCreate from '../../models/screen/ScreenCreate';
import ScreenUpdate from '../../models/screen/ScreenUpdate';
import ResultList from '../../models/common/ResultList';

interface IScreenBusiness {
    findScreen(userId: number, keyword?: string, skip?: number, limit?: number): Promise<ResultList<ScreenView>>;

    getScreen(id: number): Promise<ScreenView | undefined>;

    getScreenBySlug(slug: string): Promise<ScreenView | undefined>;

    createScreen(data: ScreenCreate): Promise<ScreenView | undefined>;

    updateScreen(id: number, data: ScreenUpdate): Promise<boolean>;

    deleteScreen(id: number): Promise<boolean>;

    initialScreen(data: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean>;
}

export default IScreenBusiness;
