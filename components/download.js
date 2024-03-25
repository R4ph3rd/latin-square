const DownloadButton = {
    props: ['data'],
    methods: {
        download(format) {
            const formattedData = this.formatData(format);
            const blob = new Blob([formattedData], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `data.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        },
        formatData(format) {
            console.log('data', this.data)
            if (format === 'json') {
            return JSON.stringify(this.data);
            } else if (format === 'csv') {
            return this.convertToCSV(this.data);
            } else if (format === 'txt') {
            return this.convertToTXT(this.data);
            }
        },
        convertToCSV(data) {
            const csv = data.map(row => row.join(',')).join('\n');
            return csv;
        },
        convertToTXT(data) {
            const txt = data.map(row => row.join('\t')).join('\n');
            return txt;
        }
    },
    template: `
      <div>
        <button @click="download('json')">Download JSON</button>
        <button @click="download('csv')">Download CSV</button>
        <button @click="download('txt')">Download TXT</button>
      </div>
    `
};

export default DownloadButton;