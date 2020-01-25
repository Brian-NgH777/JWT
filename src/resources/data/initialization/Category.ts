/**
 * Get init category list
 * @returns {*} List category
 */
export default function getCategory(): {isRequired?: boolean, data: any}[] {
    return [
        { isRequired: true, data: { name: 'All', value: '' } },
        { data: { name: 'Business', value: 'business' } },
        { data: { name: 'Games', value: 'games' } },
        { data: { name: 'Sports', value: 'sports' } }
    ];
}
