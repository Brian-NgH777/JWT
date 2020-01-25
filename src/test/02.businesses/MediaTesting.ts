// import 'mocha';
// import { expect } from 'chai';
// import { Container } from 'typedi';
// import DataAccess from '../../application/dataAccess';
// import IMediaBusiness from '../../application/businesses/interfaces/IMediaBusiness';
// import MediaBusiness from '../../application/businesses/MediaBusiness';
// import Media from '../../application/entities/Media';
// import MediaCreate from '../../application/models/media/MediaCreate';
// import MediaUpdate from '../../application/models/media/MediaUpdate';
// import getMedias from '../../resources/data/initialization/Media';

// const generateMediaData = () => {
//     const mediaCreate = new MediaCreate();
//     mediaCreate.code = 1;
//     mediaCreate.name = 'Media test';

//     return mediaCreate;
// };

// describe('Media testing', () => {
//     let mediaBusiness: IMediaBusiness;

//     before(() => {
//         mediaBusiness = Container.get(MediaBusiness);
//     });

//     beforeEach(async () => {
//         await DataAccess.connection.createQueryBuilder().delete().from(Media).execute();
//     });

//     after(async () => {
//         await DataAccess.connection.createQueryBuilder().delete().from(Media).execute();
//     });

//     it('Find medias without param', async () => {
//         const mediaCreate = generateMediaData();
//         const media = await mediaBusiness.createMedia(mediaCreate);

//         if (media) {
//             const { results, pagination } = await mediaBusiness.findMedias('', 0, 1);
//             expect(Array.isArray(results) && results.length > 0 && pagination && pagination.total > 0).to.eq(true);
//         }
//     });

//     it('Find medias with name', async () => {
//         const mediaCreate = generateMediaData();
//         const media = await mediaBusiness.createMedia(mediaCreate);

//         if (media) {
//             const { results, pagination } = await mediaBusiness.findMedias('media', 0, 1);
//             expect(Array.isArray(results) && results.length > 0 && pagination && pagination.total > 0).to.eq(true);
//         }
//     });

//     it('Get media by id without param', async () => {
//         await mediaBusiness.getMedia(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get media by id invalid', async () => {
//         await mediaBusiness.getMedia('1' as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get media by id', async () => {
//         const mediaCreate = generateMediaData();
//         const media = await mediaBusiness.createMedia(mediaCreate);

//         if (media) {
//             const result = await mediaBusiness.getMedia(media.id);
//             expect(!!result).to.eq(true);
//         }
//     });

//     it('Get media by code without param', async () => {
//         await mediaBusiness.getMediaByCode(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get media by code invalid', async () => {
//         await mediaBusiness.getMediaByCode('1' as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Get media by code', async () => {
//         const mediaCreate = generateMediaData();
//         const media = await mediaBusiness.createMedia(mediaCreate);

//         if (media) {
//             const result = await mediaBusiness.getMediaByCode(media.code);
//             expect(result && result.code === media.code).to.eq(true);
//         }
//     });

//     it('Create new media with data invalid', async () => {
//         await mediaBusiness.createMedia(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new media without code', async () => {
//         const mediaCreate = generateMediaData();
//         mediaCreate.code = undefined as any;

//         await mediaBusiness.createMedia(mediaCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new media with code invalid', async () => {
//         const mediaCreate = generateMediaData();
//         mediaCreate.code = 10;

//         await mediaBusiness.createMedia(mediaCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new media without name', async () => {
//         const mediaCreate = generateMediaData();
//         mediaCreate.name = undefined as any;

//         await mediaBusiness.createMedia(mediaCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new media with length name greater than 50 characters', async () => {
//         const mediaCreate = generateMediaData();
//         mediaCreate.name = 'This is the name with length greater than 50 characters!';

//         await mediaBusiness.createMedia(mediaCreate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new media with code has exists', async () => {
//         const mediaCreate = generateMediaData();
//         await mediaBusiness.createMedia(mediaCreate);

