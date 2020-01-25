/**
 * Get init ratio list
 * @returns {*} List ratio
 */
export default function getRatio(): {isRequired?: boolean, data: any}[] {
    return [
        { isRequired: true, data: { name: 'All Sreens', value: '', description: '', type: 1 } },
        { data: { name: 'Landscape', value: '', description: '', type: 2 } },
        { data: { name: 'Wide screen', value: '16:9', description: '1920 x 1080, 1280 x 720', type: 2 } },
        { data: { name: 'Normal screen', value: '4:3', description: '1024 x 768', type: 2 } },
        { data: { name: 'Wide screen', value: '16:10', description: '1920 x 1200, 1152 x 720', type: 2 } },
        { data: { name: 'Custom', value: '1885:953', description: '1885x953', type: 2 } },
        { data: { name: 'Portrait', value: '', description: '', type: 3 } },
        { data: { name: 'Wide screen', value: '9:16', description: '1080 x 1920, 720 x 1280', type: 3 } },
        { data: { name: 'Normal screen', value: '3:4', description: '768 x 1024', type: 3 } },
        { data: { name: 'Wide screen', value: '10:16', description: '1200 x 1920, 720 x 1152', type: 3 } }
    ];
}
