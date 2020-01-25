// import 'mocha';
// import { expect } from 'chai';
// import { Container } from 'typedi';
// import DataAccess from '../../application/dataAccess';
// import ITemplateBusiness from '../../application/businesses/interfaces/ITemplateBusiness';
// import TemplateBusiness from '../../application/businesses/TemplateBusiness';
// import Template from '../../application/entities/Template';
// import TemplateCreate from '../../application/models/template/TemplateCreate';
// import TemplateUpdate from '../../application/models/template/TemplateUpdate';
// import getTemplates from '../../resources/data/initialization/Template';

// const generateTemplateData = () => {
//     const templateCreate = new TemplateCreate();
//     templateCreate.code = 1;
//     templateCreate.name = 'Template test';

//     return templateCreate;
// };

// describe('Template testing', () => {
//     let templateBusiness: ITemplateBusiness;

//     before(() => {
//         templateBusiness = Container.get(TemplateBusiness);
//     });

//     beforeEach(async () => {
//         await DataAccess.connection.createQueryBuilder().delete().from(Template).execute();
//     });

//     after(async () => {
//         await DataAccess.connection.createQueryBuilder().delete().from(Template).execute();
//     });

//     it('Find templates without param', async () => {
//         const templateCreate = generateTemplateData();
//         const template = await templateBusiness.createTemplate(templateCreate);

//         if (template) {
//             const { results, pagination } = await templateBusiness.findTemplates('', 0, 1);
//             expect(Array.isArray(results) && results.length > 0 && pagination && pagination.total > 0).to.eq(true);
//         }
//     });

//     it('Find templates with name', async () => {
//         const templateCreate = generateTemplateData();
//         const template = await templateBusiness.createTemplate(templateCreate);

//         if (template) {
//             const { results, pagination } = await templateBusiness.findTemplates('template', 0, 1);
//             expect(Array.isArray(results) && results.length > 0 && pagination && pagination.total > 0).to.eq(true);
//         }
//     });

//     it('Get template by id without param', async () => {
//         await templateBusiness.getTemplate(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get template by id invalid', async () => {
//         await templateBusiness.getTemplate('1' as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get template by id', async () => {
//         const templateCreate = generateTemplateData();
//         const template = await templateBusiness.createTemplate(templateCreate);

//         if (template) {
//             const result = await templateBusiness.getTemplate(template.id);
//             expect(!!result).to.eq(true);
//         }
//     });

//     it('Get template by code without param', async () => {
//         await templateBusiness.getTemplateByCode(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get template by code invalid', async () => {
//         await templateBusiness.getTemplateByCode('1' as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get template by code', async () => {
//         const templateCreate = generateTemplateData();
//         const template = await templateBusiness.createTemplate(templateCreate);

//         if (template) {
//             const result = await templateBusiness.getTemplateByCode(template.code);
//             expect(result && result.code === template.code).to.eq(true);
//         }
//     });

//     it('Create new template with data invalid', async () => {
//         await templateBusiness.createTemplate(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new template without code', async () => {
//         const templateCreate = generateTemplateData();
//         templateCreate.code = undefined as any;

//         await templateBusiness.createTemplate(templateCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new template with code invalid', async () => {
//         const templateCreate = generateTemplateData();
//         templateCreate.code = 10;

//         await templateBusiness.createTemplate(templateCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new template without name', async () => {
//         const templateCreate = generateTemplateData();
//         templateCreate.name = undefined as any;

//         await templateBusiness.createTemplate(templateCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new template with length name greater than 50 characters', async () => {
//         const templateCreate = generateTemplateData();
//         templateCreate.name = 'This is the name with length greater than 50 characters!';

//         await templateBusiness.createTemplate(templateCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new template with code has exists', async () => {
//         const templateCreate = generateTemplateData();
//         await templateBusiness.createTemplate(templateCreate);

//         const templateCreate2 = generateTemplateData();
//         await templateBusiness.createTemplate(templateCreate2).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new template with name has exists', async () => {
//         const templateCreate = generateTemplateData();
//         await templateBusiness.createTemplate(templateCreate);

//         const templateCreate2 = generateTemplateData();
//         templateCreate2.code = 100;

//         await templateBusiness.createTemplate(templateCreate2).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new template successfully', async () => {
//         const templateCreate = generateTemplateData();
//         const template = await templateBusiness.createTemplate(templateCreate);
//         expect(!!template).to.eq(true);
//     });

//     it('Update template with data invalid', async () => {
//         const templateCreate = generateTemplateData();
//         const template = await templateBusiness.createTemplate(templateCreate);

//         if (template) {
//             await templateBusiness.updateTemplate(template.id, undefined as any).catch(error => {
//                 expect(error.httpCode).to.eq(400);
//             });
//         }
//     });

//     it('Update template without id', async () => {
//         await templateBusiness.updateTemplate(undefined as any, undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update template with id invalid', async () => {
//         await templateBusiness.updateTemplate('1' as any, undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update template with id not exists', async () => {
//         const templateUpdate = new TemplateUpdate();
//         templateUpdate.name = 'Template test';

//         await templateBusiness.updateTemplate(1000, templateUpdate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update template without name', async () => {
//         const templateUpdate = new TemplateUpdate();
//         templateUpdate.name = '';

//         await templateBusiness.updateTemplate(1, templateUpdate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update template with length name greater than 50 characters', async () => {
//         const templateUpdate = new TemplateUpdate();
//         templateUpdate.name = 'This is the name with length greater than 50 characters!';

//         await templateBusiness.updateTemplate(1, templateUpdate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update template with name has exists', async () => {
//         const templateCreate = generateTemplateData();
//         const template = await templateBusiness.createTemplate(templateCreate);

//         if (template) {
//             const templateCreate2 = generateTemplateData();
//             templateCreate2.code = 2;
//             templateCreate2.name = 'Template test 2';
//             const template2 = await templateBusiness.createTemplate(templateCreate2);

//             if (template2) {
//                 const templateUpdate = new TemplateUpdate();
//                 templateUpdate.name = template2.name;

//                 await templateBusiness.updateTemplate(template.id, templateUpdate).catch(error => {
//                     expect(error.httpCode).to.eq(400);
//                 });
//             }
//         }
//     });

//     it('Update template successfully', async () => {
//         const templateCreate = generateTemplateData();
//         const template = await templateBusiness.createTemplate(templateCreate);

//         if (template) {
//             const templateUpdate = new TemplateUpdate();
//             templateUpdate.name = 'Template test updated';

//             const result = await templateBusiness.updateTemplate(template.id, templateUpdate);
//             if (result) {
//                 const templateUpdated = await templateBusiness.getTemplate(template.id);
//                 expect(templateUpdated && templateUpdated.name === templateUpdate.name).to.eq(true);
//             }
//         }
//     });

//     it('Delete template without id', async () => {
//         await templateBusiness.deleteTemplate(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Delete template with id invalid', async () => {
//         await templateBusiness.deleteTemplate('1' as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Delete template with id not exists', async () => {
//         await templateBusiness.deleteTemplate(100).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Delete template successfully', async () => {
//         const templateCreate = generateTemplateData();
//         const template = await templateBusiness.createTemplate(templateCreate);

//         if (template) {
//             const result = await templateBusiness.deleteTemplate(template.id);
//             expect(result).to.eq(true);
//         }
//     });

//     it('Initial templates with data input invalid', async () => {
//         await templateBusiness.initialTemplates(undefined as any, true).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Initial templates successfull', async () => {
//         const result = await templateBusiness.initialTemplates(getTemplates(), true);
//         expect(result).to.eq(true);
//     });
// });
