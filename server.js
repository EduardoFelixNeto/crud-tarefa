const express = require('express');
const app = express();
const appName = 'crud-tarefa';
const outpuPath = `$__dirname/dist/${appName}`;
app.use(express.static(outpuPath));
app.get('/*', (req, res) => {
    res.sendFile(`${outpuPath}/index.html`);
});
app.listen(process.env.PORT)