//         const mediaCreate2 = generateMediaData();
//         await mediaBusiness.createMedia(mediaCreate2).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new media with name has exists', async () => {
//         const mediaCreate = generateMediaData();
//         await mediaBusiness.createMedia(mediaCreate);
//         const mediaCreate2 = generateMediaData();
//         mediaCreate2.code = 100;

//         await mediaBusiness.createMedia(mediaCreate2).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Create new media successfully', async () => {
//         const mediaCreate = generateMediaData();
//         const media = await mediaBusiness.createMedia(mediaCreate);
//         expect(!!media).to.eq(true);
//     });

//     it('Update media with data invalid', async () => {
//         const mediaCreate = generateMediaData();
//         const media = await mediaBusiness.createMedia(mediaCreate);

//         if (media) {
//             await mediaBusiness.updateMedia(media.id, undefined as any).catch(error => {
//                 expect(error.httpCode).to.eq(400);
//             });
//         }
//     });

//     it('Update media without id', async () => {
//         await mediaBusiness.updateMedia(undefined as any, undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update media with id invalid', async () => {
//         await mediaBusiness.updateMedia('1' as any, undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update media with id not exists', async () => {
//         const mediaUpdate = new MediaUpdate();
//         mediaUpdate.name = 'Media test';

//         await mediaBusiness.updateMedia(1000, mediaUpdate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update media without name', async () => {
//         const mediaUpdate = new MediaUpdate();
//         mediaUpdate.name = '';

//         await mediaBusiness.updateMedia(1, mediaUpdate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update media with length name greater than 50 characters', async () => {
//         const mediaUpdate = new MediaUpdate();
//         mediaUpdate.name = 'This is the name with length greater than 50 characters!';

//         await mediaBusiness.updateMedia(1, mediaUpdate).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Update media with name has exists', async () => {
//         const mediaCreate = generateMediaData();
//         const media = await mediaBusiness.createMedia(mediaCreate);

//         if (media) {
//             const mediaCreate2 = generateMediaData();
//             mediaCreate2.code = 2;
//             mediaCreate2.name = 'Media test 2';
//             const media2 = await mediaBusiness.createMedia(mediaCreate2);

//             if (media2) {
//                 const mediaUpdate = new MediaUpdate();
//                 mediaUpdate.name = media2.name;

//                 await mediaBusiness.updateMedia(media.id, mediaUpdate).catch(error => {
//                     expect(error.httpCode).to.eq(400);
//                 });
//             }
//         }
//     });

//     it('Update media successfully', async () => {
//         const mediaCreate = generateMediaData();
//         const media = await mediaBusiness.createMedia(mediaCreate);

//         if (media) {
//             const mediaUpdate = new MediaUpdate();
//             mediaUpdate.name = 'Media test updated';

//             const result = await mediaBusiness.updateMedia(media.id, mediaUpdate);
//             if (result) {
//                 const mediaUpdated = await mediaBusiness.getMedia(media.id);
//                 expect(mediaUpdated && mediaUpdated.name === mediaUpdate.name).to.eq(true);
//             }
//         }
//     });

//     it('Delete media without id', async () => {
//         await mediaBusiness.deleteMedia(undefined as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Delete media with id invalid', async () => {
//         await mediaBusiness.deleteMedia('1' as any).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Delete media with id not exists', async () => {
//         await mediaBusiness.deleteMedia(100).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Delete media successfully', async () => {
//         const mediaCreate = generateMediaData();
//         const media = await mediaBusiness.createMedia(mediaCreate);

//         if (media) {
//             const result = await mediaBusiness.deleteMedia(media.id);
//             expect(result).to.eq(true);
//         }
//     });

//     it('Initial medias with data input invalid', async () => {
//         await mediaBusiness.initialMedias(undefined as any, true).catch(error => {
//             expect(error.httpCode).to.eq(400);
//         });
//     });

//     it('Initial medias successfull', async () => {
//         const result = await mediaBusiness.initialMedias(getMedias(), true);
//         expect(result).to.eq(true);
//     });
// });
