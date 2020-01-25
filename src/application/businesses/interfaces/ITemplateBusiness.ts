import TemplateView from '../../models/template/TemplateView';
import ScreenView from '../../models/screen/ScreenView'; // eslint-disable-line
import TemplateCreate from '../../models/template/TemplateCreate';
import TemplateUpdate from '../../models/template/TemplateUpdate';
import ResultList from '../../models/common/ResultList';

interface ITemplateBusiness {
    findTemplates(keyword?: string, categoryId?: number, ratioId?: number, ratioType?: number, skip?: number, limit?: number): Promise<ResultList<TemplateView>>;

    getTemplate(id: number): Promise<TemplateView | undefined>;

    getTemplateByScreen(id: number): Promise<ScreenView | undefined>;

    getTemplateByCode(code: number): Promise<TemplateView | undefined>;

    createTemplate(data: TemplateCreate): Promise<TemplateView | undefined>;

    updateTemplate(id: number, data: TemplateUpdate): Promise<boolean>;

    updateTemplateScreen(id: number, data: any): Promise<boolean>;

    deleteTemplate(id: number): Promise<boolean>;

    initialTemplates(data: {isRequired?: boolean, data: any}[], isRequired?: boolean): Promise<boolean>;
}

export default ITemplateBusiness;
