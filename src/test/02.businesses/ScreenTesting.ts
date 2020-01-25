// import 'mocha';
// import { expect } from 'chai';
// import { Container } from 'typedi';
// import DataAccess from '../../application/dataAccess';
// import IScreenBusiness from '../../application/businesses/interfaces/IScreenBusiness';
// import ScreenBusiness from '../../application/businesses/ScreenBusiness';
// import Screen from '../../application/entities/Screen';
// import ScreenCreate from '../../application/models/screen/ScreenCreate';
// import ScreenUpdate from '../../application/models/screen/ScreenUpdate';
// import getScreens from '../../resources/data/initialization/Screen';

// const generateScreenData = () => {
//     const screenCreate = new ScreenCreate();
//     screenCreate.code = 1;
//     screenCreate.name = 'Screen test';

//     return screenCreate;
// };

// describe('Screen testing', () => {
//     let screenBusiness: IScreenBusiness;

//     before(() => {
//         screenBusiness = Container.get(ScreenBusiness);
//     });

//     beforeEach(async () => {
//         await DataAccess.connection.createQueryBuilder().delete().from(Screen).execute();
//     });

//     after(async () => {
//         await DataAccess.connection.createQueryBuilder().delete().from(Screen).execute();
//     });

//     it('Find screens without param', async () => {
//         const screenCreate = generateScreenData();
//         const screen = await screenBusiness.createScreen(screenCreate);

//         if (screen) {
//             const { results, pagination } = await screenBusiness.findScreens('', 0, 1);
//             expect(Array.isArray(results) && results.length > 0 && pagination && pagination.total > 0).to.eq(true);
//         }
//     });

//     it('Find screens with name', async () => {
//         const screenCreate = generateScreenData();
//         const screen = await screenBusiness.createScreen(screenCreate);

//         if (screen) {
//             const { results, pagination } = await screenBusiness.findScreens('screen', 0, 1);
//             expect(Array.isArray(results) && results.length > 0 && pagination && pagination.total > 0).to.eq(true);
//         }
//     });

//     it('Get screen by id without param', async () => {
//         await screenBusiness.getScreen(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get screen by id invalid', async () => {
//         await screenBusiness.getScreen('1' as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get screen by id', async () => {
//         const screenCreate = generateScreenData();
//         const screen = await screenBusiness.createScreen(screenCreate);

//         if (screen) {
//             const result = await screenBusiness.getScreen(screen.id);
//             expect(!!result).to.eq(true);
//         }
//     });

//     it('Get screen by code without param', async () => {
//         await screenBusiness.getScreenByCode(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get screen by code invalid', async () => {
//         await screenBusiness.getScreenByCode('1' as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get screen by code', async () => {
//         const screenCreate = generateScreenData();
//         const screen = await screenBusiness.createScreen(screenCreate);

//         if (screen) {
//             const result = await screenBusiness.getScreenByCode(screen.code);
//             expect(result && result.code === screen.code).to.eq(true);
//         }
//     });

//     it('Create new screen with data invalid', async () => {
//         await screenBusiness.createScreen(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new screen without code', async () => {
//         const screenCreate = generateScreenData();
//         screenCreate.code = undefined as any;

//         await screenBusiness.createScreen(screenCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new screen with code invalid', async () => {
//         const screenCreate = generateScreenData();
//         screenCreate.code = 10;

//         await screenBusiness.createScreen(screenCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new screen without name', async () => {
//         const screenCreate = generateScreenData();
//         screenCreate.name = undefined as any;

//         await screenBusiness.createScreen(screenCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new screen with length name greater than 50 characters', async () => {
//         const screenCreate = generateScreenData();
//         screenCreate.name = 'This is the name with length greater than 50 characters!';

//         await screenBusiness.createScreen(screenCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new screen with code has exists', async () => {
//         const screenCreate = generateScreenData();
//         await screenBusiness.createScreen(screenCreate);

