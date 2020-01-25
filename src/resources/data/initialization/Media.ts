/**
 * Get init media list
 * @returns {*} List media
 */
export default function getMedias(): {isRequired?: boolean, data: any}[] {
    return [
        { isRequired: true, data: { code: 1, name: 'Media 1' } },
        { data: { code: 2, name: 'Media 2' } },
        { data: { code: 3, name: 'Media 3' } }
    ];
}
