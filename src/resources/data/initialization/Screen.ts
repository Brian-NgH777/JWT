/**
 * Get init screen list
 * @returns {*} List screen
 */
export default function getScreen(): {isRequired?: boolean, data: any}[] {
    return [
        { isRequired: true, data: { code: 1, name: 'Screen 1' } },
        { data: { code: 2, name: 'Screen 2' } },
        { data: { code: 3, name: 'Screen 3' } }
    ];
}