//         const screenCreate2 = generateScreenData();
//         await screenBusiness.createScreen(screenCreate2).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new screen with name has exists', async () => {
//         const screenCreate = generateScreenData();
//         await screenBusiness.createScreen(screenCreate);

//         const screenCreate2 = generateScreenData();
//         screenCreate2.code = 100;

//         await screenBusiness.createScreen(screenCreate2).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new screen successfully', async () => {
//         const screenCreate = generateScreenData();
//         const screen = await screenBusiness.createScreen(screenCreate);
//         expect(!!screen).to.eq(true);
//     });

//     it('Update screen with data invalid', async () => {
//         const screenCreate = generateScreenData();
//         const screen = await screenBusiness.createScreen(screenCreate);

//         if (screen) {
//             await screenBusiness.updateScreen(screen.id, undefined as any).catch(error => {
//                 expect(error.httpCode).to.eq(400);
//             });
//         }
//     });

//     it('Update screen without id', async () => {
//         await screenBusiness.updateScreen(undefined as any, undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update screen with id invalid', async () => {
//         await screenBusiness.updateScreen('1' as any, undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update screen with id not exists', async () => {
//         const screenUpdate = new ScreenUpdate();
//         screenUpdate.name = 'Screen test';

//         await screenBusiness.updateScreen(1000, screenUpdate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update screen without name', async () => {
//         const screenUpdate = new ScreenUpdate();
//         screenUpdate.name = '';

//         await screenBusiness.updateScreen(1, screenUpdate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update screen with length name greater than 50 characters', async () => {
//         const screenUpdate = new ScreenUpdate();
//         screenUpdate.name = 'This is the name with length greater than 50 characters!';

//         await screenBusiness.updateScreen(1, screenUpdate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update screen with name has exists', async () => {
//         const screenCreate = generateScreenData();
//         const screen = await screenBusiness.createScreen(screenCreate);

//         if (screen) {
//             const screenCreate2 = generateScreenData();
//             screenCreate2.code = 2;
//             screenCreate2.name = 'Screen test 2';
//             const screen2 = await screenBusiness.createScreen(screenCreate2);

//             if (screen2) {
//                 const screenUpdate = new ScreenUpdate();
//                 screenUpdate.name = screen2.name;

//                 await screenBusiness.updateScreen(screen.id, screenUpdate).catch(error => {
//                     expect(error.httpCode).to.eq(400);
//                 });
//             }
//         }
//     });

//     it('Update screen successfully', async () => {
//         const screenCreate = generateScreenData();
//         const screen = await screenBusiness.createScreen(screenCreate);

//         if (screen) {
//             const screenUpdate = new ScreenUpdate();
//             screenUpdate.name = 'Screen test updated';

//             const result = await screenBusiness.updateScreen(screen.id, screenUpdate);
//             if (result) {
//                 const screenUpdated = await screenBusiness.getScreen(screen.id);
//                 expect(screenUpdated && screenUpdated.name === screenUpdate.name).to.eq(true);
//             }
//         }
//     });

//     it('Delete screen without id', async () => {
//         await screenBusiness.deleteScreen(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Delete screen with id invalid', async () => {
//         await screenBusiness.deleteScreen('1' as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Delete screen with id not exists', async () => {
//         await screenBusiness.deleteScreen(100).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Delete screen successfully', async () => {
//         const screenCreate = generateScreenData();
//         const screen = await screenBusiness.createScreen(screenCreate);

//         if (screen) {
//             const result = await screenBusiness.deleteScreen(screen.id);
//             expect(result).to.eq(true);
//         }
//     });

//     it('Initial screens with data input invalid', async () => {
//         await screenBusiness.initialScreens(undefined as any, true).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Initial screens successfull', async () => {
//         const result = await screenBusiness.initialScreens(getScreens(), true);
//         expect(result).to.eq(true);
//     });
// });
