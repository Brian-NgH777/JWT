/**
 * Get init template list
 * @returns {*} List template
 */
export default function getTemplate(): {isRequired?: boolean, data: any}[] {
    return [
        { isRequired: true, data: { code: 1, name: 'Template 1' } },
        { data: { code: 2, name: 'Template 2' } },
        { data: { code: 3, name: 'Template 3' } }
    ];
}
